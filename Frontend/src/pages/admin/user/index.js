/* eslint-disable no-undef */
// eslint-disable-next-line max-classes-per-file
import React, { useEffect } from 'react';
import { Icon, Table, PageHeader, Button, Divider, Tabs, Popconfirm, Input, Form, InputNumber} from 'antd';
import { connect } from 'dva';

const User = ({list, dispatch}) => {
    useEffect(() => {
        dispatch({ type: 'account/getStudent'});     
    }, []);
    
    useEffect(() => {
        dispatch({ type: 'account/getLecturer'});
    }, []);

    useEffect(() => {
    }, [list])

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: 'Usermame',
            dataIndex: 'username'
        },
        {
            title: 'Name',
            dataIndex: 'name'
        },
        {
            title: 'Email',
            dataIndex: 'email'
        },
        {
            title: 'Remove',
            key: 'remove',
            render: (item) => (
                <Button onClick={() => {dispatch({type: 'account/deleteUser', payload: item.id})}}>
                    <Icon type = 'delete' />
                </Button>
            )
          },
    ]

    const { TabPane } = Tabs;
    return (
        <PageHeader>
            <h2>User page</h2>  
            <Divider />
            <Tabs defaultActiveKey="1">
                <TabPane tab="Students" key="1">
                    <Table dataSource={list.studentList} columns={columns}/>
                </TabPane>
                <TabPane tab="Lecturer" key="2">
                    <Table dataSource={list.lecturerList} columns={columns}/>
                </TabPane>
            </Tabs>
        </PageHeader>
    )
};


export default connect(({ account }) => ({
  list: account
}))(User);