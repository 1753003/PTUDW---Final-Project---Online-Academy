/* eslint-disable no-undef */
// eslint-disable-next-line max-classes-per-file
import React, { useEffect } from 'react';
import { Icon, Table, PageHeader, Button, Divider, Tabs, Input, Form, Alert, Drawer, message} from 'antd';
import { connect } from 'dva';

class DrawerForm extends React.Component {
  state = { visible: false, check: true, check2: true };
  
  componentDidMount() {
    // To disable submit button at the beginning.
    this.props.form.validateFields();
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setCheck(false);
        this.setCheck2(false)
        values.type = this.props.type;
        console.log('Received values of form: ', values);
        this.props.create(values);
        
      }
    });
  };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  setCheck = (bool) => {
    this.setState({check:bool})
  }

  setCheck2 = (bool) => {
    this.setState({check2:bool})
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    console.log(this.props.status);
    if (this.props.status === "Exist" ) {     
      message.error("Email exist!");
      this.props.setEmptyStatus();    
    } 
    else if (this.props.status === "UExist") {
      message.error("Username exist!");
      this.props.setEmptyStatus();

    }
    else if (this.props.status !== '' && this.props.status !== "UExist" && this.props.status !== "Exist"){
      message.success("Success");
      this.props.setEmptyStatus();
    }
    return (
      <div>
        <Button type="primary" onClick={this.showDrawer}>
          <Icon type="plus" /> New account
        </Button>
        <Drawer
          title="Create a new account"
          width={720}
          onClose={this.onClose}
          visible={this.state.visible}
          bodyStyle={{ paddingBottom: 80 }}
        >
          <Form layout="vertical" hideRequiredMark onSubmit={this.handleSubmit}>
            <Form.Item label="Username">
                {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Please enter user name' }],
                })(<Input placeholder="Please enter user name" />)}
            </Form.Item>      
            <Form.Item label="Email">
                {getFieldDecorator('email', {
                rules: [{ required: true, message: 'Please enter email' }],
                })(
                <Input
                    placeholder="Please enter email"
                />,
                )}
            </Form.Item>           
            <Form.Item label="Password">
                {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please enter email' }],
                })(
                <Input
                    placeholder="Please enter password"
                />,
                )}
            </Form.Item>           
            <Form.Item label="Type">
                {getFieldDecorator('type')(
                <Input
                    placeholder="Please enter type"
                />,
                )}
            </Form.Item>  
            <div
            style={{
              position: 'absolute',
              right: 0,
              bottom: 0,
              width: '100%',
              borderTop: '1px solid #e9e9e9',
              padding: '10px 16px',
              background: '#fff',
              textAlign: 'right',
            }}
          >
            <Form.Item >
              <Button type="primary"  htmlType="submit">
                Create
              </Button></Form.Item>
            <Button onClick={this.onClose} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            
          </div>   
           </Form>
          
        </Drawer>
      </div>
    );
  }
}

const User = ({list, user, dispatch}) => {
    useEffect(() => {
        dispatch({ type: 'account/getStudent'});     
    }, []);
    
    useEffect(() => {
        dispatch({ type: 'account/getLecturer'});
    }, []);

    useEffect(() => {
    }, [list])

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: 'Usermame',
            dataIndex: 'username'
        },
        {
            title: 'Name',
            dataIndex: 'name'
        },
        {
            title: 'Email',
            dataIndex: 'email'
        },
        {
            title: 'Remove',
            key: 'remove',
            render: (item) => (
                <Button onClick={() => {dispatch({type: 'account/deleteUser', payload: item.id})}}>
                    <Icon type = 'delete' />
                </Button>
            )
          },
    ]

    const { TabPane } = Tabs;
    const Wrapper = Form.create()(DrawerForm);
    return (
        <PageHeader>
            <h2>User page</h2>  
            <Divider />
            <Tabs defaultActiveKey="1">
                <TabPane tab="Students" key="1">
                    <Wrapper type = "student"
                             status = {user.status}
                             create = {(value) => {
                                dispatch({type:'user/create', payload: value})
                                dispatch({ type: 'account/getStudent'})}}
                             setEmptyStatus = {() => {
                                dispatch({type:'user/statusEmpty'})
                              }}/>
                    <Table dataSource={list.studentList} columns={columns}/>
                </TabPane>
                <TabPane tab="Lecturer" key="2">
                    <Table dataSource={list.lecturerList} columns={columns}/>
                    <Wrapper type = "lecturer"
                             status = {user.status}
                             create = {(value) => {
                                dispatch({type:'user/create', payload: value})
                                dispatch({ type: 'account/getLecturer'})}}
                             setEmptyStatus = {() => {
                                dispatch({type:'user/statusEmpty'})
                              }}/>
                </TabPane>
            </Tabs>
        </PageHeader>
    )
};


export default connect(({ account, user }) => ({
  list: account,
  user
}))(User);