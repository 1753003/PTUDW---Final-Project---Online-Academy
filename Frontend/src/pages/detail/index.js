/* eslint-disable react/no-danger */
import React, { useEffect, useState } from 'react';
import { Tooltip, Typography, Input, PageHeader, Alert, Menu, Icon, Checkbox, Row, Col, List, Avatar, Rate, Card, Button, Divider, message, Tag } from 'antd';
import Course from '@/components/Course';
import ShowMore from '@/components/ShowMore';
import { PageLoading } from '@ant-design/pro-layout';
import { Link } from 'umi';
import styles from './index.less';
import { connect } from 'dva';

const { TextArea } = Input;
const { SubMenu } = Menu;


const Detail = ({ listHot, loading, location, detail, history, dispatch, currentUser, addToFavoriteStatus, registCourseStatus, sendCommentStatus }) => {
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
        if(detail) {
            const { query } = location;
            const payload = {
                id: query.courseId,
                courseData: {
                    name: detail?.courseInfo.name,
                    price: detail?.courseInfo.price,
                    salePrice: detail?.courseInfo.salePrice,
                    briefDescription: detail?.courseInfo.briefDescription,
                    detailDescription: detail?.courseInfo.detailDescription,
                    saleInformation: detail?.courseInfo.saleInformation,
                    status: detail?.courseInfo.status,
                    views: detail?.courseInfo.views + 1,
                }
            }
            dispatch({ type: 'course/updateViews', payload });
        }
        
    },[detail])
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
        if (addToFavoriteStatus === "EXISTED") {
            message.info('Already in your favorite list');
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
        if (sendCommentStatus === "AVAILABLE") {
            message.success('Send successfully');
            dispatch({ type: 'course/resetStatus' });
            dispatch({ type: 'course/getSingleCourse', payload });

        }
        if (sendCommentStatus === "NOTAVAILABLE") {
            message.warning('Review update');
            dispatch({ type: 'course/resetStatus' });
            dispatch({ type: 'course/getSingleCourse', payload });
        }
        if (sendCommentStatus === "NOTENROLL") {
            message.error('Please enroll before reviewing course');
            dispatch({ type: 'course/resetStatus' });
        }
        if (sendCommentStatus === "FAIL") {
            message.error('Review fail.Please try again');
            // dispatch({ type: 'course/resetStatus' });
            dispatch({ type: 'course/getSingleCourse', payload });

        }
    }, [sendCommentStatus]);

    useEffect(() => {
        if (registCourseStatus === "SUCCESS") {
            message.success('Regist Course successfully');
            dispatch({ type: 'user/resetStatus' });
        }
        if (registCourseStatus === "EXISTED") {
            message.info('Already enrolled');
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
            uid: currentUser.id,
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
            <Typography.Title level={1}>{detail?.courseInfo?.name}</Typography.Title>
            <Row type='flex' gutter={[8, 8]}>
        <Col>
        {(Date.now() - Date.parse(detail?.courseInfo?.createdDate)<604800001*4)&&<Tag color="green">New</Tag>}
        </Col><Col>
        {listHot&&Array.from(listHot, x => x.courseID).includes(detail?.courseInfo?.id)&&<Tag color="volcano">Best Seller</Tag>}
        </Col>
        <Col>
        {detail?.courseInfo?.status !== "Complete"&& <Tooltip title="This course is on updating sylabus">
        <Icon type="info-circle" theme="twoTone" twoToneColor="#ffcc00"/></Tooltip>}
        {detail?.courseInfo?.status === "Complete"&& <Tooltip title="This course has complete sylabus">
        <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" /></Tooltip>}
        </Col>
      </Row>
            <Row type='flex' justify='start' gutter={24}>
            <Col className={styles.card} xs={{span:24}} md={{span:24}} sm={{span:24}}>
                    <Card
                    className={styles.card}
                        hoverable
                        cover={<img
                            className={styles.covercard}
                            alt="logo"
                            src={detail?.courseInfo.URL}
                        />}
                    >
                        <div className="Info">
                            <Typography style={{ fontSize: "40px", fontWeight: 'bold' }}>{detail?.courseInfo.salePrice}$</Typography>
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
                <Col xs={{span:24}} lg={{span:17}} md={{span:23}}>

                    
                    <div className="CardContent" style={{ marginTop: '30px', }}>
                    <Card title={<Typography.Title level={3} style={{color: "white"}}>Detail Infomation</Typography.Title>} headStyle={{backgroundColor:'#1DA57A'}}>
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
                    </Card>
                    </div>

                    <div className="CardContent" style={{ marginTop: '30px'}}>
                    <Card title={<Typography.Title level={3} style={{color: "white"}}>Sylabus</Typography.Title>} headStyle={{backgroundColor:'#1DA57A'}}>
                        {
                            detail?.courseSylabus?.map((item) =>
                                <ShowMore title={`Week ${item.week}`} info={item.lesson} />)
                        }
                        </Card>
                    </div>

                    <div className="description" style={{ marginTop: '30px','wordWrap': 'break-word' }}>
                    <Card title={<Typography.Title level={3} style={{color: "white"}}>Detail Infomation</Typography.Title>} headStyle={{backgroundColor:'#1DA57A'}}>
                        <div dangerouslySetInnerHTML={{ __html: `${detail?.courseInfo?.detailDescription}` }} />
                        </Card>
                    </div>
                </Col>
                
            
            
                {/* <Col xs={{span:0}} lg={{span:2}} md={{span:2}}></Col> */}
                <Col xs={{span:24}} lg={{span:17}} md={{span:23}}>
                <div className="comment" style={{ marginTop: '50px' }}>
                <Card title={<Typography.Title level={3} style={{color: "white"}}>Reviews</Typography.Title>} headStyle={{backgroundColor:'#1DA57A'}}>
                        <List
                            itemLayout="vertical"
                            size="large"
                            pagination={{
                                hideOnSinglePage:true,
                                pageSize: 3,
                            }}
                            dataSource={detail?.courseReview}
                            renderItem={item => 
                                item?.rate || item.rate == 0 ? 
                                <List.Item
                                    key={item.username}
                                >
                                    <List.Item.Meta
                                        avatar={<Avatar src={item.avatarURL?item.avatarURL:null} >{item?.username[0].toUpperCase()}</Avatar>}
                                        title={<a href={item.href}>{item.username}</a>}
                                        description={<Rate disabled value={item.rate} style={{ fontSize: '14px', paddingBottom: '5px', paddingLeft: '-5px' }} />}
                                    />
                                    {item.comments?.split("\"")[1]}
                                </List.Item>:<span></span>
                            }
                        />

                        {currentUser.id&&<div>
                        <Typography.Title level={4}>Write your comment here as {currentUser.name}</Typography.Title>

                        <Rate style={{ paddingBottom: "10px" }} onChange={(value) => { setRating(value) }} />
                        <Row gutter={16}>
                            <Col span={20}>
                                <TextArea rows={1} onChange={(e) => {
                                    setComment(e.currentTarget.value);
                                }} />
                            </Col>
                            <Col span={4}><Button style={{ width: "100%" }} type="primary" onClick={onSubmitClick}>Submit</Button></Col>
                            </Row>
                        </div>}
                        
                        </Card>
                    </div>

                    <div className="great-courses" style={{ marginTop: '50px' ,display:'block'}}>
                    <Card title={<Typography.Title level={3} style={{color: "white"}}>You may like</Typography.Title>} headStyle={{backgroundColor:'#1DA57A'}}>
                        <List
                            grid={{ gutter: 16, xs: 1,
                                sm: 2,
                                md: 2,
                                lg: 3,
                                xl: 3,
                                xxl: 4, }}
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
                                    <Course url={item.URL} title={item.courseName} lecturer={item.lecturer} price={item.price}  salePrice={item.salePrice} category={item.categoryName} rating={item.rating} numRate={item.rating} status={item.status} isHot={listHot&&Array.from(listHot, x => x.courseID).includes(detail?.courseInfo?.id)} isNew={(Date.now() - Date.parse(detail?.courseInfo?.createdDate)<604800001*4)}/>
                                </List.Item>
                            )}
                        />
                        </Card>
                    </div>
                </Col>
            </Row>
        </PageHeader>
    )
};


export default connect(({ course, loading, user }) => ({
    listHot: course.listHot,
    loading: loading.effects['course/getSingleCourse'],
    detail: course.courseDetail,
    currentUser: user.currentUser,
    addToFavoriteStatus: user.addToFavoriteStatus,
    registCourseStatus: user.registCourseStatus,
    sendCommentStatus: course.sendCommentStatus
}))(Detail);