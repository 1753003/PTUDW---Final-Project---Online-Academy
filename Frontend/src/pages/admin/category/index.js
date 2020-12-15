import React, { useEffect } from 'react';
import { Icon, Table, PageHeader, Button } from 'antd';

import { connect } from 'dva';

const Home = ({list, dispatch}) => {
  useEffect(() => {
    dispatch({ type: 'category/get'});
  }, []);

  useEffect(() => {
  }, [list]);

  const dataSource = list.list;

  const columns = [
    {
        title: '',
        dataIndex: 'id',
        key: 'id'
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: 'Null',
        dataIndex: 'isNull',
        render: isNull => (
            <Icon type={isNull === 1 ? 'check' : 'uncheck'} />
        )
    },
    {
        title: 'Topic',
        render: (item) => (
            item.idTopic === null ? '' : list.list[item.idTopic - 1].name
        )
    },
    {
        title: 'Remove',
        key: 'remove',
        render: (item) => (
            item.isNull === 1 ?
            <Button onClick={() => { dispatch({ type: 'category/remove', payload: item.id}) }}>
                <Icon type = 'delete' />
            </Button>
            :
            <Button disabled>
                <Icon type = 'delete' />
            </Button>
        )
    }
  ];

 
  return (
    <PageHeader>
        <h2>Category page</h2>
        <Table dataSource={dataSource} columns={columns} />;
    </PageHeader>
  )
};


export default connect(({ category }) => ({
  list: category
}))(Home);