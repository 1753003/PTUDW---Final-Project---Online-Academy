/* eslint-disable react/no-danger */
import React, { useEffect, useState } from 'react';
import { Typography, Input, PageHeader, Alert, Menu, Icon, Checkbox, Row, Col, List, Avatar, Rate, Card, Button, Divider, message } from 'antd';
import Course from '@/components/Course';
import ShowMore from '@/components/ShowMore';
import { PageLoading } from '@ant-design/pro-layout';
import { Link } from 'umi';

import { connect } from 'dva';

const { TextArea } = Input;
const { SubMenu } = Menu;


const Detail = ({ list, loading, location, detail, history, dispatch, currentUser, addToFavoriteStatus, registCourseStatus, sendCommentStatus }) => {
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0);
    const [loadingPage, setLoadingPage] = useState(false);
    useEffect(() => {
        const { query } = location;
        console.log(query);
        const payload = {
            id: query.courseId
        }

        dispatch({ type: 'course/getSingleCourse', payload });
    }, []);

    useEffect(() => {
        if(comment === '') {
            setLoadingPage(loading);
        }
        console.log(loading);
    }, [loading]);

    useEffect(() => {
        if (addToFavoriteStatus === "SUCCESS") {
            message.success('Add to Favorite successfully');
            dispatch({ type: 'user/resetStatus' });
        }
        if (addToFavoriteStatus === "FAIL") {
            message.error('Add to Favorite fail');
            dispatch({ type: 'user/resetStatus' });
        }
    }, [addToFavoriteStatus]);

    useEffect(() => {
        const { query } = location;
        console.log(query);
        const payload = {
            id: query.courseId
        }
        if (sendCommentStatus === "SUCCESS") {
            message.success('Send successfully');
            dispatch({ type: 'course/resetStatus' });
            dispatch({ type: 'course/getSingleCourse', payload });

        }
        if (sendCommentStatus === "FAIL") {
            message.error('Add to Favorite fail');
            // dispatch({ type: 'course/resetStatus' });
            dispatch({ type: 'course/getSingleCourse', payload });

        }
    }, [sendCommentStatus]);

    useEffect(() => {
        if (registCourseStatus === "SUCCESS") {
            message.success('Regist Course successfully');
            dispatch({ type: 'user/resetStatus' });
        }
        if (registCourseStatus === "FAIL") {
            message.error('Regist Course fail');
            dispatch({ type: 'user/resetStatus' });
        }
    }, [registCourseStatus]);


    const handleAddToFavorite = () => {
        const { query } = location;
        const payload = {
            uid: currentUser?.id,
            cid: query.courseId
        }
        dispatch({ type: 'user/addToFavorite', payload });
    }

    const handleAddToRegister = () => {
        const { query } = location;
        const sylabus = []
        detail.courseSylabus.forEach((item) => {
            const session = {
                week: item.week,
                isDone: false,
                description: item.detailDescription,
                lecturerID: item.lecturerID,
                videoLink: item.videoLink,
                name: item.name,
                lesson: item.lesson
            }
            sylabus.push(session);
        })
        const payload = {
            uid: currentUser?.id,
            cid: query.courseId,
            sylabus
        }
        dispatch({ type: 'user/registCourse', payload });
    }

    const onSubmitClick = () => {
        const { query } = location;
        const payload = {
            uid: currentUser?.id,
            cid: query.courseId,
            data: {
                rate: rating,
                comments: comment
            }
        }
        dispatch({ type: 'course/sendComment', payload})
    }

    return (
        (loadingPage) ? <PageLoading /> : <PageHeader>
            <Row gutter={24}>
                <Col span={3} />
                <Col span={12}>
                    {/* <div>Hello {query.courseId}</div> */}
                    <Typography.Title level={1}>{detail?.courseInfo?.name}</Typography.Title>
                    <Typography.Title level={3}>Detail Infomation</Typography.Title>
                    <Row type='flex' justify='bottom' align='middle' style={{verticalAlign: 'baseline', fontWeight:'bolder', color:'peru'}}>
                        {detail?.courseInfo?.rating}
                        <Rate disabled defaultValue={detail?.courseInfo?.rating} style={{fontSize:'11pt'}}/>
                        <Typography.Text style={{fontWeight:'normal',fontStyle: 'italic', fontSize:'10pt'}}>
                            ({detail?.courseInfo?.numRate} ratings) {detail?.courseInfo?.views} students
                        </Typography.Text>
                    </Row>
                    <Typography style={{fontStyle: 'italic'}}>Create by {detail?.courseInfo?.lecturerName}</Typography>
                    <Typography> <Icon type="info-circle" /> Last Updated {detail?.courseInfo?.updatedDate}</Typography>
                    <Typography><Icon type="global" /> English</Typography>


                    <div className="CardContent" style={{ marginTop: '30px', marginRight: '30px' }}>
                        <Typography.Title level={3}>Course content</Typography.Title>
                        {
                            detail?.courseSylabus?.map((item) =>
                                <ShowMore title={`Week ${item.week}`} info={item.lesson} />)
                        }
                    </div>

                    <div className="description" style={{ marginTop: '30px', marginRight: '30px', 'wordWrap': 'break-word' }}>
                        <Typography.Title level={3}>Description</Typography.Title>
                        <div dangerouslySetInnerHTML={{ __html: `${detail?.courseInfo?.detailDescription}` }} />
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
                            dataSource={detail?.courseReview}

                            renderItem={item => (
                                <List.Item
                                    key={item.title}
                                >
                                    <List.Item.Meta
                                        avatar={<Avatar src={item.avatar} />}
                                        title={<a href={item.href}>{item.title}</a>}
                                        description={<Rate disabled value={item.rate} style={{ fontSize: '14px', paddingBottom: '5px', paddingLeft: '-5px' }} />}
                                    />
                                    {item.comments?.split("\"")[1]}
                                </List.Item>
                            )}
                        />
                        <Typography.Title level={4}>Write your comment here</Typography.Title>
                        <Rate style={{ paddingBottom: "10px" }} onChange={(value) => { setRating(value) }} />
                        <Row gutter={16}>
                            <Col span={20}>
                                <TextArea rows={1} onChange={(e) => {
                                    setComment(e.currentTarget.value);
                                }} />
                            </Col>
                            <Col span={4}><Button style={{ width: "100%" }} type="primary" onClick={onSubmitClick}>Submit</Button></Col>
                        </Row>
                    </div>

                    <div className="great-courses" style={{ marginTop: '50px' }}>
                        <Typography.Title level={3}>Same</Typography.Title>
                        <List
                            grid={{ gutter: 16, column: 3 }}
                            dataSource={detail?.courseRelate}
                            renderItem={item => (

                                <List.Item onClick={() => {
                                    const payload = {
                                        id: item.courseID
                                    }

                                    dispatch({ type: 'course/getSingleCourse', payload });
                                    history.push({
                                        pathname: `/detail`,
                                        query: {
                                            courseId: item.courseID,
                                        },
                                    });
                                }}>
                                    <Course url={item.URL} title={item.courseName} author={item.author} price={item.price} />
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
                            src={detail?.courseInfo.URL}
                        />}
                    >
                        <div className="Info">
                            <Typography style={{ fontSize: "40px", fontWeight: 'bold', color: 'peru' }}>{detail?.courseInfo.salePrice}$</Typography>
                            <Typography.Text delete style={{ fontSize: "25px" }}>{detail?.courseInfo.price}$</Typography.Text>
                            {
                                currentUser.id ?
                                    <div>
                                        <Button type="primary" style={{ width: '100%', height: '50px', fontWeight: 'bold' }} onClick={handleAddToFavorite}>Add to Favorite</Button><br />
                                        <Button style={{ width: '100%', height: '50px', color: '#1890ff', borderColor: '#1890ff', fontWeight: 'bold', marginTop: '10px' }} onClick={handleAddToRegister}>Enroll</Button>
                                    </div> : null
                            }

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


export default connect(({ course, loading, user }) => ({
    list: course.list,
    loading: loading.effects['course/getSingleCourse'],
    detail: course.courseDetail,
    currentUser: user.currentUser,
    addToFavoriteStatus: user.addToFavoriteStatus,
    registCourseStatus: user.registCourseStatus,
    sendCommentStatus: course.sendCommentStatus
}))(Detail);