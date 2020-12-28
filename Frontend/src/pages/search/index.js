import React, { useEffect, useState } from 'react';
import { Typography, Input, PageHeader, Alert, Menu, Icon, Checkbox, Row, Col, List, Rate } from 'antd';
import { connect } from 'dva';
import category from '../admin/category';

const { SubMenu } = Menu;


const SearchPage = ({ loading, history, searchList, location, dispatch }) => {
    const [searchKey, setSearchKey] = useState('');
    
    useEffect(() => {
        setSearchKey(location.query.q)
        const payload = {
            value: location.query.q,
        }
        dispatch({ type: 'course/search', payload })
    }, [location])

    useEffect(() => {
        console.log(location.pathname.split('/')[2])
    }, [])
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
            <Typography.Title level={1}>{searchList?.length} results for '{searchKey}'</Typography.Title>
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
                            pageSize: 10,
                        }}
                        dataSource={searchList}
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
                                    console.log(item);
                                    history.push({
                                        pathname: `/detail`,
                                        query: {
                                            courseId: item.courseID,
                                        },
                                    });
                                }}>
                                    <Col span={7}>
                                        <img
                                            width={272}
                                            alt="logo"
                                            src={item.URL}
                                        />
                                    </Col>
                                    <Col span={15}>
                                        <Typography.Title level={4}>{item.courseName}</Typography.Title>
                                        <Typography>{item.briefDescription}</Typography>

                                        <Typography style={{ fontSize: '12px' }}>{item.lecturer}</Typography>
                                        <Row align="center" style={{ display: 'flex', alignItems: 'center' }}>
                                            <Col span={1} style={{ Left: '10px' }}>
                                                <Typography style={{ fontSize: '14px' }}>{item.rating}</Typography>
                                            </Col>
                                            <Col span={4}>
                                                <Rate disabled defaultValue={item.rating} style={{ fontSize: '14px', paddingBottom: '5px', paddingLeft: '-5px' }} />
                                            </Col>
                                            <Col span={1}>
                                                <Typography style={{ fontSize: '12px' }}>{item.views}</Typography>
                                            </Col>
                                        </Row>

                                    </Col>
                                    <Col span={2}>
                                       
                                        <Typography>{item.salePrice}$</Typography>
                                        <Typography.Text delete>{item.price}$</Typography.Text>
                                    </Col>
                                </Row>
                            </List.Item>
                        )}
                    />
            </Col>
            </Row>

        </PageHeader>
    )
};


export default connect(({ course }) => ({
    list: course.list,
    searchList: course.searchList,
    loading: course.loading
}))(SearchPage);
