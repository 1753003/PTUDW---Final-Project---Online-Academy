/* eslint-disable max-classes-per-file */
import React from 'react';
import {connect} from 'dva';
// eslint-disable-next-line import/no-extraneous-dependencies
import { PageHeader, Divider, Table } from 'antd';
import { Sylabus } from '@/pages/lecturer/addSylabus';

class CourseTable extends React.Component {
    constructor(props) {
        super(props);
        this.props.dispatch({type: 'course/getLecturerCourse', payload: (JSON.parse(localStorage.getItem('userData'))).uid});
    }

    getColumn = () => {
        return (
            [
                {
                    title: 'ID',
                    dataIndex: 'id'
                },
                {
                    title: 'Course name',
                    dataIndex: 'name'
                },
                {
                    title: 'Sylabus Action',
                    render: (item) => (
                        <Sylabus courseID = {item.id} item = {item}/> 
                    )
                }
            ]
        );
    }

    getDataSource = () => {
        const { list = [] } = this.props.course;
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < list.length; i++) {
            list[i].key = list[i].id
        }
        return list;
    }

    render() {
        return (
            <Table dataSource= {this.getDataSource()} columns={this.getColumn()} />
        )
    }
}

const A = connect(({course}) => ({course}))(CourseTable);
const ListCourse = () => {
    return (
        <PageHeader>
            <h1>My courses</h1>
            <Divider/>
            <A />
        </PageHeader>       
    )    
};

export default ListCourse;