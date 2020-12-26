import { Alert, Form, Icon, Input, Button} from 'antd';
import React, { Component } from 'react';
import { Link } from 'umi';
import { connect } from 'dva';
import styles from './index.less';
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
class ConfirmPasswordForm extends Component {
  constructor(props){
    super(props)
    this.state={
      first:true,
      confirmDirty: false,
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
        console.log('code',status.data)
        console.log('email',status.config.data.email)
        // this.props.dispatch({
        //   type: 'user/resetPassword',
        //   payload: {...values}
        // })
      } else {
        // console.log(err)
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
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    const { submitting, status} = this.props;
    const passwordError = isFieldTouched('password') && getFieldError('password');
    const rePasswordError = isFieldTouched('re-password') && getFieldError('re-password');
    const codeError = isFieldTouched('code') && getFieldError('code');
    let msg = ""
    if (status) msg = status?(  <Alert message="Success" type="success" />):(  <Alert message="Failed" type="error" />)
    return (
      <div className={styles.main} >
        
        <h4>Think twice before type your new password</h4>
      <Form onSubmit={this.handleSubmit.bind(this)} className="register-form">
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
        <Form.Item validateStatus={codeError ? 'error' : ''} help={codeError || ''}>
          {getFieldDecorator('code', {
            rules: [{ required: true, message: 'Please type your reset code' }],
          })(
            <Input
              prefix={<Icon type="heart" theme="filled" style={{ color: 'rgba(250,0,0,.25)' }} />}
              placeholder="Type your reset code here"
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
  }
}

const Confirm = Form.create()(ConfirmPasswordForm);
export default connect(({user})=>({
  status: user.status,
}))(Confirm);