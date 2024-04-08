import { Issue } from "./Issue";

export interface TaskState {
  name: string;
  items: Issue[];
}