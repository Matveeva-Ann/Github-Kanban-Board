import { Breadcrumb } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootStateType } from '../types/rootStateType';
import { Flex } from 'antd';
import { moveIssue } from '../redux/issuesData';
import { HistoryIssuesState } from '../types/HistoryIssuesState';
import { setUrlParamsRedux } from '../redux/urlParams';

export default function History() {
  const urlParams = useSelector((state: RootStateType) => state.historyIssuesData);
  const dispatch = useDispatch();

  function goToRepository (e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const targetElement = e.target as HTMLDivElement;
    const findData: HistoryIssuesState | undefined = urlParams.find((elem)=> elem.repoName === targetElement.innerText );    
    if (findData) {
      dispatch(moveIssue(findData.data));
      dispatch(setUrlParamsRedux(findData.repoName.split('/')))
    } else {
      console.error(`Repository with name not found.`);
    }
  }

  return (
    <Flex align='center' gap="middle"  style={{ height: '30px', maxWidth: '80%', margin: '20px auto 0', paddingInline: '10px'}}>
      <span style={{width: '170px', height: '20px', fontSize: '18px', lineHeight: '22px'}}>Search history:</span>
      <Breadcrumb
        onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => goToRepository(e)} 
        separator="*"
        items={urlParams.map((item) => ({title: item.repoName}))}
        style={{color: '#000000E0', fontSize: '18px', cursor: 'pointer'}}
      />
    </Flex>
  );
}