/* eslint-disable no-nested-ternary */
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
    values: {},
    isEnterCode: false,
  }

  componentDidUpdate(){
    if(this.state.first === true)
      {this.setState({first:false})
      this.props.form.validateFields();}
  }
  
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (this.getConfirmEmail()) {
          this.register(this.state.values);
          console.log(this.props);
        }
        else if (!this.getConfirmStatus()) {
          this.setValues(values);
          this.props.dispatch({
            type: 'user/confirmEmailRequest',
            payload: values.email
          })
        }
        else {
          this.props.dispatch({
            type: 'user/confirmCodeEmail',
            payload: values.code
          })
          this.setState({isEnterCode: true})
        }
      }
    });
  };

  setValues = (values) => {
    this.setState({values})
  } 

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  register = (values) => {
    this.props.dispatch({
      type: 'user/register',
      payload: values
    })
  }
  
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

  getConfirmStatus = () => {
    const {confirmStatus = false} = this.props;
    return confirmStatus;
  }

  getConfirmEmail = () => {
    const {confirmEmail = false } = this.props;
    return confirmEmail;
  }

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched, submitting } = this.props.form;
    const {status} = this.props;
    const usernameError = isFieldTouched('username') && getFieldError('username');
    const passwordError = isFieldTouched('password') && getFieldError('password');
    const emailError = isFieldTouched('email') && getFieldError('email');
    const rePasswordError = isFieldTouched('re-password') && getFieldError('re-password');
    const codeError = isFieldTouched('code') && getFieldError('code'); 
    let msg = ""
    let msg2 = ""
    console.log(status);
    if (status === "Exist" ) {
      msg = (  <Alert message="Register failed. Email already exists." type="error" showIcon/>)}
    if (this.getConfirmEmail() === false && this.state.isEnterCode === true)
      msg2 = (  <Alert message="Wrong code" type="error" showIcon/>)
    return (
      this.getConfirmEmail()
      ?
      (
        <div className={styles.main}>
          
          <Form onSubmit={this.handleSubmit} className="register-form">
          <Alert message="Confirm email successfull! Click below button to finish register progress." type="success" showIcon/>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Register
              </Button>          
            </Form.Item>   
          </Form>
        </div>
      )
      :
      (
        this.getConfirmStatus() 
      ?
      (
        <div className={styles.main} >
         
          <Form onSubmit={this.handleSubmit} className="register-form">
          {msg2}
          <Form.Item hasFeedback validateStatus={codeError ? 'error' : ''} help={codeError || ''}>
              {getFieldDecorator('code', {
                rules: [{ required: true, message: 'Please input the code!' },{validator:this.validateToNextPassword}],
              })(
                <Input
                  placeholder="Code"
                />,
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button" disabled={hasErrors(getFieldsError())||this.state.first}>
                Check code
              </Button>
              <Link style={{float:'right'}} to="/user/resetPasswordRequest">Wanna new code? Go back</Link>
            </Form.Item>
          </Form>
        </div>
      )
      :
      (
        <div className={styles.main}>
      <Form onSubmit={this.handleSubmit} className="register-form">
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
            Send code
          </Button>
          <Link style={{float:'right'}} to="/user/login">Already have an account ? Login now</Link>
        </Form.Item>
      
      </Form>
      </div>  
      )
      )
    );
  }
}

const Register = Form.create({name: 'register'})(RegisterForm);

export default connect(({loading, user})=>({
  submitting: loading.effects['user/register'],
  status: user.status,
  confirmStatus: user.confirmStatus,
  confirmEmail: user.confirmEmail
}))(Register);