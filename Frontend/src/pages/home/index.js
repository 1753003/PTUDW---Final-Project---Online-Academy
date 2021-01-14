import React, { useEffect } from 'react';
import { Tooltip, Typography, Carousel, Row, Col, List, Tabs, Divider, Icon, Card, PageHeader, Rate, Tag } from 'antd';
import styles from './index.less';
import Course from '@/components/Course';
import { connect } from 'dva';

const { Title } = Typography;

const Home = ({ dispatch, listHot, listNew, listTrending, listHotCategory, history }) => {
  useEffect(() => {
    dispatch({ type: 'course/get' });
    dispatch({ type: 'course/getHot' });
    dispatch({ type: 'course/getNew' });
    dispatch({ type: 'course/getTrending' });
    dispatch({ type: 'category/getHot' });
    if(listHot) {console.log('listHot', Array.from(listHot,x=> x.courseID ))}
  // console.log('list', listHot)}
  }, []);
  const quote =(q1,q2,q3)=> (<div className={styles.quote}>
    <Divider />
<Row type='flex' justify="space-between" align="center" className="note" style={{ marginTop: "25px" }} gutter={16}>
  <Col span={8}>
    <Row>
      <Col span={4}>
        <Icon type="database" style={{ fontSize: '42px', textAlign: 'start' }} />
      </Col>
      <Col span={20}>
        <Typography.Text>{q1}</Typography.Text>
      </Col>
    </Row>
  </Col>
  <Col span={8}>
    <Row>
      <Col span={4}>
        <Icon type="safety-certificate" style={{ fontSize: '42px', textAlign: 'start' }} />
      </Col>
      <Col span={20}>
        <Typography.Text>{q2}</Typography.Text>
      </Col>
    </Row>
  </Col>
  <Col span={8}>
    <Row>
      <Col span={4}>
        <Icon type="clock-circle" style={{ fontSize: '42px', textAlign: 'start' }} />
      </Col>
      <Col span={20}>
        <Typography.Text>{q3}</Typography.Text>
      </Col>
    </Row>
  </Col>
</Row>

<Divider />
  </div>) 
  const extraInfo = (img, title, description) => (<div className={styles.extraInfo}>
    <Divider />
          <Row type='flex' justify='space-around' align='middle'>
          <Col xs={0} sm={0} md={4} lg={4} xl={4}>
            <img
            className = {styles.cover}
            src={img}>
            </img>
          </Col>
            <Col className={styles.extras} xs={24} sm={24} md={10} lg={10} xl={10}>
            <Typography.Title level={1}>
            {title}
            </Typography.Title>
            <Typography.Paragraph>
            {description}
            </Typography.Paragraph>
            </Col>
          </Row>
    <Divider />
  </div>)
  return (
    <Row type='flex' justify='center' align='middle'>
      <Col span={20}>
        <PageHeader>
          <Title level={3}>Hot Courses This Week</Title>
          <Carousel autoplay>
            {
              listHot?.map((item) => (
                <Row gutter={16}>
                  <Col span={16}>
                    <img src={item.URL} height='300px' width='100%' alt='hinh' style={{objectFit: 'cover'}} onClick={() => {
                      history.push({
                        pathname: `/detail`,
                        query: {
                          courseId: item.courseID,
                        },
                      });
                    }} />
                  </Col>
                  <Col span={8} style={{backgroundColor:'white'}}>
                    <h2>{item.name} </h2>
                    <p><b>Topic: </b>{item.categoryName}</p>
                    <p><b>Brief Description: </b>{item.briefDescription}</p>
                    <Rate allowHalf disabled defaultValue={item.rating} />
                    <p>({item.numRate} rating)</p>
                    <p>{item.lecturerName}</p>                 
                    <Typography.Text delete>${item.price}    </Typography.Text>               
                    <Typography.Text> <b>${item.salePrice}</b></Typography.Text>   
        
                  </Col>
                  <Row type='flex' gutter={[8, 8]}>
        <Col>
        {(Date.now() - Date.parse(item.createdDate)<604800001*4)&&<Tag color="green">New</Tag>}
        </Col><Col>
        <Tag color="volcano">Hot Seller</Tag>
        </Col>
        <Col>
        {item.status !== "Complete"&& <Tooltip title="This course is on updating sylabus">
        <Icon type="info-circle" theme="twoTone" twoToneColor="#ffcc00"/></Tooltip>}
        {item.status === "Complete"&& <Tooltip title="This course has complete sylabus">
        <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" /></Tooltip>}
        </Col>
      </Row>
                </Row>
              ))}
          </Carousel>
          {quote(<div>Find video courses on almost any topic <br /> Build your library for your career and personal growth</div>,<div>Learn from industry experts<br /> Select from top instructors around the world</div>,<div>Go at your own pace<br />Enjoy lifetime access to courses on Pondemy’s website</div>)}
          <div className="trending-courses" style={{ marginTop: '50px' }}>
            <Title level={3}>Most Views Courses</Title>
            <List
              grid={{ gutter: 10, xs: 1,
                sm: 2,
                md: 2,
                lg: 4,
                xl: 4,
                xxl: 6, }}
              pagination={{
                size: 'small',
                defaultPageSize: 4,
              }}
              dataSource={listTrending}
              renderItem={item => (
                <List.Item onClick={() => {
                  console.log('item',item)
                  history.push({
                    pathname: `/detail`,
                    query: {
                      courseId: item.courseID,
                    },
                  });
                }}>
                  <Course
                  url={item.URL}
                  title={item.name}
                  price={item.price} 
                  category={item.categoryName} 
                  lecturer={item.lecturerName}
                  salePrice={item.salePrice}
                  rating={item.rating}
                  numRate={item.numRate}
                  isHot={listHot&&Array.from(listHot, x => x.courseID).includes(item.courseID)}
                  isNew = {(Date.now() - Date.parse(item.createdDate)<604800001*4)}
                  status={item.status}/>
                </List.Item>
              )}
            />
          </div>
 
          {quote(<div>130,000 online courses <br /> Enjoy a variety of fresh topics</div>,<div>Expert instruction<br /> Find the right instructor for you</div>,<div>Lifetime access<br />Learn on your schedule</div>)}
          <div className="great-courses" style={{ marginTop: '50px' }}>
            <Title level={3}>New Courses</Title>
            <List
              grid={{ gutter: 10, xs: 1,
                sm: 2,
                md: 2,
                lg: 4,
                xl: 4,
                xxl: 6, }}
              pagination={{
                size: 'small',
                defaultPageSize: 4,
              }}
              dataSource={listNew}
              renderItem={item => (
                <List.Item onClick={() => {
                  history.push({
                    pathname: `/detail`,
                    query: {
                      courseId: item.id,
                    },
                  });
                }}>
                  <Course
                  url={item.URL}
                  title={item.name}
                  price={item.price} 
                  category={item.categoryName} 
                  lecturer={item.lecturerName}
                  salePrice={item.salePrice}
                  rating={item.rating}
                  numRate={item.numRate}
                  isHot={listHot&&Array.from(listHot, x => x.courseID).includes(item.id)}
                  isNew = "True"
                  status={item.status}/>
                </List.Item>
              )}
            />
          </div>
          {extraInfo("https://s.udemycdn.com/home/non-student-cta/udlite-lohp-promo-ufb.jpg","Transform your life through education"," Mohamad Alaloush launched a new career in software development by taking courses on Pondemy. What will you be able to do?")}
          <div className="categories" style={{ marginTop: '50px' }}>
            <Title level={3}>Top categories</Title>
            <List
              grid={{ gutter: 10, xs: 1,
                sm: 2,
                md: 2,
                lg: 4,
                xl: 4,
                xxl: 6, }}
              dataSource={listHotCategory}
              renderItem={item => (
                <List.Item onClick={() => {
                  history.push({
                    pathname: `/search`,
                    query: {
                      q: item.name,
                    },
                  });
                }}>
                    <Card
                      hoverable
                    cover={<img alt="example" src={item.backgroundURL} />}
                  >
                    <Card.Meta title={item.name} />
                  </Card>
                </List.Item>
              )}
            />
          </div>
          {extraInfo("https://s.udemycdn.com/home/non-student-cta/udlite-lohp-promo-teacher.jpg","Become an instructor","Top instructors from around the world teach millions of students on Udemy. We provide the tools and skills to teach what you love. Email us now at group7.17clc@gmail.com")}
        </PageHeader>
      </Col>
    </Row>

  )
};


export default connect(({ course, category }) => ({
  list: course,
  listHot: course.listHot,
  listNew: course.listNew,
  listTrending: course.listTrending,
  listHotCategory: category.listHotCategory
}))(Home);