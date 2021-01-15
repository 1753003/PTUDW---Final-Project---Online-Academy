/* eslint-disable no-nested-ternary */
import { message , Form, Icon, Input, Button} from 'antd';
import React, { Component } from 'react';
import { Link } from 'umi';
import { connect } from 'dva';
import styles from './index.less';
import { Redirect } from 'umi'
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
class ConfirmPasswordForm extends Component {
  constructor(props){
    super(props)
    this.state={
      first:true,
      confirmDirty: false,
      change: false
    }
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
        if (this.getConfirmStatus() === false) {
          this.props.dispatch({type: 'user/confirmCodeWithEmail', 
          payload: [values.code, localStorage.getItem("Email")]})
        }
        
        if (this.getConfirmStatus() === true) {
          this.props.dispatch({
            type: 'user/changePasswordWithEmail',
            payload: [localStorage.getItem("Email"), values.password]
          })
          this.props.dispatch({
            type: 'user/confirmStatusFalse'
          });
          message.success("Changed Password")
          this.setState({change: true})
        }
      }
    });
  };

  getConfirmStatus = () => {
    const {confirmStatus = false} = this.props;
    return confirmStatus;
  }

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
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
   
    const passwordError = isFieldTouched('password') && getFieldError('password');
    const rePasswordError = isFieldTouched('re-password') && getFieldError('re-password');
    const codeError = isFieldTouched('code') && getFieldError('code'); 
    return (
      this.state.change ? 
      (
        <Redirect to="/user/login" />
      )
      :
      (
        this.getConfirmStatus() ?
        (
          <div className={styles.main} >
          
          
          <Form onSubmit={this.handleSubmit} className="register-form">
          <h4 >Please think twice before type your new password<Icon style={{paddingLeft:'10px'}} type="smile" theme="outlined" /></h4>
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
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button" disabled={hasErrors(getFieldsError())||this.state.first}>
                Confirm
              </Button>
              <Link style={{float:'right'}} to="/user/resetPasswordRequest">Wanna new code? Go back</Link>
            </Form.Item>
          </Form>
        </div>   
        )
        :
        (
          <div className={styles.main} >
          <Form onSubmit={this.handleSubmit} className="register-form">
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
                Confirm
              </Button>
              <Link style={{float:'right'}} to="/user/resetPasswordRequest">Wanna new code? Go back</Link>
            </Form.Item>
          </Form>
        </div>

        )
      )
    )
  }
}

const Confirm = Form.create()(ConfirmPasswordForm);
export default connect(({user})=>({
  status: user.status,
  confirmStatus: user.confirmStatus
}))(Confirm);