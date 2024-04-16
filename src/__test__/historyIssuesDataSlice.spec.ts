import { HistoryIssuesState } from "../types/HistoryIssuesState";
import { historyIssuesDataReducer, initialStateHistory, addIssuesToHistory, changeHistory } from "../redux/historyIssuesData";
import { Board } from "../types/board";

describe('historyIssuesDataSlice reducer', () => {
  test('should add issues to history correctly', () => {
    const issueToAdd: HistoryIssuesState = {
      data: [] as Board[],
      repoName: 'Repo Name',
    };

    const action = addIssuesToHistory(issueToAdd);
    const state = historyIssuesDataReducer(initialStateHistory, action);
    expect(state).toEqual([issueToAdd]);
  });

  test('should change history correctly', () => {
    const newHistory: HistoryIssuesState[] = [
      {
        data: [] as Board[],
        repoName: 'Repo Name 1',
      },
      {
        data: [] as Board[],
        repoName: 'Repo Name 2',
      },
    ];

    const action = changeHistory(newHistory);
    const state = historyIssuesDataReducer(initialStateHistory, action);

    expect(state).toEqual(newHistory);
  });
});
