/* eslint-disable no-undef */
// eslint-disable-next-line max-classes-per-file
import React, { useEffect } from 'react';
import { Icon, Table, PageHeader, Button, Divider, Dropdown, Menu, InputNumber, message, Row, Col} from 'antd';
import { connect } from 'dva';
import { DrawerForm } from '@/pages/admin/course/DrawerForm';

const { SubMenu } = Menu;
class CategoryFilter extends React.Component { 
    renderMenu = () => {
        const category = this.props.data.list;
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
        
        const menu = (
            <Menu>
              {result.map(item => {
                return (
                  <SubMenu
                    key={item.topic.id}
                    title={<span>{item.topic.name}</span>}
                    onTitleClick={() => router.replace(`/search?q=${item.topic.name}`)}
                  >
                    {item.children.map(i => {
                      return (
                        <Menu.Item key={i.id} onClick={() => {
                            this.props.filter(i.id)
                        }}>
                          {i.name}
                        </Menu.Item>
                      );
                    })}
                  </SubMenu>
                );
              })}
            </Menu>
          );
      return menu;
    }

    render() {
        return (
            <div id="components-dropdown-demo-dropdown-button">
            <Dropdown.Button overlay={this.renderMenu()} icon={<Icon type="book" />}>
                Category
            </Dropdown.Button>
        </div>
        );
    }
}

class Course extends React.Component {
    constructor (props) {
        super(props);
        this.props.dispatch({type: 'course/getFull'});
    }

    getDataSource = () => {
        const { list = [] } = this.props.course;
        return list;
    }

    getColumns = () => {
        const columns = [
            {
                title: 'ID',
                dataIndex: 'id',
            },
            {
                title: 'Name',
                dataIndex: 'name'
            },
            {
                title: 'Rate',
                dataIndex: 'rating'
            },
            {
                title: 'Brief Description',
                dataIndex: 'briefDescription'
            },
            {
                title: 'Category',
                dataIndex: 'categoryName',
                
            },
            {
                title: 'Disable',
                render: (item) => (
                    <Button disabled = {item.disabled === 0} 
                            onClick = {async () => {await this.props.dispatch({
                                type: 'course/disabledRequest',
                                payload: {
                                    id: item.id,
                                    data: {disabled: 0}
                                }
                            })
                            this.props.dispatch({type: 'course/getFull'})}}>
                        <Icon type="lock" />
                    </Button>
                )
            },
            {
                title: 'Enable',
                render: (item) => (
                    <Button disabled = {item.disabled === 1}
                    onClick = {async () => {await this.props.dispatch({
                        type: 'course/disabledRequest',
                        payload: {
                            id: item.id,
                            data: {disabled: 1}
                        }
                    })
                    this.props.dispatch({type: 'course/getFull'})}}>
                        <Icon type="unlock" />
                    </Button>
                )
            },
            {
                title: 'Details',
                render: (item) => (
                    <DrawerForm course={item}/>
                )
            },
            {
                title: 'Remove',
                key: 'remove',
                render: (item) => (
                    <Button onClick={() => {this.props.dispatch({type: 'course/delete', payload: item.id})}}>
                        <Icon type = 'delete' />
                    </Button>
                )
            }
        ]
        return columns;
    }
    

    filterData = async (id) => {
        await this.props.dispatch({type: 'course/getFull'})
        const list = this.getDataSource();
        this.props.dispatch({ type: 'course/filter', payload: list.filter(item => item.categoryID === id)})
    }

    resetData = () => {
        this.props.dispatch({type: 'course/getFull'})
    }

    render() {
        return (
            <PageHeader>
                <h2>Course page</h2>  
                <Divider />
                <Row>
                    <Col span={3}>
                        <CategoryFilter data = {this.props.category}
                        filter = {(id) => {
                            this.filterData(id)
                        }}/>
                    </Col>
                    <Col span={3}>
                        <Button onClick={() => {
                            this.resetData()
                        }}>
                            <Icon type="close"  />
                            Reset Filter
                        </Button>
                    </Col>
                    
                </Row>
               
                
                <Divider />
                <Table dataSource={this.getDataSource()} columns={this.getColumns()} />
            </PageHeader>
        )
    }
};


export default connect(({ course, category }) => ({
  course,
  category
}))(Course);