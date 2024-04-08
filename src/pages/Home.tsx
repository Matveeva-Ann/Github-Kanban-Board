import { Divider } from 'antd';
import SearchBox from '../components/SearchBox';
import { Layout } from 'antd';
import TaskBoardList from '../components/TaskBoardList';
import { useState } from 'react';
import { Typography } from 'antd';
import { useSelector } from 'react-redux';
import { RootStateType } from '../types/rootStateType';
import { TaskState } from '../types/TaskState';

const { Text } = Typography;
const { Header, Content } = Layout;

function Home() {
  const isIssuesData: boolean = useSelector((state: RootStateType) =>
    state.issuesData.some((elem: TaskState) => elem.items.length !== 0)
  );
  const [isRequestSuccess, setIsRequestSuccess] = useState<boolean>(false || isIssuesData);

  const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    fontSize: 'clamp(16px, 4.2vw, 35px)',
    height: 80,
    padding: 20,
    lineHeight: '30px',
    backgroundColor: '#fff',
  };

  const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    minHeight: 120,
    flexGrow: 1,
    lineHeight: '120px',
  };

  const layoutStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  };

  return (
    <Layout style={layoutStyle}>
      <Header style={headerStyle}>Github Kanban Board</Header>
      <Content style={contentStyle}>
        <SearchBox setIsRequestSuccess={setIsRequestSuccess}></SearchBox>
        <Divider />
        {!isRequestSuccess && (
          <Text italic disabled style={{ fontSize: '40px' }}>
            Check issues on GitHub: enter the link in the search bar!
          </Text>
        )}
        {isRequestSuccess && <TaskBoardList></TaskBoardList>}
      </Content>
    </Layout>
  );
}

export default Home;
