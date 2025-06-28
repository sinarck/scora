
import { Course } from "@/types/grades";

// Regular Expressions for Parsing Grades HTML

// Matches the main container for each course.
const courseContainerRegex =
  /<div[^>]*class="[^"]*AssignmentClass[^"]*"[^>]*>([\s\S]*?)<\/div>/g;

// Extracts the course name from within a course container.
const courseNameRegex =
  /<a[^>]*class="[^"]*sg-header-heading[^"]*"[^>]*>([^<]+)<\/a>/;

// Extracts the "Last Updated" timestamp.
const lastUpdatedRegex =
  /<span[^>]*class="[^"]*sg-header-sub-heading[^"]*"[^>]*>\(Last Updated: ([^)]+)\)<\/span>/;

// Extracts the overall course grade percentage.
const gradeRegex =
  /<span[^>]*class="[^"]*sg-header-heading sg-right[^"]*"[^>]*>Student Grades ([^<]+)%<\/span>/;

// Matches each row in the assignments table.
const assignmentRowRegex =
  /<tr[^>]*class="[^"]*sg-asp-table-data-row[^"]*"[^>]*>([\s\S]*?)<\/tr>/g;

// Extracts all table data cells (<td>) from an assignment row.
const cellRegex = /<td[^>]*>([\s\S]*?)<\/td>/g;

// Extracts the assignment name from an anchor tag within a cell.
const assignmentNameRegex = /<a[^>]*>([^<]+)<\/a>/;

/**
 * Parses the HTML content of the grades page to extract course and assignment data.
 *
 * @param html The raw HTML string from the grades page.
 * @returns An array of Course objects.
 */
export function parseGradesFromHtml(html: string): Course[] {
  const courses: Course[] = [];
  let courseMatch;

  // Reset the regex index to start matching from the beginning of the string.
  courseContainerRegex.lastIndex = 0;

  while ((courseMatch = courseContainerRegex.exec(html)) !== null) {
    const courseHtml = courseMatch[1];
    const course = parseSingleCourse(courseHtml);
    if (course) {
      courses.push(course);
    }
  }

  return courses;
}

/**
 * Parses a single course block from the HTML.
 *
 * @param courseHtml The HTML string for a single course.
 * @returns A Course object or null if parsing fails.
 */
function parseSingleCourse(courseHtml: string): Course | null {
  try {
    const nameMatch = courseHtml.match(courseNameRegex);
    const lastUpdatedMatch = courseHtml.match(lastUpdatedRegex);
    const gradeMatch = courseHtml.match(gradeRegex);

    const course: Course = {
      name: nameMatch ? nameMatch[1].trim() : "Unknown Course",
      grade: gradeMatch ? gradeMatch[1].trim() : "N/A",
      lastUpdated: lastUpdatedMatch ? lastUpdatedMatch[1].trim() : "N/A",
      assignments: [],
    };

    let assignmentMatch;
    // Reset the regex index for nested loop.
    assignmentRowRegex.lastIndex = 0;

    while (
      (assignmentMatch = assignmentRowRegex.exec(courseHtml)) !== null
    ) {
      const assignment = parseAssignmentRow(assignmentMatch[1]);
      if (assignment) {
        course.assignments.push(assignment);
      }
    }

    return course;
  } catch (error) {
    console.error("Failed to parse a course block:", error);
    return null;
  }
}

/**
 * Parses a single assignment row from the course's assignment table.
 *
 * @param rowHtml The HTML string for a single assignment row (tr).
 * @returns An assignment object or null if parsing fails.
 */
function parseAssignmentRow(rowHtml: string) {
  try {
    const cells = rowHtml.match(cellRegex);
    if (!cells || cells.length < 6) {
      return null;
    }

    // Helper to strip HTML tags from a string.
    const stripTags = (str: string) => str.replace(/<[^>]*>/g, "").trim();

    const assignmentNameMatch = rowHtml.match(assignmentNameRegex);

    return {
      name: assignmentNameMatch ? assignmentNameMatch[1].trim() : "Unnamed Assignment",
      category: stripTags(cells[3]),
      dateAssigned: stripTags(cells[0]),
      dateDue: stripTags(cells[1]),
      score: stripTags(cells[4]),
      totalPoints: stripTags(cells[5]),
    };
  } catch (error) {
    console.warn("Failed to parse an assignment row:", error);
    return null;
  }
}
