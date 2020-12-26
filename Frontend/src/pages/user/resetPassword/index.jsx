import { Form, Icon, Input, Button} from 'antd';
import React, { Component } from 'react';
import { Link } from 'umi';
import { connect } from 'dva';
import styles from './index.less';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
class ResetPasswordForm extends Component {
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
        this.props.dispatch({
          type: 'user/resetPassword',
          payload: {...values}
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
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    const { submitting, status} = this.props;
    console.log('s',this.props)
    const emailError = isFieldTouched('email') && getFieldError('email');
    return (status ? <p>succcess</p>:
      <div className={styles.main} >
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
        <Form.Item loading={submitting} status={status}>
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

const Reset = Form.create()(ResetPasswordForm);
export default connect(({user})=>({
  status: user.status,
}))(Reset);