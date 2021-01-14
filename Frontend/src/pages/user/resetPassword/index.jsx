import { Alert, Form, Icon, Input, Button} from 'antd';
import React, { Component } from 'react';
import { Link } from 'umi';
import { connect } from 'dva';
import styles from './index.less';
import router from 'umi'
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
class ResetPasswordForm extends Component {
  constructor(props){
    super(props)
    this.state={
      first:true,
      confirmDirty: false,
      fail: null,
    }
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
        this.props.dispatch({
          type: 'user/forgotPasswordRequest',
          payload: {...values}
        })
        localStorage.setItem("Email",values.email);
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

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    const { submitting, status} = this.props;
    const emailError = isFieldTouched('email') && getFieldError('email');
    let msg = ""

    if (status!='' && this.state.fail!=null) msg = status!='' && !this.state.fail?(  <Alert message="Email has been sent." type="success" showIcon/>):(  <Alert message="Email sent failed" type="error" showIcon/>)
    return (
      <div className={styles.main} >
        
      <Form onSubmit={this.handleSubmit.bind(this)} className="register-form">
      {msg}
        <h4>Type your email and we will send you a mail with confirm code</h4>
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
        <Form.Item loading={submitting} status={status}>
          <Button type="primary" htmlType="submit" className="login-form-button" disabled={hasErrors(getFieldsError())||this.state.first}>
            Confirm
          </Button>
          <Link style={{float:'right'}} to="/user/login">Change your mind? Login now</Link>
        </Form.Item>
        {status&&
        <Link to='/user/confirmNewPassword'>
          <Button type="primary" block>
            Next
            <Icon type="right" />
          </Button></Link>
        }
      </Form>
      </div>
    
    )
  }
}

const Reset = Form.create()(ResetPasswordForm);
export default connect(({user})=>({
  status: user.status,
}))(Reset);