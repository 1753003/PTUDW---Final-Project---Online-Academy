import React, { useEffect, useState } from 'react';
import { Typography, Input, PageHeader, Alert, Menu, Icon, Checkbox, Row, Col, List, Avatar, Rate, Card, Button, Divider } from 'antd';
import Course from '@/components/Course';
import ShowMore from '@/components/ShowMore';

import { connect } from 'dva';

const { TextArea } = Input;
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

const listData = [];
for (let i = 0; i < 23; i++) {
    listData.push({
        href: 'http://ant.design',
        title: `ant design part ${i}`,
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        description:
            <Rate defaultValue={4} style={{ fontSize: '14px', paddingBottom: '5px', paddingLeft: '-5px' }} />,
        content:
            'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    });
}

const Detail = ({ dispatch, list, loading, location }) => {
    const courseData2 = [
        {
            id: 1,
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            title: 'AWS Certified Solutions Architect - Associate 2020',
            author: 'Phu Vinh Hung',
            price: '80'
        },
        {
            id: 2,
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            title: 'AWS Certified Solutions Architect - Associate 2020',
            author: 'Phu Vinh Hung',
            price: '80'
        },
        {
            id: 3,
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            title: 'AWS Certified Solutions Architect - Associate 2020',
            author: 'Phu Vinh Hung',
            price: '80'
        },
        {
            id: 4,
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            title: 'AWS Certified Solutions Architect - Associate 2020',
            author: 'Phu Vinh Hung',
            price: '80'
        },
        {
            id: 5,
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            title: 'AWS Certified Solutions Architect - Associate 2020',
            author: 'Phu Vinh Hung',
            price: '80'
        },
    ]

    const { query } = location;
    return (
        <PageHeader>
            <Row gutter={24}>
                <Col span={3} />
                <Col span={12}>
                    {/* <div>Hello {query.courseId}</div> */}
                    <Typography.Title level={1}>Hom nay la mot ngay dep troi</Typography.Title>
                    <Typography.Title level={4}>Thong tin chi tiet</Typography.Title>
                    <Row align="center" style={{ display: 'flex', alignItems: 'center' }}>
                        <Col span={1} style={{ Left: '10px' }}>
                            <Typography style={{ fontSize: '14px' }}>{4}</Typography>
                        </Col>
                        <Col span={4}>
                            <Rate defaultValue={4} style={{ fontSize: '14px', paddingBottom: '5px', paddingLeft: '-5px' }} />
                        </Col>
                        <Col span={10}>
                            <Typography style={{ fontSize: '12px' }}>(123456 ratings) 275305 students</Typography>
                        </Col>
                    </Row>
                    <Typography>Create by Hleloafdskfjal</Typography>
                    <Typography> <Icon type="info-circle" /> Last Updated 7/2020 <Icon type="global" /> English</Typography>


                    <Card style={{ marginTop: '50px', marginRight: '30px' }}>
                        <Typography.Title level={4}>What you'll learn</Typography.Title>
                        <Typography><Icon type="check" /> The students could understand Python Basics</Typography>
                        <Typography><Icon type="check" /> The students could understand Python Basics</Typography>
                        <Typography><Icon type="check" /> The students could understand Python Basics</Typography>
                        <Typography><Icon type="check" /> The students could understand Python Basics</Typography>
                        <Typography><Icon type="check" /> The students could understand Python Basics</Typography>
                    </Card>

                    <Card style={{ marginTop: '30px', marginRight: '30px' }}>
                        <Typography.Title level={4}>What you'll learn</Typography.Title>
                        <Typography><Icon type="check" /> The students could understand Python Basics</Typography>
                        <Typography><Icon type="check" /> The students could understand Python Basics</Typography>
                        <Typography><Icon type="check" /> The students could understand Python Basics</Typography>
                        <Typography><Icon type="check" /> The students could understand Python Basics</Typography>
                        <Typography><Icon type="check" /> The students could understand Python Basics</Typography>
                    </Card>

                    <div className="CardContent" style={{ marginTop: '30px', marginRight: '30px' }}>
                        <Typography.Title level={3}>Course content</Typography.Title>
                        <ShowMore title="WEB" info="Hom nay la mot ngay dep troi"/>
                        <ShowMore title="WEB" info="Hom nay la mot ngay dep troi"/>
                        <ShowMore title="WEB" info="Hom nay la mot ngay dep troi"/>
                        <ShowMore title="WEB" info="Hom nay la mot ngay dep troi"/>
                        <ShowMore title="WEB" info="Hom nay la mot ngay dep troi"/>

                    </div>

                    <div className="description" style={{ marginTop: '30px', marginRight: '30px', 'wordWrap': 'break-word' }}>
                        <Typography.Title level={3}>Description</Typography.Title>
                        <Typography.Text>flkasdjflkasjfklasdjfklajslfkjaskldfjaksldjfkljkljasdfkljaskldfasdfasdfasdfasdftyufadshfiahsdifhasdfhlkjasdhfkjahs3dfjhakjdshfkjlashdlkfjhaskdfhkajshdfkajshdflkjashdfkjashdkfljashd3</Typography.Text>
                    </div>

                    <div className="comment" style={{ marginTop: '50px' }}>
                        <Typography.Title level={3}>Student feedback</Typography.Title>
                        <List
                            itemLayout="vertical"
                            size="large"
                            pagination={{
                                onChange: page => {
                                    console.log(page);
                                },
                                pageSize: 3,
                            }}
                            dataSource={listData}

                            renderItem={item => (
                                <List.Item
                                    key={item.title}
                                >
                                    <List.Item.Meta
                                        avatar={<Avatar src={item.avatar} />}
                                        title={<a href={item.href}>{item.title}</a>}
                                        description={item.description}
                                    />
                                    {item.content}
                                </List.Item>
                            )}
                        />
                        <Typography.Title level={4}>Write your comment here</Typography.Title>
                        <Rate style={{paddingBottom: "10px"}}/>
                        <Row>
                            <Col span={20}><TextArea rows={1} /></Col>
                            <Col span={4}><Button style={{width: "100%"}}>Submit</Button></Col>
                        </Row>
                    </div>

                    <div className="great-courses" style={{ marginTop: '50px' }}>
                        <Typography.Title level={3}>Same</Typography.Title>
                        <List
                            grid={{ gutter: 16, column: 4 }}
                            dataSource={courseData2}
                            renderItem={item => (
                                <List.Item>
                                    <Course url={item.url} title={item.title} author={item.author} price={item.price} />
                                </List.Item>
                            )}
                        />
                    </div>

                </Col>
                <Col span={6}>
                    <Card
                        hoverable
                        style={{ width: 345, position: 'fixed' }}
                        cover={<img
                            width={345}
                            alt="logo"
                            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                        />}
                    >
                        <div className="Info">
                            <Typography.Title level={1}>$19.90</Typography.Title>
                            <Button type="primary" style={{ width: '100%', height: '50px', fontWeight: 'bold' }}>Add to card</Button><br />
                            <Button style={{ width: '100%', height: '50px', color: '#1890ff', borderColor: '#1890ff', fontWeight: 'bold', marginTop: '10px' }}>Buy now</Button>
                            <Typography style={{ textAlign: 'center' }}>30-Day Money-Back Guarantee</Typography>
                            <Typography style={{ fontWeight: 'bold', fontSize: '18px' }}>This course includes:</Typography>
                            <Typography><Icon type="play-circle" /> 2.5 hours on-demand video</Typography>
                            <Typography><Icon type="file" /> 1 article</Typography>
                            <Typography><Icon type="download" /> 51 downloadable resources </Typography>
                            <Typography><Icon type="mobile" /> Access on mobile and TV </Typography>
                            <Typography><Icon type="safety-certificate" /> Certificate of completion </Typography>

                        </div>
                    </Card>
                </Col>
                <Col span={4} />
            </Row>
        </PageHeader>
    )
};


export default connect(({ course }) => ({
    list: course.list,
    loading: course.loading
}))(Detail);