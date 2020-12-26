import { Form, Icon, Input, Button} from 'antd';
import React from 'react';
import { Link } from 'umi';
import { connect } from 'dva';
import styles from './index.less';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
class ResetPasswordForm extends React.Component {
  state={
    first:true,
    confirmDirty: false,
    requestDone : false
  }
  
  componentDidUpdate(){
    
    // console.log(requestDone)
    if(this.state.first == true)
      {this.setState({first:false})
      this.props.form.validateFields();}
  }
  
  handleSubmit = e => {
    e.preventDefault(); 
    const {status } = this.props.form;
    if(typeof(status)=='undefined') this.setState({requestDone : false});
    else this.setState({requestDone : status})
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'user/resetPassword',
          payload: values
        })
      } else {
        // console.log(err)
      }
    });
  };
  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  render() {

    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched, submitting, status } = this.props.form;
    
    const emailError = isFieldTouched('email') && getFieldError('email');
    return (this.state.requestDone? <p>succcess</p>:
      <div className={styles.main}>
        <p>Type your email and wwwe will send you skjdhfl</p>
      <Form onSubmit={this.handleSubmit.bind(this)} className="register-form">
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
        <Form.Item loading={submitting}>
          <Button type="primary" htmlType="submit" className="login-form-button" disabled={hasErrors(getFieldsError())||this.state.first}>
            Confirm
          </Button>
          <Link style={{float:'right'}} to="/user/login">Don't wanna change your password anymore ? Login now</Link>
        </Form.Item>
      </Form>
      </div>
    
    )
  }
}

const Reset = Form.create({name: 'resetPassword'})(ResetPasswordForm);

export default connect(({loading, status})=>({
  submitting: loading.effects['user/resetPassword'],
  status: status,
}))(Reset);