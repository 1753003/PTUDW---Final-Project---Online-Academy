import { Avatar, Icon, Menu, Spin, Dropdown } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';
import React from 'react';
import { connect } from 'dva';
import { router } from 'umi';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
const { SubMenu } = Menu;

const CategoryDropdown = (props) => {
    const result = [];
    props.list.forEach(element => {
        const temp = {};
        if (element.idTopic == null) {      
            temp.topic = element;
            temp.children = [];
            props.list.forEach(item => {
                if (item.idTopic === element.id) {
                    temp.children.push(item);
                }
            })
            result.push(temp);
        }
    })
    const menu = (
        <Menu>
            {
                result.map((item) => {
                    return (
                        <SubMenu 
                        key={item.topic.id}
                        title={
                            <span>{item.topic.name}</span>
                          }
                        onClick={() => router.replace(`/search?q=${item.name}`)}  
                          >
                            {item.children.map((i) => {
                                return (
                                    <Menu.Item 
                                        key={i.id}
                                        onClick={() => router.replace(`/search?q=${i.name}`)}
                                    >
                                        {i.name}
                                    </Menu.Item>
                                )
                            })}
                            
                        </SubMenu>
                    )
                })
            }
        </Menu>
    );

    return (
        <Dropdown overlay={menu}>
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()} style={{color: 'black'}}>
                <Icon type="appstore" />  Categories
            </a>
        </Dropdown>
    )


}

export default connect(({ user, category }) => ({
    currentUser: user.currentUser,
    list: category.list
}))(CategoryDropdown);
