import { ControllerRenderProps } from "react-hook-form";
import { z } from "zod";
import loginSchema from "./schema/login";

export type LoginFormData = z.infer<typeof loginSchema>;

export type FieldProps<T extends keyof LoginFormData> = {
  field: ControllerRenderProps<LoginFormData, T>;
};

