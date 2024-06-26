import { Card, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { changeHistory } from '../redux/historyIssuesData';
import { moveIssue } from '../redux/issuesData';
import { Board } from '../types/board';
import { Issue } from '../types/Issue';
import { RootStateType } from '../types/rootStateType';

const { Text } = Typography;
interface TaskCardProps {
  card: Issue;
  board: Board;
  currentBoard: Board | null;
  currentCard: Issue | null;
  boardsData: Board[];
  setBoardsData: (value: Board[]) => void;
  setCurrentBoard: (value: Board | null) => void;
  setCurrentCard: (value: Issue | null) => void;
}

export default function TaskCard({
  board,
  card,
  setBoardsData,
  setCurrentBoard,
  currentBoard,
  currentCard,
  setCurrentCard,
  boardsData,
}: TaskCardProps) {
  const { title, number, created_at, user, comments } = card;
  const dispatch = useDispatch();
  const historyIssuesData = useSelector((state: RootStateType) => state.historyIssuesData);

  function countingTime(timeRequest: Date) {
    const now = new Date();
    const diff = Math.abs(now.getTime() - new Date(timeRequest).getTime());
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const years = Math.floor(days / 365);

    if (years > 0) {
      return `${years} years ago`;
    } else if (days > 0) {
      return `${days} days ago`;
    } else if (hours > 0) {
      return `${hours} hours ago`;
    } else {
      return `${minutes} minutes ago`;
    }
  }

  function dragStartHandler(board: Board, item: Issue) {
    setCurrentBoard(board);
    setCurrentCard(item);
  }

  function dragOverHandler(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  function dropHandler(e: React.DragEvent<HTMLDivElement>, board: Board) {    
    e.preventDefault();
    const currentIndex: number = currentCard ? currentBoard?.items.indexOf(currentCard)! : -1;
    currentBoard?.items.splice(currentIndex, 1);
    const dropIndex = board.items.indexOf(card);
    if (currentIndex <= dropIndex && currentCard) {
      board.items.splice(dropIndex + 1, 0, currentCard);
    } else if (currentCard) {
      board.items.splice(dropIndex, 0, currentCard);
    }
    setBoardsData(
      boardsData.map((a) => {
        if (a.id === board.id) {
          return board;
        }
        return a;
      })
    )
    dispatch(moveIssue([...boardsData]));
    const repoName = boardsData[0].repoName;
    const index = historyIssuesData.findIndex(item => item.repoName === repoName);
    let newHistoryIssues = JSON.parse(JSON.stringify(historyIssuesData));  
    newHistoryIssues.splice(index, 1, {repoName, data: [...boardsData]});
    dispatch(changeHistory(newHistoryIssues));

    setCurrentBoard(null);
    setCurrentCard(null);
  }

  return (
    <Card
      title={title}
      bordered={false}
      style={{ margin: 16 }}
      draggable
      onDragOver={e => dragOverHandler(e)}
  
      onDragStart={() => dragStartHandler(board, card)}
      onDrop={e => dropHandler(e, board)}
    >
      <p>
        #{number} opened {countingTime(created_at)}
      </p>
      <Text type="secondary">
        {user.login} | Comments: {comments}
      </Text>
    </Card>
  );
}
