import { SessionData } from "@/types/auth";
import { Course, GradesResponse } from "@/types/grades";

export async function fetchGrades(
  session: SessionData,
): Promise<GradesResponse> {
  const response = await fetch(
    "https://hac.friscoisd.org/HomeAccess/Content/Student/Assignments.aspx",
    {
      headers: {
        Cookie: session.cookies,
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch grades");
  }

  const html = await response.text();
  const courses = parseGradesFromHtml(html);

  return {
    currentClasses: courses,
  };
}

function parseGradesFromHtml(html: string): Course[] {
  const courses: Course[] = [];

  // Find all course containers
  const courseContainerRegex =
    /<div[^>]*class="[^"]*AssignmentClass[^"]*"[^>]*>([\s\S]*?)<\/div>/g;
  let courseMatch;

  while ((courseMatch = courseContainerRegex.exec(html)) !== null) {
    const courseHtml = courseMatch[1];
    const course: Course = {
      name: "",
      grade: "",
      lastUpdated: "",
      assignments: [],
    };

    // Parse course name
    const nameMatch = courseHtml.match(
      /<a[^>]*class="[^"]*sg-header-heading[^"]*"[^>]*>([^<]+)<\/a>/,
    );
    if (nameMatch) {
      course.name = nameMatch[1].trim();
    }

    // Parse last updated
    const lastUpdatedMatch = courseHtml.match(
      /<span[^>]*class="[^"]*sg-header-sub-heading[^"]*"[^>]*>\(Last Updated: ([^)]+)\)<\/span>/,
    );
    if (lastUpdatedMatch) {
      course.lastUpdated = lastUpdatedMatch[1].trim();
    }

    // Parse grade
    const gradeMatch = courseHtml.match(
      /<span[^>]*class="[^"]*sg-header-heading sg-right[^"]*"[^>]*>Student Grades ([^<]+)%<\/span>/,
    );
    if (gradeMatch) {
      course.grade = gradeMatch[1].trim();
    }

    // Parse assignments
    const assignmentRowRegex =
      /<tr[^>]*class="[^"]*sg-asp-table-data-row[^"]*"[^>]*>([\s\S]*?)<\/tr>/g;
    let assignmentMatch;

    while ((assignmentMatch = assignmentRowRegex.exec(courseHtml)) !== null) {
      try {
        const rowHtml = assignmentMatch[1];
        const cells = rowHtml.match(/<td[^>]*>([\s\S]*?)<\/td>/g);

        if (cells && cells.length >= 6) {
          const assignmentNameMatch = rowHtml.match(/<a[^>]*>([^<]+)<\/a>/);
          const dateDue = cells[0].replace(/<[^>]*>/g, "").trim();
          const dateAssigned = cells[1].replace(/<[^>]*>/g, "").trim();
          const category = cells[3].replace(/<[^>]*>/g, "").trim();
          const score = cells[4].replace(/<[^>]*>/g, "").trim();
          const totalPoints = cells[5].replace(/<[^>]*>/g, "").trim();

          course.assignments.push({
            name: assignmentNameMatch ? assignmentNameMatch[1].trim() : "",
            category,
            dateAssigned,
            dateDue,
            score,
            totalPoints,
          });
        }
      } catch (error) {
        console.warn("Failed to parse assignment row:", error);
      }
    }

    courses.push(course);
  }

  return courses;
}
