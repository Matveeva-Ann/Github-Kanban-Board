import { Input, Button, Flex } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { ChangeEvent, useEffect, useState } from 'react';
import { Typography } from 'antd';
import BreadCrumb from './BreadCrumb';
import { useDispatch } from 'react-redux';
import { addIssuesToTodo, moveIssue } from '../redux/issuesData';
import issuesApi from '../api/issuesApi';
import { setUrlParamsRedux } from '../redux/urlParams';
import { addIssuesToHistory } from '../redux/historyIssuesData';
const { Text } = Typography;

interface SearchBoxProps {
  setIsRequestSuccess: (value: boolean) => void;
}

export default function SearchBox({ setIsRequestSuccess }: SearchBoxProps) {
  const [inputValue, setInputValue] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [urlParams, setUrlParams] = useState<Array<string>>([]);
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    urlParams.length !== 0 && fetchData();
  }, [urlParams]);

  async function fetchData() {
    try {
      const data = await issuesApi(urlParams);
      setIsRequestSuccess(true);
      dispatch(setUrlParamsRedux(urlParams));
      const param = urlParams.join('/')
      dispatch(addIssuesToTodo({data, param}));
      dispatch(addIssuesToHistory({repoName: param , data: [
        {
          name: "ToDo",
          items: data,
          id: 1,
          repoName: param,
        },
        {
          name: "InProgress",
          items: [],
          id: 2,
          repoName: param,
        },
        {
          name: "Done",
          items: [],
          id: 3,
          repoName: param,
        },
      ]}))
    } catch (e) {
      console.log(e);
      setIsRequestSuccess(false);
    }
  }

  function handleClickSearch() {
    if (inputValue.trim() !== '') {
      const urlParams = inputValue.split('/');
      if (urlParams.length >= 4 && urlParams[0] === 'https:' && urlParams[2] === 'github.com') {
        setUrlParams([urlParams[3], urlParams[4]]);
        setIsError(false);
        resetParams();
      } else {
        setIsError(true);
        setUrlParams([]);
        resetRedux();
      }
    }
  }

  function resetRedux() {
    dispatch(setUrlParamsRedux(['']));
    dispatch(
      moveIssue([
        {
          name: 'ToDo',
          items: [],
          id: 1,
        },
        {
          name: 'InProgress',
          items: [],
          id: 2,
        },
        {
          name: 'Done',
          items: [],
          id: 3,
        },
      ])
    );
  }

  function resetParams() {
    setInputValue('');
    resetRedux();
    setIsButtonDisabled(true);
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
    if (e.target.value.trim() !== '') {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }

  return (
    <div style={{ position: 'relative' }}>
      <Flex gap="middle" style={{ maxWidth: '80%', margin: '10px auto', padding: '16px 0' }}>
        <Input
          placeholder="Enter repo URL"
          value={inputValue}
          status={isError ? 'error' : ''}
          onChange={e => handleInputChange(e)}
          style={{ height: '44px', fontSize: '20px' }}
        />
        <Button
          style={{ height: '44px', fontSize: '20px', backgroundColor: 'rgba(148, 112, 219, 0.804)' }}
          icon={<SearchOutlined />}
          onClick={() => handleClickSearch()}
          disabled={isButtonDisabled}
        >
          Loud issues!
        </Button>
      </Flex>
      <Text type="danger" style={{ position: 'absolute', bottom: '-10px', left: '10%' }}>
        {isError ? 'Error: invalid link format. Please check and try again.' : ' '}
      </Text>
      {!isError && <BreadCrumb></BreadCrumb>}
    </div>
  );
}
