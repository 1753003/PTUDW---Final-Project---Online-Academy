import React, { useEffect } from 'react';
import { Typography, Carousel, Row, Col, List, Tabs, Divider, Icon, Card, PageHeader, Rate, Tag } from 'antd';

import Course from '@/components/Course';
import { connect } from 'dva';

const { Title } = Typography;
const { TabPane } = Tabs;

const Home = ({ dispatch, listHot, listNew, listTrending, listHotCategory, history }) => {
  useEffect(() => {
    dispatch({ type: 'course/get' });
    dispatch({ type: 'course/getHot' });
    dispatch({ type: 'course/getNew' });
    dispatch({ type: 'course/getTrending' });
    dispatch({ type: 'category/getHot' });
  }, []);

  
  console.log(listTrending);
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
                </Row>
              ))}
          </Carousel>
          <Row className="note" style={{ marginTop: "25px" }}>
            <Col span={9}>
              <Row justify="center" align="center">
                <Col span={4}>
                  <Icon type="pie-chart" style={{ fontSize: '48px', textAlign: 'center' }} />
                </Col>
                <Col span={20}>
                  <Typography>130,000 online courses</Typography>
                  <Typography>Enjoy a variety of fresh topics</Typography>
                </Col>
              </Row>
            </Col>
            <Col span={8}>
              <Row>
                <Col span={4}>
                  <Icon type="smile" style={{ fontSize: '48px', textAlign: 'center' }} />
                </Col>
                <Col span={20}>
                  <Typography>130,000 online courses</Typography>
                  <Typography>Enjoy a variety of fresh topics</Typography>
                </Col>
              </Row>
            </Col>
            <Col span={7}>
              <Row>
                <Col span={5}>
                  <Icon type="smile" style={{ fontSize: '48px', textAlign: 'center' }} />
                </Col>
                <Col span={19}>
                  <Typography>130,000 online courses</Typography>
                  <Typography>Enjoy a variety of fresh topics</Typography>
                </Col>
              </Row>
            </Col>
          </Row>
          <Divider />
          <div className="trending-courses" style={{ marginTop: '50px' }}>
            <Title level={3}>Most Views Courses</Title>
            <List
              grid={{ gutter: 10, xs: 1,
                sm: 2,
                md: 2,
                lg: 3,
                xl: 4,
                xxl: 6, }}
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
                  numRate={item.numRate}/>
                </List.Item>
              )}
            />
          </div>
 
          <Divider />

          <Row className="note" style={{ marginTop: "25px" }} gutter={16}>
            <Col span={9}>
              <Row justify="center" align="center">
                <Col span={4}>
                  <Icon type="pie-chart" style={{ fontSize: '48px', textAlign: 'center' }} />
                </Col>
                <Col span={20}>
                  <Typography>130,000 online courses</Typography>
                  <Typography>Enjoy a variety of fresh topics</Typography>
                </Col>
              </Row>
            </Col>
            <Col span={8}>
              <Row>
                <Col span={4}>
                  <Icon type="smile" style={{ fontSize: '48px', textAlign: 'center' }} />
                </Col>
                <Col span={20}>
                  <Typography>130,000 online courses</Typography>
                  <Typography>Enjoy a variety of fresh topics</Typography>
                </Col>
              </Row>
            </Col>
            <Col span={7}>
              <Row>
                <Col span={5}>
                  <Icon type="smile" style={{ fontSize: '48px', textAlign: 'center' }} />
                </Col>
                <Col span={19}>
                  <Typography>130,000 online courses</Typography>
                  <Typography>Enjoy a variety of fresh topics</Typography>
                </Col>
              </Row>
            </Col>
          </Row>
           
          <Divider />
          <div className="great-courses" style={{ marginTop: '50px' }}>
            <Title level={3}>New Courses</Title>
            <List
              grid={{ gutter: 10, xs: 1,
                sm: 2,
                md: 2,
                lg: 3,
                xl: 4,
                xxl: 6, }}
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
                  numRate={item.numRate}/>
                </List.Item>
              )}
            />
          </div>
          <Divider />

          <Row className="note" style={{ marginTop: "25px" }} gutter={16}>
            <Col span={9}>
              <Row justify="center" align="center">
                <Col span={4}>
                  <Icon type="pie-chart" style={{ fontSize: '48px', textAlign: 'center' }} />
                </Col>
                <Col span={20}>
                  <Typography>130,000 online courses</Typography>
                  <Typography>Enjoy a variety of fresh topics</Typography>
                </Col>
              </Row>
            </Col>
            <Col span={8}>
              <Row>
                <Col span={4}>
                  <Icon type="smile" style={{ fontSize: '48px', textAlign: 'center' }} />
                </Col>
                <Col span={20}>
                  <Typography>130,000 online courses</Typography>
                  <Typography>Enjoy a variety of fresh topics</Typography>
                </Col>
              </Row>
            </Col>
            <Col span={7}>
              <Row>
                <Col span={5}>
                  <Icon type="smile" style={{ fontSize: '48px', textAlign: 'center' }} />
                </Col>
                <Col span={19}>
                  <Typography>130,000 online courses</Typography>
                  <Typography>Enjoy a variety of fresh topics</Typography>
                </Col>
              </Row>
            </Col>
          </Row>

          <Divider />

          <div className="categories" style={{ marginTop: '50px' }}>
            <Title level={3}>Top categories</Title>
            <List
              grid={{ gutter: 8, column: 4 }}
              dataSource={listHotCategory}
              renderItem={item => (
                <List.Item>
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