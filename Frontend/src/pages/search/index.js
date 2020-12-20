import React, { useEffect, useState } from 'react';
import { Typography, Input, PageHeader, Alert, Menu, Icon, Checkbox, Row, Col, List, Avatar, Rate } from 'antd';
import { Redirect, Route, useHistory } from 'umi';
import { connect } from 'dva';

const { Search } = Input;
const { SubMenu } = Menu;

// const listData = [];
// for (let i = 0; i < 23; i++) {
//     listData.push({
//         url: 'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
//         name: 'Hello! Programming with Python for Kids and Beginners',
//         description: 'Beginner, Basics, Foundation, Code, Coding, Graphics, Game, Data, Computer Science, Scratch, Kids, Teens, K12, Children',
//         author: 'Phu Vinh Hung',
//         rating: 4,
//         price: 15,
//         discountPrice: 19.9
//     });
// }

const SearchPage = ({ dispatch, list, loading, history }) => {
    const [searchKey, setSearchKey] = useState('');
    useEffect(() => {
        dispatch({ type: 'course/get' });
    }, [])

    useEffect(() => {
        console.log(list);
    }, [list])
    const topicList = [
        {
            key: 1,
            name: 'Web Development',
            number: 5
        },
        {
            key: 2,
            name: 'JS',
            number: 5
        },
        {
            key: 3,
            name: 'Python',
            number: 5
        },
    ]

    const onSearch = (value) => {
        const payload = {
            value
        }
        setSearchKey(value);
        dispatch({ type: 'course/search', payload })
    }
    return (
        <PageHeader>
            <Typography.Title level={1}>{list.length} results for '{searchKey}'</Typography.Title>
            <Search placeholder='Please input searchh text' onSearch={onSearch} />
            <Alert
                description="Not sure? All courses have a 30-day money-back guarantee"
                type="info"
                showIcon
            />
            <Row>
                <Col span={5}>
                    <Menu
                        // onClick={this.handleClick}
                        style={{ width: 256 }}
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                    >
                        <SubMenu
                            key="sub1"
                            title={
                                <span>
                                    <Icon type="mail" />
                                    <span>Topic</span>
                                </span>
                            }
                        >
                            {
                                topicList.map((item) =>
                                    <Menu.Item key={item.key}><Checkbox>{item.name}({item.number})</Checkbox></Menu.Item>
                                )
                            }

                        </SubMenu>
                    </Menu>
                </Col>
                <Col span={18}>
                    <List
                        itemLayout="vertical"
                        size="large"
                        loading={loading}
                        pagination={{
                            onChange: page => {
                                console.log(page);
                            },
                            pageSize: 10,
                        }}
                        dataSource={list}
                        renderItem={item => (
                            <List.Item
                                key={item.title}
                            >
                                {/* <List.Item.Meta
                                    avatar={<Avatar src={item.avatar} />}
                                    title={<a href={item.href}>{item.title}</a>}
                                    description={item.description}
                                /> */}
                                <Row onDoubleClick={() => {
                                    history.push({
                                        pathname: `/detail`,
                                        query: {
                                            courseId: item.id,
                                        },
                                    });
                                }}>
                                    <Col span={7}>
                                        <img
                                            width={272}
                                            alt="logo"
                                            src={item.url}
                                        />
                                    </Col>
                                    <Col span={15}>
                                        <Typography.Title level={4}>{item.name}</Typography.Title>
                                        <Typography>{item.briefDescription}</Typography>

                                        <Typography style={{ fontSize: '12px' }}>{item.lecturer}</Typography>
                                        <Row align="center" style={{ display: 'flex', alignItems: 'center' }}>
                                            <Col span={1} style={{ Left: '10px' }}>
                                                <Typography style={{ fontSize: '14px' }}>{item.rating}</Typography>
                                            </Col>
                                            <Col span={4}>
                                                <Rate defaultValue={item.rating} style={{ fontSize: '14px', paddingBottom: '5px', paddingLeft: '-5px' }} />
                                            </Col>
                                            <Col span={1}>
                                                <Typography style={{ fontSize: '12px' }}>{item.views}</Typography>
                                            </Col>
                                        </Row>

                                    </Col>
                                    <Col span={2}>
                                        <Typography>{item.price}$</Typography>
                                        <Typography.Text delete>{item.salePrice}$</Typography.Text>
                                    </Col>
                                </Row>
                            </List.Item>
                        )}
                    />,
            </Col>
            </Row>

        </PageHeader>
    )
};


export default connect(({ course }) => ({
    list: course.list,
    loading: course.loading
}))(SearchPage);