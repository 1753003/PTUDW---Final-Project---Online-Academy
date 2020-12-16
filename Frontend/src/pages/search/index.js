import React, { useEffect } from 'react';
import { Typography, Input, PageHeader, Alert, Menu, Icon, Checkbox } from 'antd';



import { connect } from 'dva';

const { Search } = Input;
const { SubMenu } = Menu;

const SearchPage = () => {
    const topicList = [
        {
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
    return (
        <PageHeader>
            <Typography.Title level={1}>2,587 results for hello</Typography.Title>
            <Alert
                description="Not sure? All courses have a 30-day money-back guarantee"
                type="info"
                showIcon
            />
            <Menu
                // onClick={this.handleClick}
                style={{ width: 256 }}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
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
        </PageHeader>
    )
};


export default connect(({ course }) => ({
    list: course
}))(SearchPage);