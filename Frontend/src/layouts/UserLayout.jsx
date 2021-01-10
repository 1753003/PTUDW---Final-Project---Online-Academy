import { DefaultFooter, getMenuData, getPageTitle } from '@ant-design/pro-layout';
import { Helmet } from 'react-helmet';
import { Link, Redirect } from 'umi';
import React from 'react';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
import SelectLang from '@/components/SelectLang';
import logo from '../assets/logo.svg';
import styles from './UserLayout.less';
import {Icon} from 'antd'
import router from 'umi/router'
const UserLayout = (props) => {
  const {
    route = {
      routes: [],
    },
  } = props;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: '',
    },
  } = props;
  const { breadcrumb } = getMenuData(routes);
  const title = getPageTitle({
    pathname: location.pathname,
    breadcrumb,
    formatMessage,
    ...props,
  });
  if(localStorage.getItem('isLogin')){
    if(localStorage.getItem('isLogin').includes('true')){
  if (localStorage.getItem('antd-pro-authority').includes('admin'))
    return <Redirect to='/admin'/>
  // if (!localStorage.getItem('antd-pro-authority').includes('guest'))
  //   return <Redirect to='/'/>
  }}
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>

      <div className={styles.container}>
        <div className={styles.lang}>
          {/* <SelectLang /> */}
        </div>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img alt="logo" className={styles.logo} src={logo} />
                <span className={styles.title}>Pondemy</span>
              </Link>
            </div>
            <div className={styles.desc}>Let's learn with Ponn</div>
          </div>
          {children}
        </div>
        <DefaultFooter
    copyright="2019 Die Sieben Todsunden"
    links={[
      {
        key: 'Die Sieben Todsunden',
        title: 'Die Sieben Todsunden',
        href: 'https://pro.ant.design',
        blankTarget: true,
      },
      {
        key: 'github',
        title: <Icon type="github" />,
        href: 'https://github.com/1753003/PTUDW---Final-Project---Online-Academy',
        blankTarget: true,
      }
    ]}
  />
      </div>
    </>
  );
};

export default connect(({ settings, user }) => ({ ...settings, currentUser: user.currentUser }))(UserLayout);
