import { Flex } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootStateType } from '../types/rootStateType';
import { TaskState } from '../types/TaskState';
import { Typography } from 'antd';
import TaskCard from './TaskCard';
import { Board } from '../types/board';
import { Issue } from '../types/Issue';
import { moveIssue } from '../redux/issuesData';
import { changeHistory } from '../redux/historyIssuesData';

const { Title, Text } = Typography;

export default function TaskBoardList() {
  const [isAnyData, setIsAnyData] = useState(false);
  const [boardsData, setBoardsData] = useState<Board[]>([]);
  const issuesData: TaskState[] = useSelector((state: RootStateType) => state.issuesData);
  const [currentBoard, setCurrentBoard] = useState<Board | null>(null);
  const [currentCard, setCurrentCard] = useState<Issue | null>(null);
  const dispatch = useDispatch();
  const historyIssuesData = useSelector((state: RootStateType) => state.historyIssuesData);

  
  useEffect(() => {
    setIsAnyData(issuesData.some(elem => elem.items.length !== 0));
    const copyIssues = JSON.parse(JSON.stringify(issuesData));
    setBoardsData(copyIssues);
  }, [issuesData]);

  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const dropCardHandler = (e: React.DragEvent<HTMLDivElement>, board: Board) => {
    const targetElement = e.target as HTMLDivElement;

    if (targetElement.className.includes('js-board')) {
      if (currentCard !== null) {
        board.items = [...board.items, currentCard];
        const currentIndex = currentBoard?.items.indexOf(currentCard);
        if (currentIndex !== undefined && currentIndex !== -1) {
          currentBoard?.items.splice(currentIndex, 1);
          setBoardsData(boardsData.map(a => (a.id === board.id ? board : a)));
        }
      }
    }
    
    dispatch(moveIssue([...boardsData]));
    const repoName = boardsData[0].repoName;        
    const index = historyIssuesData.findIndex(item => item.repoName === repoName);
    let newHistoryIssues = JSON.parse(JSON.stringify(historyIssuesData));  
    newHistoryIssues.splice(index, 1, {repoName, data: [...boardsData]});
    dispatch(changeHistory(newHistoryIssues))
  };


  return (
    <>
      {!isAnyData && <Text italic disabled style={{fontSize: '40px'}}>For this project, there are currently no open issues!</Text>}
      {isAnyData && (
        <Flex gap="middle" justify="space-around">
          {boardsData &&
            boardsData.map((board: Board, index) => (
              <Flex
                key={index}
                gap="small"
                vertical
                style={{
                  borderRadius: '20px',
                  backgroundColor: '#9470dbcd',
                  width: `calc(90% / ${boardsData.length})`,
                }}
                className="js-board"
                onDragOver={(e: React.DragEvent<HTMLDivElement>) => dragOverHandler(e)}
                onDrop={(e: React.DragEvent<HTMLDivElement>) => dropCardHandler(e, board)}
              >
                <Title level={2} style={{ textAlign: 'center' }}>
                  {board.name}
                </Title>
                <Text type="secondary">Сount: {board.items.length}</Text>

                {board.items &&
                  board.items.length !== 0 &&
                  board.items.map((card: Issue, index) => (
                    <TaskCard
                      currentBoard={currentBoard}
                      currentCard={currentCard}
                      setCurrentCard={setCurrentCard}
                      setCurrentBoard={setCurrentBoard}
                      board={board}
                      card={card}
                      key={index}
                      boardsData={boardsData}
                      setBoardsData={setBoardsData}
                    />
                  ))}
              </Flex>
            ))}
        </Flex>
      )}
    </>
  );
}
