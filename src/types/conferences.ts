export interface Rating {
  year: number;
  grade: "FIRST" | "SECOND";
}

export interface Proportion {
  country: string;
  proportion: number;
}

export interface Conference {
  id: number;
  acronym: string;
  fullName: string;
  ratings: Rating[];
  proportions: Proportion[];
}

export interface Publication {
  id: number;
  title: string;
  authors: string[];
  publicationYear: number;
  citationCount: number;
}
