import { HistoryIssuesState } from "./HistoryIssuesState";

export interface RootStateType {
  issuesData: [];
  urlParams: Array<string>;
  historyIssuesData: Array<HistoryIssuesState> 
}