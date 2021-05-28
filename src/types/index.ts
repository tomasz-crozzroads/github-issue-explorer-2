export interface Issue {
  body: string;
  comments: number;
  created_at: string;
  html_url: string;
  id: number;
  number: number;
  pull_request?: {
    url: string;
  };
  state: "open" | "closed";
  title: string;
  updated_at: string;
  user: {
    login: string;
  };
}

export type IssueOrderField = "created" | "updated" | "comments";
export type IssueState = "open" | "closed" | "all";
export type OrderDirection = "asc" | "desc";
