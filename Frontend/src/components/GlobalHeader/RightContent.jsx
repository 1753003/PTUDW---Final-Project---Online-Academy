import { Icon, Tooltip, Tag, Dropdown, Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
import { router } from 'umi';
import Avatar from './AvatarDropdown';
import CategoryDropdown from './CategoryDropdown';
import HeaderSearch from '../HeaderSearch';
import SelectLang from '../SelectLang';
import styles from './index.less';

const ENVTagColor = {
  dev: 'orange',
  test: 'green',
  pre: '#87d068',
};

const GlobalHeaderRight = (props) => {
  const { theme, layout, dispatch, list } = props;
  let className = styles.right;

  if (theme === 'dark' && layout === 'topmenu') {
    className = `${styles.right}  ${styles.dark}`;
  }

  return (
    <div className={className}>
      <HeaderSearch
        className={`${styles.action} ${styles.search}`}
        placeholder="Type here ..."
        dataSource={[
          "Design", "IT", "Business"
        ]}
        onSearch={(value) => {
          const pathname = window.location.pathname.split('/');
          if (pathname[1] === 'search' && pathname.length === 3) {
            router.replace(`/search/${pathname[2]}?q=${value}`)
          }
          else {
            router.replace(`/search?q=${value}`);
          }
        }}
        onPressEnter={() => {

        }}

      />

      {
        list.length > 0 &&
        <CategoryDropdown />
      }

      {/* <Tooltip
        title={formatMessage({
          id: 'component.globalHeader.help',
        })}
      >
        <a
          target="_blank"
          href="https://pro.ant.design/docs/getting-started"
          rel="noopener noreferrer"
          className={styles.action}
        >
          <Icon type="question-circle-o" />
        </a>
      </Tooltip> */}
      <Avatar />
      {REACT_APP_ENV && <Tag color={ENVTagColor[REACT_APP_ENV]}>{REACT_APP_ENV}</Tag>}
      {/*><SelectLang className={styles.action} /> */}
    </div>
  );
};

export default connect(({ settings, category }) => ({
  theme: settings.navTheme,
  layout: settings.layout,
  list: category.list
}))(GlobalHeaderRight);
