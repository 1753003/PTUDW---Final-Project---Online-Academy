/* eslint-disable max-classes-per-file */
import React, { useEffect, useState } from 'react';
import { Typography, Input, Menu, Row, Col, List, Avatar, Card, Button, Progress, message, Modal,
     Popconfirm, Form, PageHeader } from 'antd';
import { connect } from 'dva';
import { router } from 'umi';

class EmailInfo extends React.Component {
    state = { visible: false };
  
    showModal = () => {
        this.setState({
          visible: true,
        });
        this.props.sendCode()
      };
  
    handleOk = e => {
        console.log(e);
        this.setState({
        visible: false,
        });
    };
    
    handleCancel = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
    };

    handleSubmit = e => {
        e.preventDefault();
            this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values)
                if (!this.getComponent())
                    this.props.confirmCode(values.code);
                else
                {
                    this.props.changeEmail(values);
                    this.handleCancel();
                    this.props.setConfirmFalse();
                }
            }
        });
    };

    getEmail = () => {
        const {email = ""} = this.props.currentUser;
        return email;
    }

    getStatus = () => {
        const {status = ""} = this.props;
        return status;
    }

    getComponent = () => {
        const {confirmStatus = false} = this.props;
        console.log(confirmStatus);
        return confirmStatus;
    }

    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched, setFieldsValue } = this.props.form;
        const codeError = isFieldTouched('code') && getFieldError('code');
        const emailError = isFieldTouched('email') && getFieldError('email');
        return (
            <Row>
                <Row>
                    <Col span={16}>                  
                        <Input
                            disabled="true"
                            value={this.props.currentUser.email}
                        />          
                    </Col>
                    <Col span={2}/>
                    <Col span={6}>                                            
                        <Button type="primary"
                                onClick={this.showModal}
                        >Edit</Button>                             
                    </Col>
                </Row>    
                {!this.getComponent()
                ?
                (<Modal
                    title={`${this.getStatus()  } Request`}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                    ]}
                    >
                    <Form onSubmit={this.handleSubmit}>
                    <h3>We have sent an email to you, please check it and enter the code in form below:</h3>
                        <Form.Item 
                                validateStatus={codeError ? 'error' : ''} help={codeError || ''}>
                                {getFieldDecorator('code', {
                                    rules: [{ required: true, message: 'Please input reset code!' }],
                                    initialValue: 'CODE'
                                    },
                                    )(
                                        <Input/>
                                )}
                        </Form.Item>
                        <Form.Item>
                            <Button
                                disabled={hasErrors(getFieldsError())}
                                htmlType="submit"
                                style={{ marginRight: 8 }}>
                                Confirm
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>                          
                )
                :
                (
                <Modal
                    title="Success Confirm"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                    ]}
                    >
                    <Form onSubmit={this.handleSubmit}>
                    <h3>Input your new email</h3>
                        <Form.Item 
                                validateStatus={emailError ? 'error' : ''} help={emailError || ''}>
                                {getFieldDecorator('email', {
                                    rules: [{ required: true, message: 'Please input your email!' }],
                                    initialValue: this.props.currentUser.email
                                    },
                                    )(
                                        <Input/>
                                )}
                        </Form.Item>
                        <Form.Item>
                            <Button
                                disabled={hasErrors(getFieldsError())}
                                htmlType="submit"
                                style={{ marginRight: 8 }}>
                                Confirm
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal> 
                )}
            </Row>
        )
    }
}

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class NameInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEdit : false,
        }
    }

    componentDidMount() {
        // To disable submit button at the beginning.
        this.props.form.validateFields();
      }
    
    handleSubmit = e => {
        e.preventDefault();
            this.props.form.validateFields((err, values) => {
            if (!err) {
                this.save()
                this.props.editName(values);
            }
        });
    };

    getName = () => {
        const {name = ""} = this.props.currentUser;
        return name;
    }

    edit = () => {
        this.setState({
            isEdit: true
        })
    }

    save = () => {
        this.setState({
            isEdit: false
        })
    }

    cancel = () => {
        this.setState({
            isEdit: false
        })
    }

    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched, setFieldsValue } = this.props.form;
        const nameError = isFieldTouched('name') && getFieldError('name');
        return (
            <Form onSubmit={this.handleSubmit}>
                <Row>
                    <Col span={16}>
                        <Form.Item 
                            validateStatus={nameError ? 'error' : ''} help={nameError || ''}>
                            {getFieldDecorator('name', {
                                initialValue: this.getName(),
                                rules: [{ required: true, message: 'Please input your username!' }],
                                },
                                )(
                                    <Input
                                        disabled={!this.state.isEdit}
                                    />
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={2}/>
                    <Col span={6}>
                        {this.state.isEdit ? 
                            (
                                <Form.Item>
                                    <span>  
                                        <Button
                                                disabled={hasErrors(getFieldsError())}
                                                htmlType="submit"
                                                style={{ marginRight: 8 }}>
                                                Save
                                        </Button>
                                        <Popconfirm title="Sure to cancel?" 
                                            onConfirm={() => {
                                                this.cancel()
                                                setFieldsValue({
                                                    name: this.getName()
                                                })}}>
                                            <Button>Cancel</Button>
                                        </Popconfirm>
                                    </span>
                                </Form.Item>
                            )
                            :
                            (
                                <Form.Item>
                                    <Button type="primary"
                                         onClick={() => {this.edit()}}
                                    >Edit</Button>
                                </Form.Item>         
                            )
                        }
                    </Col>
                </Row>
            </Form>
        )
    }
}

