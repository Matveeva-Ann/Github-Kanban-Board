import { Breadcrumb } from 'antd';
import { useSelector } from 'react-redux';
import { RootStateType } from '../types/rootStateType';

export default function BreadCrumb() {
  const urlParams = useSelector((state: RootStateType) => state.urlParams);  

  return (
    urlParams.length === 2 ? (
      <Breadcrumb
        style={{ maxWidth: '80%', margin: '-10px auto',  paddingInline: '10px' }}
        separator=">"
        items={[
          {
            title: urlParams[0],
            href: `https://github.com/${urlParams[0]}`,
          },
          {
            title: urlParams[1],
            href: `https://github.com/${urlParams[0]}/${urlParams[1]}`,
          },
        ]}
      />
    ) : <></>
  );
}
