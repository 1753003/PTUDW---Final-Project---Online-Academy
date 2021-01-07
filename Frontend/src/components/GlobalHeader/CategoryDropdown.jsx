import { Avatar, Icon, Menu, Spin, Dropdown } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';
import React from 'react';
import { connect } from 'dva';
import { router } from 'umi';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

const CategoryDropdown = (props) => {

    const menu = (
        <Menu>
            {
                props.list.map((item) => {
                    return (
                        <Menu.Item key={item.id} onClick={() => router.replace(`/search?q=${item.name}`)}>
                            {item.name}
                        </Menu.Item>
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
