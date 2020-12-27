import React, { useEffect, useState } from 'react';
import { Typography, Input, Menu, Row, Col, List, Avatar, Card, Button, Progress, message } from 'antd';
import { connect } from 'dva';





const Profile = ({ dispatch, loading, history, currentUser, favoriteCourses, registedCourses, deleteFavoriteStatus }) => {
    const [menuKey, setMenuKey] = useState('profile');

    // useEffect
    useEffect(() => {
        if (currentUser.id) {
            const payload = {
                uid: currentUser.id
            }
            dispatch({ type: 'user/fetchCurrentFavorite', payload });
            dispatch({ type: 'user/fetchCurrentRegister', payload });
        }
    }, [currentUser])

    useEffect(() => {
        if (deleteFavoriteStatus === "SUCCESS") {
            message.success('Remove course successfully');
            dispatch({ type: 'user/resetStatus' });
        }
        if (deleteFavoriteStatus === "FAIL") {
            message.error('Remove course fail');
            dispatch({ type: 'user/resetStatus' });
        }
    }, [deleteFavoriteStatus])

    const handleClick = e => {
        setMenuKey(e.key);
    };

    const handleRemoveFavorite = (id) => {
        const payload = {
            uid: currentUser.id,
            cid: id
        };
        dispatch({ type: 'user/delFavorite', payload });
    }


    return (
        <Row>
            <Col span={3} />
            <Col span={18}>
                <Row>
                    <Col span={6} style={{ alignItems: 'center' }}>
                        <div style={{ width: '100%' }}>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Avatar size={130} src={currentUser.avatar} style={{ alignItems: 'center' }} />

                            </div>
                            <Typography.Title level={4} style={{ textAlign: 'center' }}>{currentUser.name}</Typography.Title>
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
                                    dataSource={favoriteCourses}
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
                                                    <Typography.Title level={4}>{item.name}</Typography.Title>
                                                    <Typography>{item.briefDescription}</Typography>
                                                    <Typography style={{ fontSize: '12px' }}>{item.lecturer}</Typography>
                                                </Col>
                                                <Col span={2}>
                                                    <Button onClick={() => {
                                                        handleRemoveFavorite(item.id);
                                                    }}>Remove</Button>
                                                </Col>
                                            </Row>
                                        </List.Item>
                                    )}
                                />
                            </Card>
                        }

                        {
                            menuKey === "signed" &&
                            <Card title="Registed Courses">
                                <List
                                    itemLayout="vertical"
                                    size="large"
                                    loading={loading}
                                    pagination={{
                                        pageSize: 5,
                                    }}
                                    dataSource={registedCourses}
                                    renderItem={item => {
                                        let progress = 0;

                                        if (item.sylabus) {
                                            let count = 0;
                                            console.log(item);
                                            item.sylabus.forEach(element => {
                                                if (element.isDone === true) {
                                                    count++;
                                                }
                                            });
                                            progress=(count/item.sylabus.length)*100;
                                        }
                                        return (
                                            <List.Item
                                                key={item.title}
                                            >
                                                <Row onDoubleClick={() => {
                                                    history.push({
                                                        pathname: `/studentCourse`,
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
                                                        <Typography.Title level={4}>{item.name}</Typography.Title>
                                                        <Typography>{item.briefDescription}</Typography>
                                                        <Typography style={{ fontSize: '12px' }}>{item.lecturer}</Typography>
                                                        <Progress percent={progress} />
                                                    </Col>
                                                </Row>
                                            </List.Item>
                                        )
                                    }}
                                />
                            </Card>
                        }

                    </Col>
                </Row>
            </Col>
        </Row>
    )
};


export default connect(({ user }) => ({
    currentUser: user.currentUser,
    favoriteCourses: user.favoriteCourses,
    registedCourses: user.registedCourses,
    deleteFavoriteStatus: user.deleteFavoriteStatus
}))(Profile);