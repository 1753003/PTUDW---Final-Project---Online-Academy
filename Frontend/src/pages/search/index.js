import React, {
  useEffect,
  useState
} from 'react';
import {
  Typography,
  Input,
  PageHeader,
  Alert,
  Menu,
  Icon,
  Checkbox,
  Row,
  Col,
  List,
  Rate,
  Layout,
  Button,
  Popover
} from 'antd';
import {
  connect
} from 'dva';

import styles from './index.less';

const {
  SubMenu
} = Menu;

const SearchPage = ({
  loading,
  history,
  searchList,
  location,
  dispatch
}) => {
  const [searchKey, setSearchKey] = useState('');
  useEffect(() => {
    setSearchKey(location.query.q)
    const payload = {
      value: location.query.q,
    }
    dispatch({
      type: 'course/search',
      payload
    })
  }, [location])

  useEffect(() => {
    console.log(location.pathname.split('/')[2])
  }, [])
  const topicList = [{
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
  const filterMenu = (
    <Menu
      className={styles.filter}
      style={{ maxWidth: 256}}
      mode="inline"
      theme="light"
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
  )

  return (
  <PageHeader className={styles.main}>
      <Typography.Title level={3}>{searchList?.length} results for '{searchKey}'</Typography.Title>
      <Alert
          description="Feel free to learn annything !"
          type="info"
          showIcon
      />
      <Popover content={filterMenu} placement="bottomLeft" trigger="click">
        <Button className={styles.filterButton}>
            <Icon type={'menu-unfold'} />Filter
        </Button>
      </Popover>
      <Row type='inline-block' justify='space-around' align='top' gutter={[32,0]}>
        <Col span={6}><div className={styles.filterSide}>{filterMenu}</div></Col>
        <Col xs={{span:24}} lg={{span:18}} md={{span:24}}>
        <List
            itemLayout="vertical"
            loading={loading}
            pagination={{
                pageSize: 10,
            }}
            dataSource={searchList}
            renderItem={item => (
                <List.Item
                    key={item.title} 
                    onClick={() => {
                      history.push({
                          pathname: `/detail`,
                          query: {
                              courseId: item.courseID,
                          },
                      });
                  }}
                >
                  <Row type='flex' justify='space-between'>
                  <Col>
                  <Row type='flex' justify='start' gutter={[8, 8]}>
                    <Col>
                    <img className={styles.cover}
                      alt="cover"
                      src={item.URL}
                    />
                    </Col>
                    <Col>
                    <List.Item.Meta
                    className={styles.content}
                    title={item.courseName}
                    description={<Typography.Paragraph style={{wordWrap: 'break-word'}} ellipsis={{ rows: 3, expandable: true }} >{item.briefDescription}</Typography.Paragraph>}
                  />
                    <Row type='flex' justify='start' align='bottom' style={{verticalAlign: 'baseline', fontWeight:'bolder', color:'peru'}}>
                      {item.rating}
                      <Rate className={styles.rate} disabled defaultValue={item.rating} style={{fontSize:'11pt'}}/>
                      <Typography.Text style={{fontWeight:'normal',fontStyle: 'italic', fontSize:'10pt'}}>({item.numRate})</Typography.Text></Row>
                    </Col>
                    
                  </Row>
                  </Col>
                  <Col>
                      <Typography.Title level={4} strong >${item.salePrice}</Typography.Title>
                      <Typography.Text delete style={{display:'inline-block'}}>${item.price}</Typography.Text>
                    </Col>
                    </Row>
                </List.Item>
          )}
      /></Col>
          </Row>

      </PageHeader>
  )
};


export default connect(({
  course
}) => ({
  list: course.list,
  searchList: course.searchList,
  loading: course.loading
}))(SearchPage);
