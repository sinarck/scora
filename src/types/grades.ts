export interface Assignment {
  name: string;
  category: string;
  dateAssigned: string;
  dateDue: string;
  score: string;
  totalPoints: string;
}

export interface Course {
  name: string;
  grade: string;
  lastUpdated: string;
  assignments: Assignment[];
}

export interface GradesResponse {
  currentClasses: Course[];
}
