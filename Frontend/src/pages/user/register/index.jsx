import { Alert, Form, Icon, Input, Button} from 'antd';
import React from 'react';
import { Link } from 'umi';
import { connect } from 'dva';
import styles from './index.less';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
class RegisterForm extends React.Component {
  state={
    first:true,
    confirmDirty: false,
    fail: null,
  }
  componentDidUpdate(){
    if(this.state.first == true)
      {this.setState({first:false})
      this.props.form.validateFields();}
  }
  
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'user/register',
          payload: values
        })
      } else {
        // console.log(err)
        this.setState({fail: true})
      }
    });
  };
  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };
  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['re-password'], { force: true });
    }
    callback();
  };
  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };
  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched, submitting } = this.props.form;
    const {status} = this.props;
    const usernameError = isFieldTouched('username') && getFieldError('username');
    const passwordError = isFieldTouched('password') && getFieldError('password');
    const emailError = isFieldTouched('email') && getFieldError('email');
    const rePasswordError = isFieldTouched('re-password') && getFieldError('re-password');
    let msg = ""
    // console.log('status', status.data.signup)
    if (status !='' && status.data.signup ==='failed') msg = (  <Alert message="Register failed. Email already exists." type="error" showIcon/>)
    return (
      <div className={styles.main}>
      <Form onSubmit={this.handleSubmit.bind(this)} className="register-form">
        {msg}
        <Form.Item validateStatus={usernameError ? 'error' : ''} help={usernameError || ''}>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item validateStatus={emailError ? 'error' : ''} help={emailError || ''}>
          {getFieldDecorator('email', {
            rules: [{ type:'email', required: true, message: 'Please input a valid email!' }],
          })(
            <Input
              prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Email"
            />,
          )}
        </Form.Item>
        <Form.Item hasFeedback validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' },{validator:this.validateToNextPassword}],
          })(
            <Input.Password
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item hasFeedback validateStatus={rePasswordError ? 'error' : ''} help={rePasswordError || ''}>
          {getFieldDecorator('re-password', {
            rules: [{ required: true, message: 'Please confirm your Password!' },{validator:this.compareToFirstPassword}],
          })(
            <Input.Password onBlur={this.handleConfirmBlur}
              prefix={<Icon type="lock" style={{ color: 'rgba(240,0,10,.25)' }} />}
              type="password"
              placeholder="Re-enter your Password"
            />,
          )}
        </Form.Item>
        <Form.Item loading={submitting}>
          <Button type="primary" htmlType="submit" className="login-form-button" disabled={hasErrors(getFieldsError())||this.state.first}>
            Sign Up
          </Button>
          <Link style={{float:'right'}} to="/user/login">Already have an account ? Login now</Link>
        </Form.Item>
      </Form>
      </div>
    );
  }
}

const Register = Form.create({name: 'register'})(RegisterForm);

export default connect(({loading, user})=>({
  submitting: loading.effects['user/register'],
  status: user.status,
}))(Register);