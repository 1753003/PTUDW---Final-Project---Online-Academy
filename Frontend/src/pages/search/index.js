/* eslint-disable react/no-access-state-in-setstate */
import React, {
  useEffect,
  useState
} from 'react';
import {
  Tag,
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

class Filter extends React.Component {
  state = {checkBox: [], checkedID: []}

  constructor(props) {
    super(props);
    for (let i = 0; i < this.props.length; i+=1) {
      this.state.checkBox[i] = false;
    }
  }

  getCheck = () => {

  }

  getData = () => {
    const {list = []} = this.props;
    return list;
  }

  setTopic = (id) => {
    const {checkedID} = this.state;
    const temp = this.state.checkBox;
    if (temp[id] === true)
      temp[id] = false;
    else
    {
      temp[id] = true;
    }

    this.getData().forEach(item => {
      if (item.topic.id === id) {
        item.children.forEach(i => {
          if (temp[i.id] !== temp[id]) {
            temp[i.id] = temp[id]
            if (temp[id] === true) {
              checkedID.push(i.id)
            }
            if (temp[id] === false) {
              for (let j = 0; j < checkedID.length; j+=1) {
                  if (checkedID[j] === i.id)
                    checkedID.splice(j,1);
              }
            }
          }
        })
      }
    })

    this.setState({
      checkBox: temp,
      checkedID
    })

    this.props.filterList(checkedID);
    
  }

  setChildren = (id, idTopic) => {
    const {checkBox, checkedID} = this.state;
    if (checkBox[id] === false) {
      checkBox[id] = true;
      checkedID.push(id);
    }
    else {
      checkBox[id] = false;
      for (let j = 0; j < checkedID.length; j+=1) {
        if (checkedID[j] === id)
          checkedID.splice(j,1);
    }
      if (checkBox[idTopic] === true)
        checkBox[idTopic] = false
    }
    this.setState({
      checkBox
    })
    this.props.filterList(checkedID);
  }

  handleOnclick=(e) =>{
    // e.preventDefault()
    // console.log('ee', e)

  }
  render() {
    return (
        <Menu
          className={styles.filter}
          style={{ maxWidth: 256}}
          mode="inline"
          theme="light"
        >
          {this.getData().map(item => {
            return (
              <SubMenu
              onTitleClick={(event)=>this.handleOnclick(event)}
              key={item.topic.id}
              title={
                <Checkbox  checked={this.state.checkBox[item.topic.id]} onChange={() => {this.setTopic(item.topic.id)}}>{item.topic.name}</Checkbox>
              }
              >
                {
                    item.children.map((i) =>
                        <Menu.Item key={i.id}><Checkbox checked={this.state.checkBox[i.id]}
                          onChange={(e) => {this.setChildren(i.id, item.topic.id)}} 
                        >{i.name}</Checkbox></Menu.Item>
                    )
                }
              </SubMenu>
            )
          })}
        </Menu>   
    )
  }
}
const SearchPage = ({
  loading,
  history,
  searchList,
  location,
  dispatch,
  category,
  listHot,
  listNew
}) => {
  const [searchKey, setSearchKey] = useState('');
  const [list, setList] = useState([]);
  useEffect(() => {
    setSearchKey(location.query.q)
    const payload = {
      value: location.query.q,
    }
    dispatch({
      type: 'course/search',
      payload
    })
    dispatch({
      type: 'course/getNew',
      payload
    })
    dispatch({
      type: 'course/getHot',
      payload
    })
  }, [location])

  useEffect(() => {
    console.log(location.pathname.split('/')[2])
  }, [])

  useEffect(() => {

    // listHot?.forEach(element => {
    //   console.log('listHot',element.courseID)
    // });

    // listNew?.forEach(element => {
    //   console.log('listNew',element.id)
    // });
    // searchList?.forEach(element => {
    //   console.log('listSearch',element.courseID)
      
    // });
    // if(listNew) console.log('listNew', Array.from(listNew, x => x.id))
    // if(listHot) console.log('listHot', Array.from(listHot, x => x.courseID))
    // if(searchList) console.log('listSearch', Array.from(searchList, x => Date.parse(x.createdDate)))
    // console.log('list',Date.now())
    setList(searchList);
  }, [searchList])

  const result = [];
  category.forEach(element => {
    const temp = {};
    if (element.idTopic == null) {
      temp.topic = element;
      temp.children = [];
      category.forEach(item => {
        if (item.idTopic === element.id) {
          temp.children.push(item);
        }
      });
      result.push(temp);
    }
  });

 

  return (
  <PageHeader className={styles.main}>
      <Typography.Title level={3}>{searchList?.length} results for '{searchKey}'</Typography.Title>
      <Alert
          description="Feel free to learn annything !"
          type="info"
          showIcon
      />
      <Popover content=
        {<Filter list={result} 
                length={category.length} 
                filterList={(value) => {
                  if (value.length === 0)
                    setList(searchList)
                  else {
                    const newList = [];
                    for (let i = 0; i < searchList.length; i+=1) {
                      value.forEach(item => {
                      if (searchList[i].categoryID === item)
                        newList.push(searchList[i])
                    })
                    setList(newList)
                  }
                }}}
        />} placement="bottomLeft" trigger="click">
        <Button className={styles.filterButton}>
            <Icon type={'menu-unfold'} />Filter
        </Button>
      </Popover>
      <Row type='inline-block' justify='space-around' align='top' gutter={[32,0]}>
        <Col span={6}><div className={styles.filterSide}>
          {<Filter list={result} 
              length={category.length}
              filterList={(value) => {
                if (value.length === 0)
                  setList(searchList)
                else {
                  const newList = [];
                  for (let i = 0; i < searchList.length; i+=1) {
                    value.forEach(item => {
                    if (searchList[i].categoryID === item)
                      newList.push(searchList[i])
                  })
                  setList(newList)
                }
              }              
          }}
          />}</div></Col>
        <Col xs={{span:24}} lg={{span:18}} md={{span:24}}>
        <List
            itemLayout="vertical"
            loading={loading}
            pagination={{
                pageSize: 10,
            }}
            dataSource={list}
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
                  <Row type='flex' gutter={[8, 8]}>
        <Col>
        {Date.now() - Date.parse(item.createdDate)<604800001*4&&<Tag color="green">New</Tag>}
        </Col><Col>
        {listHot&&Array.from(listHot, x => x.courseID).includes(item.courseID)&&<Tag color="volcano">Best Seller</Tag>}
        </Col>
      </Row>
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
  course, category
}) => ({
  listHot: course.listHot,
  listNew: course.listNew,
  list: course.list,
  searchList: course.searchList,
  loading: course.loading,
  category: category.list
}))(SearchPage);
