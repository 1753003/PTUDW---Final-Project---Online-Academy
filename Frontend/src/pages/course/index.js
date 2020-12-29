import React, { useEffect, useState } from 'react';
import { Typography, Menu, Row, Col, Avatar, Tabs, Icon } from 'antd';
import { connect } from 'dva';
import ReactPlayer from 'react-player';
import { PageLoading } from '@ant-design/pro-layout';

const { TabPane } = Tabs;





const Course = ({ location, dispatch, loading, currentUser, singleRegistedCourse }) => {
    const { query } = location;
    const [key, setKey] = useState(0);
    const [url, setUrl] = useState('');
    const [description, setDescription] = useState('');


    // useEffect
    useEffect(() => {

        if (currentUser.id) {
            const payload = {
                uid: currentUser.id,
                cid: query.courseId
            }
            dispatch({ type: 'user/getRegisterById', payload });
        }
    }, [currentUser])

    useEffect(() => {
        console.log(singleRegistedCourse);
        if (singleRegistedCourse) {
            setUrl(singleRegistedCourse.sylabus[0].videoLink);
            setDescription(singleRegistedCourse.sylabus[0].description);
            setKey(singleRegistedCourse.sylabus[0].week);
        }
    }, [singleRegistedCourse])


    const handleClick = (e) => {
        singleRegistedCourse.sylabus.forEach(element => {
            if (element.week === parseInt(e.key)) {
                setUrl(element.videoLink);
                setDescription(element.description);
                setKey(element.week);
            }
        });
    };

    const handleEnd = () => {
        const refactorData = {
            ...singleRegistedCourse
        }
        for (let i = 0; i < refactorData.sylabus.length; i++) {
            if (refactorData.sylabus[i].week === key) {
                refactorData.sylabus[i].isDone = true;
            }
        }
        const payload = {
            uid: currentUser.id,
            cid: query.courseId,
            sylabus: refactorData.sylabus
        }
        dispatch({ type: 'user/setDoneSession', payload });

    }



    return (
        loading === true ? <PageLoading /> :
            <Row>
                <Col span={4} style={{ alignItems: 'center' }}>
                    <Menu
                        onClick={handleClick}
                        style={{ width: 230 }}
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['1']}
                        mode="inline"
                    >
                        {
                            singleRegistedCourse?.sylabus?.map((item) => {
                                // setUrl(item.videoLink);
                                return (
                                    <Menu.Item key={item.week}>
                                        <Row>
                                            {
                                                item.isDone ?
                                                    <Col span={2}>
                                                        <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" />
                                                    </Col> :
                                                    <Col span={2}>
                                                        <Icon type="play-circle" theme="twoTone" twoToneColor="#eb2f96" />
                                                    </Col>
                                            }
                                            <Col span={2}>
                                                <Typography style={{ fontSize: '10px' }}>{`Session ${item.week}: ${item.lesson}`}</Typography>
                                            </Col>
                                        </Row>

                                    </Menu.Item>)
                            })

                        }

                    </Menu>
                </Col>
                <Col span={20} style={{ alignItems: 'center' }}>
                    <ReactPlayer url={url} width='100%' height='700px' controls='true' onEnded={handleEnd} />
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Lecturer" key="1">
                            <Row>

                                <Col span={2}>
                                    <Avatar size={64} icon="user" />
                                </Col>
                                <Col span={18}>
                                    <Typography.Title level={3}>Phu Vinh Hung</Typography.Title>
                                </Col>
                            </Row>


                            <Typography>Student of University of Science</Typography>
                        </TabPane>
                        <TabPane tab="Detail infomation" key="2">
                            {description}
                        </TabPane>
                    </Tabs>,
            </Col>
            </Row>
    )
};



export default connect(({ user, loading }) => ({
    currentUser: user.currentUser,
    singleRegistedCourse: user.singleRegistedCourse,
    loading: loading.effects['user/getRegisterById'],
}))(Course);