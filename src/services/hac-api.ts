import { parseGradesFromHtml } from "@/lib/parsers/grades-parser";
import { SessionData } from "@/types/auth";
import { GradesResponse } from "@/types/grades";

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