const WrappedName = Form.create({ name: 'horizontal_login' })(NameInfo);
const WrappedEmail = Form.create({ name: 'email_info'})(EmailInfo);

const Profile = ({ dispatch, loading, history, currentUser, favoriteCourses, registedCourses, 
    deleteFavoriteStatus, status, confirmStatus }) => {
    const [menuKey, setMenuKey] = useState('profile');

    // useEffect
    useEffect(() => {
        if (currentUser.id) {
            const payload = {
                uid: currentUser.id
            }
            dispatch({ type: 'user/fetchCurrentFavorite', payload });
            dispatch({ type: 'user/fetchCurrentRegister', payload });
        }
    }, [currentUser])

    useEffect(() => {
        if (deleteFavoriteStatus === "SUCCESS") {
            message.success('Remove course successfully');
            dispatch({ type: 'user/resetStatus' });
        }
        if (deleteFavoriteStatus === "FAIL") {
            message.error('Remove course fail');
            dispatch({ type: 'user/resetStatus' });
        }
    }, [deleteFavoriteStatus])

    const handleClick = e => {
        setMenuKey(e.key);
    };

    const handleRemoveFavorite = (id) => {
        const payload = {
            uid: currentUser.id,
            cid: id
        };
        dispatch({ type: 'user/delFavorite', payload });
    }

    return (
        <Row>
            <Col span={3} />
            <Col span={18}>
                <Row gutter={24}>
                    <Col span={6} style={{ alignItems: 'center' }}>
                        <div style={{ width: '100%' }}>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Avatar size={130} src={currentUser.avatarURL} style={{ alignItems: 'center' }} />

                            </div>
                            <Typography.Title level={4} style={{ textAlign: 'center' }}>{currentUser.name}</Typography.Title>
                        </div>

                        <Menu
                            onClick={handleClick}
                            style={{ width: 256 }}
                            defaultSelectedKeys={['profile']}
                            defaultOpenKeys={['profile']}
                            mode="inline"
                        >
                            <Menu.Item key="profile">Profile</Menu.Item>
                            <Menu.Item key="favorite">Favorite Courses</Menu.Item>
                            <Menu.Item key="signed">Signed Courses</Menu.Item>
                        </Menu>
                    </Col>
                    <Col span={18} style={{ alignItems: 'center' }}>
                        {
                            menuKey === "profile" &&
                            <Card title="Manage your profile">
                                <div>         
                                    <Typography>Name</Typography>
                                    <WrappedName currentUser={currentUser} 
                                            editName = {(values) => dispatch({type: 'user/editProfile', 
                                        payload:[currentUser.id, values]})}/>   
                                    <Typography>Email</Typography>
                                    <WrappedEmail currentUser={currentUser}
                                            status={status}
                                            confirmStatus={confirmStatus}
                                            sendCode = {() => dispatch({type: 'user/resetEmailRequest',
                                                payload:currentUser.id})} 
                                            confirmCode = {(code) => dispatch({type: 'user/confirmCode',
                                                payload: [currentUser.id, code]})}
                                            changeEmail = {(values) => dispatch({type: 'user/editProfile',
                                                payload: [currentUser.id ,values]})} 
                                            setConfirmFalse = {() => dispatch({type: 'user/confirmStatusFalse'})}/>                              
                                </div>
                            </Card>
                        }

                        {
                            menuKey === "favorite" &&
                            <Card title="Favorite Courses">
                                <List
                                    itemLayout="vertical"
                                    size="large"
                                    loading={loading}
                                    pagination={{
                                        pageSize: 5,
                                    }}
                                    dataSource={favoriteCourses}
                                    renderItem={item => (
                                        <List.Item
                                            key={item.title}
                                        >
                                            <Row onDoubleClick={() => {
                                                history.push({
                                                    pathname: `/detail`,
                                                    query: {
                                                        courseId: item.id,
                                                    },
                                                });
                                            }}>
                                                <Col span={9}>
                                                    <img
                                                        width={272}
                                                        alt="logo"
                                                        src={item.URL}
                                                    />
                                                </Col>
                                                <Col span={13}>
                                                    <Typography.Title level={4}>{item.name}</Typography.Title>
                                                    <Typography>{item.briefDescription}</Typography>
                                                    <Typography style={{ fontSize: '12px' }}>{item.lecturer}</Typography>
                                                </Col>
                                                <Col span={2}>
                                                    <Button onClick={() => {
                                                        handleRemoveFavorite(item.id);
                                                    }}>Remove</Button>
                                                </Col>
                                            </Row>
                                        </List.Item>
                                    )}
                                />
                            </Card>
                        }

                        {
                            menuKey === "signed" &&
                            <Card title="Registed Courses">
                                <List
                                    itemLayout="vertical"
                                    size="large"
                                    loading={loading}
                                    pagination={{
                                        pageSize: 5,
                                    }}
                                    dataSource={registedCourses}
                                    renderItem={item => {
                                        let progress = 0;

                                        if (item.sylabus) {
                                            let count = 0;
                                            console.log(item);
                                            item.sylabus.forEach(element => {
                                                if (element.isDone === true) {
                                                    count++;
                                                }
                                            });
                                            progress=Number(((count/item.sylabus.length)*100).toFixed(2));;
                                        }
                                        return ( 
                                            <List.Item
                                                key={item.title}
                                            >
                                                <Row onDoubleClick={() => {
                                                    router.replace(`/studentCourse?courseId=${item.id}&week=${item.progress}`);
                                                }}>
                                                    <Col span={9}>
                                                        <img
                                                            width={272}
                                                            alt="logo"
                                                            src={item.URL}
                                                        />
                                                    </Col>
                                                    <Col span={13}>
                                                        <Typography.Title level={4}>{item.name}</Typography.Title>
                                                        <Typography>{item.briefDescription}</Typography>
                                                        <Typography style={{ fontSize: '12px' }}>{item.lecturer}</Typography>
                                                        <Progress percent={progress} active/>
                                                    </Col>
                                                </Row>
                                            </List.Item>
                                        )
                                    }}
                                />
                            </Card>
                        }

                    </Col>
                </Row>
            </Col>
        </Row>
    )
};


export default connect(({ user, loading }) => ({
    currentUser: user.currentUser,
    favoriteCourses: user.favoriteCourses,
    registedCourses: user.registedCourses,
    deleteFavoriteStatus: user.deleteFavoriteStatus,
    status: user.status,
    loading: loading.effects['user/fetchCurrentRegister'],
    confirmStatus: user.confirmStatus
}))(Profile);