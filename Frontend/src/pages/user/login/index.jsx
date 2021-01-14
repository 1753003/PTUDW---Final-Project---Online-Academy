import { Alert, Checkbox, Icon, message } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { Component } from 'react';
import { Link } from 'umi';
import { connect } from 'dva';
import LoginComponents from './components/Login';
import styles from './style.less';


const { Tab, UserName, Password, Mobile, Captcha, Submit } = LoginComponents;

class Login extends Component {
  loginForm = undefined;

  state = {
    type: 'account',
    autoLogin: false,
  };

  changeAutoLogin = (e) => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };

  handleSubmit = (err, values) => {
    const { type,autoLogin } = this.state;

    if (!err) {
      // console.log('dispatch', values)
      const { dispatch } = this.props;
      
      console.log(this.props)
      try {
        const success = dispatch({
          type: 'login/login',
          payload: { ...values, type, autoLogin },
        });
        console.log('login s', success)
      } catch (error) {
        console.log('login e',error)
      }
    }
  };


  renderMessage = (content) => (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );

  render() {
    const { userLogin = {}, submitting } = this.props;
    const { status, type: loginType } = userLogin;
    const { type, autoLogin } = this.state;
    return (
      <div className={styles.main}>
        {userLogin.status === "lock"? <Alert style={{marginBottom:"10px"}} message="Your account was locked, 
        please contact with admin for more information." type="error" showIcon/>:""}
        {userLogin.status =="fail"?<Alert style={{marginBottom:"10px"}} message="Check your user name or password" type="error" showIcon/>:""}
        <LoginComponents
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
          onCreate={(form) => {
            this.loginForm = form;
          }}
        >
          <div
            key="account"
            tab={formatMessage({
              id: 'user-login.login.tab-login-credentials',
            })}
          >
            {status === 'error' &&
              loginType === 'account' &&
              !submitting &&
              this.renderMessage(
                formatMessage({
                  id: 'user-login.login.message-invalid-credentials',
                }),
              )}
            <UserName
              name="username"
              placeholder={`enter your username`}
              rules={[
                {
                  required: true,
                  message: formatMessage({
                    id: 'user-login.username.required',
                  }),
                },
              ]}
            />
            <Password
              name="password"
              placeholder={`enter your password`}
              rules={[
                {
                  required: true,
                  message: formatMessage({
                    id: 'user-login.password.required',
                  }),
                },
              ]}
              onPressEnter={(e) => {
                e.preventDefault();

                if (this.loginForm) {
                  this.loginForm.validateFields(this.handleSubmit);
                }
              }}
            />
          </div>
          <div>
            <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
              <FormattedMessage id="user-login.login.remember-me" />
            </Checkbox>
            <a
              style={{
                float: 'right',
              }}
              href="/user/resetPasswordRequest"
            >
              <FormattedMessage id="user-login.login.forgot-password" />
            </a>
          </div>
          <Submit loading={submitting}>
            <FormattedMessage id="user-login.login.login" />
          </Submit>
          <div className={styles.other}>
            <FormattedMessage id="user-login.login.sign-in-with" />
            <Icon type="google" className={styles.icon} theme="outlined" onClick={() => {
              message.info("This feature is developing, we will update it soon!");
            }}/>
            <Icon type="facebook" className={styles.icon} theme="outlined" onClick={() => {
              message.info("This feature is developing, we will update it soon!");
            }} />
            <Icon type="apple" className={styles.icon} theme="outlined" onClick={() => {
              message.info("This feature is developing, we will update it soon!");
            }}/>
            <Link className={styles.register} to="/user/register">
              <FormattedMessage id="user-login.login.signup" />
            </Link>
          </div>
        </LoginComponents>
      </div>
    );
  }
}

export default connect(({ login, loading }) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(Login);
