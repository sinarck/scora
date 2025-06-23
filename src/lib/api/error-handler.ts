import { ZodError } from "zod";
import { ErrorResponses } from "./response-utils";

/**
 * Error handler for API routes
 * Converts various error types to standardized API responses
 */
export class ApiErrorHandler {
  /**
   * Handle Zod validation errors
   */
  static handleValidationError(error: ZodError) {
    const details = error.errors.reduce((acc, err) => {
      const field = err.path.join(".");
      acc[field] = err.message;
      return acc;
    }, {} as Record<string, string>);

    return ErrorResponses.validationError("Validation failed", details);
  }

  /**
   * Handle generic errors
   */
  static handleGenericError(error: unknown) {
    if (error instanceof Error) {
      // Log the full error for debugging
      console.error("API Error:", {
        message: error.message,
        stack: error.stack,
        name: error.name,
      });

      // Don't expose internal errors in production
      const isDevelopment = process.env.NODE_ENV === "development";

      return ErrorResponses.internalError(
        isDevelopment ? error.message : "An unexpected error occurred",
        isDevelopment ? error.stack : undefined
      );
    }

    // Handle non-Error objects
    console.error("Unknown error type:", error);
    return ErrorResponses.internalError("An unknown error occurred");
  }

  /**
   * Handle network/connection errors
   */
  static handleNetworkError(error: unknown) {
    console.error("Network error:", error);
    return ErrorResponses.networkError();
  }

  /**
   * Handle timeout errors
   */
  static handleTimeoutError(error: unknown) {
    console.error("Timeout error:", error);
    return ErrorResponses.timeout();
  }

  /**
   * Handle authentication errors
   */
  static handleAuthError(error: unknown) {
    console.error("Authentication error:", error);

    if (error instanceof Error) {
      const message = error.message.toLowerCase();

      if (message.includes("invalid") || message.includes("credentials")) {
        return ErrorResponses.invalidCredentials();
      }

      if (
        message.includes("unauthorized") ||
        message.includes("access denied")
      ) {
        return ErrorResponses.unauthorized();
      }
    }

    return ErrorResponses.unauthorized();
  }

  /**
   * Handle resource not found errors
   */
  static handleNotFoundError(resource?: string) {
    const message = resource ? `${resource} not found` : "Resource not found";
    return ErrorResponses.notFound(message);
  }

  /**
   * Handle conflict errors (e.g., duplicate resources)
   */
  static handleConflictError(resource?: string) {
    const message = resource
      ? `${resource} already exists`
      : "Resource conflict";
    return ErrorResponses.conflict(message);
  }

  /**
   * Main error handler that determines the appropriate response based on error type
   */
  static handle(error: unknown): Response {
    // Handle Zod validation errors
    if (error instanceof ZodError) {
      return this.handleValidationError(error);
    }

    // Handle specific error types
    if (error instanceof Error) {
      const message = error.message.toLowerCase();

      // Network/connection errors
      if (
        message.includes("network") ||
        message.includes("connection") ||
        message.includes("fetch")
      ) {
        return this.handleNetworkError(error);
      }

      // Timeout errors
      if (message.includes("timeout") || message.includes("timed out")) {
        return this.handleTimeoutError(error);
      }

      // Authentication errors
      if (
        message.includes("auth") ||
        message.includes("unauthorized") ||
        message.includes("credentials")
      ) {
        return this.handleAuthError(error);
      }

      // Not found errors
      if (message.includes("not found") || message.includes("404")) {
        return this.handleNotFoundError();
      }

      // Conflict errors
      if (
        message.includes("conflict") ||
        message.includes("already exists") ||
        message.includes("duplicate")
      ) {
        return this.handleConflictError();
      }
    }

    // Default to generic error handling
    return this.handleGenericError(error);
  }
}

/**
 * Wrapper function for API route handlers that automatically handles errors
 */
export function withErrorHandling<T extends any[], R>(
  handler: (...args: T) => Promise<R>
): (...args: T) => Promise<R> {
  return async (...args: T): Promise<R> => {
    try {
      return await handler(...args);
    } catch (error) {
      // Re-throw the error to be handled by the caller
      // This allows the caller to decide how to handle the error
      throw error;
    }
  };
}

/**
 * Higher-order function that wraps API route handlers with automatic error handling
 * Returns a Response object with proper error formatting
 */
export function withApiErrorHandling<T extends any[]>(
  handler: (...args: T) => Promise<Response>
): (...args: T) => Promise<Response> {
  return async (...args: T): Promise<Response> => {
    try {
      return await handler(...args);
    } catch (error) {
      return ApiErrorHandler.handle(error);
    }
  };
}

/**
 * Utility to check if an error is a specific type
 */
export function isErrorType(error: unknown, type: string): boolean {
  return error instanceof Error && error.name === type;
}

/**
 * Utility to extract error details for logging
 */
export function getErrorDetails(error: unknown): {
  message: string;
  stack?: string;
  name?: string;
  code?: string;
} {
  if (error instanceof Error) {
    return {
      message: error.message,
      stack: error.stack,
      name: error.name,
    };
  }

  return {
    message: String(error),
  };
}

