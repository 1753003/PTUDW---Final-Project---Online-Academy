/* eslint-disable no-undef */
// eslint-disable-next-line max-classes-per-file
import React, { useEffect } from 'react';
import { Icon, Table, PageHeader, Button, Divider, Popconfirm, Input, Form, InputNumber} from 'antd';
import { connect } from 'dva';
import { DrawerForm } from '@/pages/admin/category/component/DrawerForm';
import { MyTable } from '@/pages/admin/category/component/MyTable';

const Category = ({list, dispatch}) => {
  useEffect(() => {
    dispatch({ type: 'category/get'});
  }, []);

  useEffect(() => {
  }, [list]);

  const data = list.list;
  
  return (
    <PageHeader>
        <h2>Category page</h2>  
        <Divider />
        <DrawerForm 
          onSubmit={(newData) => { console.log(newData); }}
          listData={list.list}
        />
        <MyTable listData={list.list}/>
    </PageHeader>
  )
};


export default connect(({ category }) => ({
  list: category
}))(Category);