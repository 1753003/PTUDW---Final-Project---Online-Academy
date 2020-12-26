/* eslint-disable max-classes-per-file */
import React from 'react';
import {connect} from 'dva';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Upload, Icon, message, PageHeader, Button, Form, Col, Row, Input, Select, InputNumber, Divider } from 'antd';




const ListCourse = () => {
    return (
        <PageHeader>
            <h1>My courses</h1>
            <Divider/>
        </PageHeader>       
    )    
};

export default ListCourse;