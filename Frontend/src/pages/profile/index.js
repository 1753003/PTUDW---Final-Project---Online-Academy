import React, { useEffect, useState } from 'react';
import { Typography, Input, PageHeader, Alert, Menu, Icon, Checkbox, Row, Col, List, Rate, Avatar, Form, DatePicker, Card, Button } from 'antd';
import { connect } from 'dva';





const Profile = ({ loading, history, searchList, location, dispatch }) => {
    const [menuKey, setMenuKey] = useState('profile');

    const list = [
        {
            URL: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
            courseName: "lfajsdflkja",
            briefDescription: "faskdfjklasdjflajsdf",
            lecturer: 'flkasdjflasjdf'
        },
        {
            URL: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
            courseName: "lfajsdflkja",
            briefDescription: "faskdfjklasdjflajsdf",
            lecturer: 'flkasdjflasjdf'
        },
        {
            URL: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
            courseName: "lfajsdflkja",
            briefDescription: "faskdfjklasdjflajsdf",
            lecturer: 'flkasdjflasjdf'
        },
        {
            URL: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
            courseName: "lfajsdflkja",
            briefDescription: "faskdfjklasdjflajsdf",
            lecturer: 'flkasdjflasjdf'
        },
    ]


    const handleClick = e => {
        setMenuKey(e.key);
    };


    return (
        <Row>
            <Col span={3} />
            <Col span={18}>
                <Row>
                    <Col span={6} style={{ alignItems: 'center' }}>
                        <div style={{ width: '100%' }}>
                            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <Avatar size={130} icon="user" style={{ alignItems: 'center' }} />

                            </div>
                            <Typography.Title level={4} style={{ textAlign: 'center' }}>Phu Vinh Hung</Typography.Title>
                        </div>

                        <Menu
                            onClick={handleClick}
                            style={{ width: 256 }}
                            defaultSelectedKeys={['profile']}
                            defaultOpenKeys={['profile']}
                            mode="inline"
                        >
                            <Menu.Item key="profile">Profile</Menu.Item>
                            <Menu.Item key="favorite">Favorite Courses</Menu.Item>
                            <Menu.Item key="signed">Signed Courses</Menu.Item>
                        </Menu>
                    </Col>
                    <Col span={18} style={{ alignItems: 'center' }}>
                        {
                            menuKey === "profile" &&
                            <Card title="Manage your profile">
                                <div>
                                    <Typography>Name</Typography>
                                    <Input />
                                </div>
                            </Card>
                        }

                        {
                            menuKey === "favorite" &&
                            <Card title="Favorite Courses">
                                <List
                                    itemLayout="vertical"
                                    size="large"
                                    loading={loading}
                                    pagination={{
                                        pageSize: 5,
                                    }}
                                    dataSource={list}
                                    renderItem={item => (
                                        <List.Item
                                            key={item.title}
                                        >
                                            <Row onDoubleClick={() => {
                                                history.push({
                                                    pathname: `/detail`,
                                                    query: {
                                                        courseId: item.id,
                                                    },
                                                });
                                            }}>
                                                <Col span={9}>
                                                    <img
                                                        width={272}
                                                        alt="logo"
                                                        src={item.URL}
                                                    />
                                                </Col>
                                                <Col span={13}>
                                                    <Typography.Title level={4}>{item.courseName}</Typography.Title>
                                                    <Typography>{item.briefDescription}</Typography>
                                                    <Typography style={{ fontSize: '12px' }}>{item.lecturer}</Typography>
                                                </Col>
                                                <Col span={2}>
                                                    <Button>Remove</Button>
                                                </Col>
                                            </Row>
                                        </List.Item>
                                    )}
                                />
                            </Card>
                        }

                        {
                            menuKey === "signed" &&
                            <Card title="Signed Courses">
                                <List
                                    itemLayout="vertical"
                                    size="large"
                                    loading={loading}
                                    pagination={{
                                        pageSize: 5,
                                    }}
                                    dataSource={list}
                                    renderItem={item => (
                                        <List.Item
                                            key={item.title}
                                        >
                                            <Row onDoubleClick={() => {
                                                history.push({
                                                    pathname: `/detail`,
                                                    query: {
                                                        courseId: item.id,
                                                    },
                                                });
                                            }}>
                                                <Col span={9}>
                                                    <img
                                                        width={272}
                                                        alt="logo"
                                                        src={item.URL}
                                                    />
                                                </Col>
                                                <Col span={13}>
                                                    <Typography.Title level={4}>{item.courseName}</Typography.Title>
                                                    <Typography>{item.briefDescription}</Typography>
                                                    <Typography style={{ fontSize: '12px' }}>{item.lecturer}</Typography>
                                                </Col>
                                                <Col span={2}>
                                                    <Button>Remove</Button>
                                                </Col>
                                            </Row>
                                        </List.Item>
                                    )}
                                />
                            </Card>
                        }

                    </Col>
                </Row>
            </Col>
        </Row>
    )
};


export default connect(({ course }) => ({
    list: course.list,
    searchList: course.searchList,
    loading: course.loading
}))(Profile);