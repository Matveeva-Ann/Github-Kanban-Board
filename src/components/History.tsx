import { Menu } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootStateType } from '../types/rootStateType';
import { Flex } from 'antd';
import { moveIssue } from '../redux/issuesData';
import { HistoryIssuesState } from '../types/HistoryIssuesState';
import { setUrlParamsRedux } from '../redux/urlParams';

export default function History() {
  const urlParams = useSelector((state: RootStateType) => state.historyIssuesData);
  const dispatch = useDispatch();

  function goToRepository(repoName: string) {
    const findData: HistoryIssuesState | undefined = urlParams.find(elem => elem.repoName === repoName);
    if (findData) {
      dispatch(moveIssue(findData.data));
      dispatch(setUrlParamsRedux(findData.repoName.split('/')));
    } else {
      console.error(`Repository with name not found.`);
    }
  }

  return (
    <Flex
      align="center"
      gap="middle"
      style={{ height: '30px', maxWidth: '80%', margin: '20px auto 0', paddingInline: '10px' }}
    >
      <span style={{ width: '170px', height: '20px', fontSize: '18px', lineHeight: '22px' }}>Search history:</span>
      <Menu mode="horizontal" style={{ flex: 1, minWidth: 0, backgroundColor: 'rgb(247 247 247 / 37%)', cursor: 'pointer' }}>
        {urlParams.map(item => (
          <Menu.Item key={item.repoName} onClick={() => goToRepository(item.repoName)}>
            {item.repoName}
          </Menu.Item>
        ))}
      </Menu>
    </Flex>
  );
}