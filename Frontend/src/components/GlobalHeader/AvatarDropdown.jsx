import { Avatar, Icon, Menu, Spin } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';
import React from 'react';
import { connect } from 'dva';
import { router } from 'umi';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

class AvatarDropdown extends React.Component {
  onMenuClick = (event) => {
    const { key } = event;

    if (key === 'logout') {
      const { dispatch } = this.props;

      if (dispatch) {
        dispatch({
          type: 'login/logout',
        });
      }

      return;
    }

    if (key === 'login') {
      // const { dispatch } = this.props;

      // if (dispatch) {
      //   dispatch({
      //     type: 'login/login',
      //   });
      // }
      router.replace('/user/login');
      return;
    }
    if (key === 'signup') {
      // const { dispatch } = this.props;

      // if (dispatch) {
      //   dispatch({
      //     type: 'login/signup',
      //   });
      // }
      router.replace('/user/register');
      return;
    }
    // router.push(`/account/${key}`);
  };

  render() {
    const {
      currentUser = {
        avatar: '',
        name: '',
      },
      menu,
    } = this.props;
    const menuHeaderDropdown = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        {menu && (
          <Menu.Item key="center">
            <Icon type="user" />
            <FormattedMessage id="menu.account.center" defaultMessage="account center" />
          </Menu.Item>
        )}
        {menu && (
          <Menu.Item key="settings">
            <Icon type="setting" />
            <FormattedMessage id="menu.account.settings" defaultMessage="account settings" />
          </Menu.Item>
        )}
        {menu && <Menu.Divider />}
        <Menu.Item key="logout">
          <Icon type="logout" />
          <FormattedMessage id="menu.account.logout" defaultMessage="Logout" />
        </Menu.Item>
      </Menu>
    );
    const menuGuest = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        <Menu.Item key="login">
          <Icon type="user" />
          <FormattedMessage id="menu.account.login" defaultMessage="Login" />
        </Menu.Item>
        <Menu.Item key="signup">
          <Icon type="user" />
          <FormattedMessage id="menu.account.signup" defaultMessage="Sign Up" />
        </Menu.Item>
      </Menu>
    )
    return currentUser && currentUser.name ? (
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className={`${styles.action} ${styles.account}`}>
          <Avatar size="small" className={styles.avatar} src={currentUser.avatar} alt="avatar" />
          <span className={styles.name}>{currentUser.name}</span>
        </span>
      </HeaderDropdown>
    ) : (
      // <Spin
      //   size="small"
      //   style={{
      //     marginLeft: 8,
      //     marginRight: 8,
      //   }}
      // />
      <HeaderDropdown overlay={menuGuest} >
        <span className={`${styles.action} ${styles.account}`}>
          <Icon type="smile" />
        </span>
      </HeaderDropdown>
    );
  }
}

export default connect(({ user }) => ({
  currentUser: user.currentUser,
}))(AvatarDropdown);
