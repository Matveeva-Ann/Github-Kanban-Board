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

const { Title, Text } = Typography;

export default function TaskBoardList() {
  const [isAnyData, setIsAnyData] = useState(false);
  const [boardsData, setBoardsData] = useState<Board[]>([]);
  const issuesData: TaskState[] = useSelector((state: RootStateType) => state.issuesData);
  const [currentBoard, setCurrentBoard] = useState<Board | null>(null);
  const [currentCard, setCurrentCard] = useState<Issue | null>(null);
  const dispatch = useDispatch();

  
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
    dispatch(moveIssue({...board, items: [...boardsData]}));
  };


  return (
    <>
      {!isAnyData && <Text italic disabled style={{fontSize: '40px'}}>For this project, there are currently no open issues!</Text>}
      {isAnyData && (
        <Flex gap="middle" justify="space-around">
          {boardsData &&
            boardsData.map((item: Board, index) => (
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
                onDrop={(e: React.DragEvent<HTMLDivElement>) => dropCardHandler(e, item)}
              >
                <Title level={2} style={{ textAlign: 'center' }}>
                  {item.name}
                </Title>

                {item.items &&
                  item.items.length !== 0 &&
                  item.items.map((card: Issue, index) => (
                    <TaskCard
                      currentBoard={currentBoard}
                      currentCard={currentCard}
                      setCurrentCard={setCurrentCard}
                      setCurrentBoard={setCurrentBoard}
                      board={item}
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
