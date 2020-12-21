import { Form, Icon, Input, Button} from 'antd';
import React from 'react';
import { Link } from 'umi';
import { connect } from 'dva';
import styles from './index.less';

class RegisterForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSignUp(values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.main}>
      <Form onSubmit={this.handleSubmit} className="register-form">
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your email!' }],
          })(
            <Input
              prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Email"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('re-password', {
            rules: [{ required: true, message: 'Please confirm your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(240,0,10,.25)' }} />}
              type="password"
              placeholder="Re-enter your Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Sign Up
          </Button>
          <a href="/user/login">Already have an account ? Login now</a>
        </Form.Item>
      </Form>
      </div>
    );
  }
}

const WrappedRegisterForm = Form.create({name: 'register'})(RegisterForm);

const Register = ({dispatch}) => {
  return (
    <WrappedRegisterForm onSignUp = {(value) => dispatch({
      type: 'user/register',
      payload: value,
    })}/>
  );
}

export default connect()(Register);