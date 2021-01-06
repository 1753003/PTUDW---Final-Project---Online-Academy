import React, { useEffect } from 'react';
import { Typography, Carousel, Row, Col, List, Tabs, Divider, Icon, Card, PageHeader } from 'antd';

import Course from '@/components/Course';
import { connect } from 'dva';

const { Title } = Typography;
const { TabPane } = Tabs;

const Home = ({ list, dispatch, listHot, listNew, history }) => {
  useEffect(() => {
    dispatch({ type: 'course/get' });
    dispatch({ type: 'course/getHot' });
    dispatch({ type: 'course/getNew' });
  }, []);

  const courseData = [
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
    }
  ]

  const categories = [
    {
      'id': 1,
      'title': 'Design',
      'url': "https://s.udemycdn.com/home/top-categories/lohp-category-business.jpg"
    },
    {
      'id': 2,
      'title': 'Marketing',
      'url': "https://s.udemycdn.com/home/top-categories/lohp-category-business.jpg"
    },
    {
      'id': 3,
      'title': 'Design',
      'url': "https://s.udemycdn.com/home/top-categories/lohp-category-business.jpg"
    },
    {
      'id': 4,
      'title': 'IT Software',
      'url': "https://s.udemycdn.com/home/top-categories/lohp-category-business.jpg"
    },
    {
      'id': 5,
      'title': 'Personal Development',
      'url': "https://s.udemycdn.com/home/top-categories/lohp-category-business.jpg"
    },
    {
      'id': 6,
      'title': 'Bussiness',
      'url': "https://s.udemycdn.com/home/top-categories/lohp-category-business.jpg"
    },
    {
      'id': 7,
      'title': 'Photography',
      'url': "https://s.udemycdn.com/home/top-categories/lohp-category-business.jpg"
    },
    {
      'id': 8,
      'title': 'Music',
      'url': "https://s.udemycdn.com/home/top-categories/lohp-category-business.jpg"
    }
  ]

  return (
    <Row>
      <Col span={3} />
      <Col span={18}>
        <PageHeader>
          <Carousel autoplay>
            {
              listHot?.map((item) =>
                <img src={item.URL} height='400px' alt='hinh' onClick={() => {
                  history.push({
                    pathname: `/detail`,
                    query: {
                      courseId: item.courseID,
                    },
                  });
                }} />
              )}
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
          <div className="great-courses" style={{ marginTop: '50px' }}>
            <Title level={3}>The world largest selection of courses</Title>
            <Typography style={{ marginBottom: '20px' }}>Choose from 130,000 online video courses with new additions published every month</Typography>
            <Tabs defaultActiveKey="1">
              <TabPane tab="Python" key="1">
                <Carousel autoplay>
                  <Row gutter={16}>
                    {
                      courseData.map((item) =>
                        <Col span={6}>
                          <Course url={item.url} title={item.title} author={item.author} price={item.price} />
                        </Col>
                      )
                    }
                  </Row>
                  <Row gutter={16}>
                    {
                      courseData.map((item) =>
                        <Col span={6}>
                          <Course url={item.url} title={item.title} author={item.author} price={item.price} />
                        </Col>
                      )
                    }
                  </Row>
                  <Row gutter={16}>
                    {
                      courseData.map((item) =>
                        <Col span={6}>
                          <Course url={item.url} title={item.title} author={item.author} price={item.price} />
                        </Col>
                      )
                    }
                  </Row>
                </Carousel>
              </TabPane>
              <TabPane tab="Excel" key="2">
                <Carousel autoplay>
                  <Row gutter={16}>
                    {
                      courseData.map((item) =>
                        <Col span={6}>
                          <Course url={item.url} title={item.title} author={item.author} price={item.price} />
                        </Col>
                      )
                    }
                  </Row>
                  <Row gutter={16}>
                    {
                      courseData.map((item) =>
                        <Col span={6}>
                          <Course url={item.url} title={item.title} author={item.author} price={item.price} />
                        </Col>
                      )
                    }
                  </Row>
                  <Row gutter={16}>
                    {
                      courseData.map((item) =>
                        <Col span={6}>
                          <Course url={item.url} title={item.title} author={item.author} price={item.price} />
                        </Col>
                      )
                    }
                  </Row>
                </Carousel>
              </TabPane>
              <TabPane tab="Web Development" key="3">
                <Carousel autoplay>
                  <Row gutter={16}>
                    {
                      courseData.map((item) =>
                        <Col span={6}>
                          <Course url={item.url} title={item.title} author={item.author} price={item.price} />
                        </Col>
                      )
                    }
                  </Row>
                  <Row gutter={16}>
                    {
                      courseData.map((item) =>
                        <Col span={6}>
                          <Course url={item.url} title={item.title} author={item.author} price={item.price} />
                        </Col>
                      )
                    }
                  </Row>
                  <Row gutter={16}>
                    {
                      courseData.map((item) =>
                        <Col span={6}>
                          <Course url={item.url} title={item.title} author={item.author} price={item.price} />
                        </Col>
                      )
                    }
                  </Row>
                </Carousel>
              </TabPane>
            </Tabs>
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
          <div className="great-courses" style={{ marginTop: '50px'}}>
            <Title level={3}>Top bán chạy</Title>
            <List
              grid={{ gutter: 16, column: 4 }}
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
                  <Course url={item.URL} title={item.name} author={item.author} price={item.price} />
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
              dataSource={categories}
              renderItem={item => (
                <List.Item>
                  <Card
                    hoverable
                    cover={<img alt="example" src={item.url} />}
                  >
                    <Card.Meta title={item.title} />
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


export default connect(({ course }) => ({
  list: course,
  listHot: course.listHot,
  listNew: course.listNew
}))(Home);