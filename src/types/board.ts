import { Issue } from "./Issue";

export interface Board {
  id: number,
  items: Issue[],
  name: string,
  repoName: string,
}