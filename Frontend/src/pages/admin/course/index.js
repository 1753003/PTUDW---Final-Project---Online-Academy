/* eslint-disable no-undef */
// eslint-disable-next-line max-classes-per-file
import React, { useEffect } from 'react';
import { Icon, Table, PageHeader, Button, Divider, Popconfirm, Input, Form, InputNumber} from 'antd';
import { connect } from 'dva';
import { DrawerForm } from '@/pages/admin/course/DrawerForm';

const Course = ({list, dispatch}) => {
    useEffect(() => {
        dispatch({ type: 'course/getFull'});
    }, []);

    useEffect(() => {
    }, [list])
   
    const dataSource = list.list[0];
    let key = [];
    
    if (dataSource !== undefined)
        for (let i = 0; i < dataSource.length; i++) {
            key[dataSource[i].id] = i;
        }
    
    console.log(key);
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name'
        },
        {
            title: 'Rate',
            dataIndex: 'rating'
        },
        {
            title: 'Brief Description',
            dataIndex: 'briefDescription'
        },
        {
            title: 'Details',
            render: (item) => (
                <DrawerForm course={item}/>
            )
        },
        {
            title: 'Remove',
            key: 'remove',
            render: (item) => (
                <Button onClick={() => {dispatch({type: 'course/delete', payload: item.id})}}>
                    <Icon type = 'delete' />
                </Button>
            )
          },
    ]

    return (
        <PageHeader>
            <h2>Course page</h2>  
            <Divider />
            <Table dataSource={dataSource} columns={columns} />
        </PageHeader>
    )
};


export default connect(({ course }) => ({
  list: course
}))(Course);