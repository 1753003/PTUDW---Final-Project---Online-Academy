/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import ProLayout, { DefaultFooter } from '@ant-design/pro-layout';
import React, { useEffect } from 'react';
import { Link, router} from 'umi';
import { connect } from 'dva';
import { Icon, Result, Button } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
import Authorized from '@/utils/Authorized';
import RightContent from '@/components/GlobalHeader/RightContent';
import { isAntDesignPro, getAuthorityFromRouter } from '@/utils/utils';
import logo from '../assets/logo.svg';
import Cookies from 'js-cookie';

const noMatch = (
  <Result
    status={403}
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={
      <Button type="primary">
        <Link to="/user/login">Go Login</Link>
      </Button>
    }
  />
);

/**
 * use Authorized check all menu item
 */
const menuDataRender = (menuList) =>
  menuList.map((item) => {
    const localItem = { ...item, children: item.children ? menuDataRender(item.children) : [] };
    return Authorized.check(item.authority, localItem, null);
  });

const defaultFooterDom = (
  <DefaultFooter
    copyright="2020 Die Sieben Todsunden"
    links={[
      {
        key: 'Die Sieben Todsunden',
        title: 'Die Sieben Todsunden',
        href: 'https://github.com/orgs/die-sieben-Todsunden/teams/7',
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
);

const footerRender = () => {
  if (!isAntDesignPro()) {
    return defaultFooterDom;
  }

  return (
    <>
      {defaultFooterDom}
      <div
        style={{
          padding: '0px 24px 24px',
          textAlign: 'center',
        }}
      >
        <a href="https://www.netlify.com" target="_blank" rel="noopener noreferrer">
          <img
            src="https://www.netlify.com/img/global/badges/netlify-color-bg.svg"
            width="82px"
            alt="netlify logo"
          />
        </a>
      </div>
    </>
  );
};

const BasicLayout = (props) => {
  const {
    dispatch,
    children,
    settings,
    location = {
      pathname: '/',
    },
  } = props;
  /**
   * constructor
   */

  useEffect(() => {
    // let accessToken=Cookies.get('aToken')
    let refreshToken=Cookies.get('rfToken')
    let isLogin = localStorage.getItem("isLogin")
    isLogin = isLogin === null ? 'false' : isLogin

    if(isLogin.includes("true")){
      if(typeof(refreshToken)=='undefined')
      dispatch({
        type: 'login/logoutHome',
      });
    }
    try {
      var auth = JSON.parse(localStorage.getItem('antd-pro-authority'))
    } catch (error) {
      auth = auth?auth:'guest'
      // localStorage.setItem('antd-pro-authority', JSON.stringify('guest'))
    }
    auth = auth?auth:'guest'
    const userData = JSON.parse(localStorage.getItem("userData"))
    console.log(userData)
    // console.log(auth[0])
    if (dispatch&&(auth[0]!='guest'||auth !='guest')&&userData!==null) {
      dispatch({
        type: 'user/fetchCurrent',
        payload: userData
      });
    }
  }, []);
  /**
   * init variables
   */

  const handleMenuCollapse = (payload) => {
    if (dispatch) {
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload,
      });
    }
  }; // get children authority

  const authorized = getAuthorityFromRouter(props.route.routes, location.pathname || '/') || {
    authority: 'guest',
  };
  // console.log("BasicLayout---");
  // console.log(authorized.authority);
  
  return (
    <ProLayout
      logo={logo}
      menuHeaderRender={(logoDom, titleDom) => (
        <Link to={localStorage.getItem('antd-pro-authority').includes('admin')?"/admin":localStorage.getItem('antd-pro-authority').includes('lecturer')?"/lecturer":"/"}>
          {logoDom}
          {titleDom}
        </Link>
      )}
      onCollapse={handleMenuCollapse}
      menuItemRender={(menuItemProps, defaultDom) => {
        if (menuItemProps.isUrl || menuItemProps.children || !menuItemProps.path) {
          return defaultDom;
        }

        return <Link to={menuItemProps.path}>{defaultDom}</Link>;
      }}
      breadcrumbRender={(routers = []) => [
        {
          path: '/',
          breadcrumbName: formatMessage({
            id: 'menu.home',
            defaultMessage: 'Home',
          }),
        },
        ...routers,
      ]}
      itemRender={(route, params, routes, paths) => {
        const first = routes.indexOf(route) === 0;
        return first ? (
          <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
        ) : (
          <span>{route.breadcrumbName}</span>
        );
      }}
      footerRender={footerRender}
      menuDataRender={menuDataRender}
      formatMessage={formatMessage}
      rightContentRender={() => <RightContent />}
      {...props}
      {...settings}
    >
      <Authorized authority={authorized.authority} noMatch={noMatch}>
        {children}
      </Authorized>
    </ProLayout>
  );
};
 
export default connect(({ global, settings }) => ({
  collapsed: global.collapsed,
  settings,
}))(BasicLayout);
