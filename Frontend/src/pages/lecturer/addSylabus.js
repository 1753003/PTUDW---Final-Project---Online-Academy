/* eslint-disable react/prefer-stateless-function */
/* eslint-disable max-classes-per-file */
import React from 'react';
import {connect} from 'dva';
// eslint-disable-next-line import/no-extraneous-dependencies
import { PageHeader, Table, Button, Drawer, Icon, Input, InputNumber, Popconfirm, Form, Divider, Collapse, Col, Row } from 'antd';

const { Panel } = Collapse;

class MyForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.form.resetFields();        
      }
    });
  };

  render() { 
    const { getFieldDecorator } = this.props.form;
    return (
      <PageHeader>   
         <Form onSubmit={this.handleSubmit} className="login-form" layout="horizontal">
          <Row gutter={16}>
              <Col span={4} />
              <Col span={16}>
                  <Form.Item>
                      {getFieldDecorator('week', {
                          rules: [{ required: true, message: 'Please input week!' }],
                      })(
                          <Input
                          placeholder="Week"
                          />
                      )}
                  </Form.Item>
                  <Form.Item>
                      {getFieldDecorator('name', {
                          rules: [{ required: true, message: 'Please input lesson name!' }],
                      })(
                          <Input
                          placeholder="Lesson name"
                          />
                      )}
                  </Form.Item>
                  <Form.Item>
                      {getFieldDecorator('videoLink', {
                          rules: [{ required: true, message: 'Please input link video!' }],
                      })(
                          <Input
                          placeholder="Link video"
                          />
                      )}
                  </Form.Item>
                  <Form.Item>
                      <Button type="primary" htmlType="submit" className="login-form-button">
                          Add
                      </Button>
                  </Form.Item>
              </Col>
          </Row>
        </Form>
   
      </PageHeader>
      
    );
  }
}

const WrappedForm = Form.create({ name: 'normal_login' })(MyForm);

const EditableContext = React.createContext();

class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === 'number') {
      return <InputNumber />;
    }
    return <Input />;
  };

  renderCell = ({ getFieldDecorator }) => {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator(dataIndex, {
              rules: [
                {
                  required: true,
                  message: `Please Input ${title}!`,
                },
              ],
              initialValue: record[dataIndex],
            })(this.getInput())}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  render() {
    return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
  }
}

class EditableTable extends React.Component {

  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'Week',
        dataIndex: 'week',
        editable: true,
      },
      {
        title: 'Lesson',
        dataIndex: 'name',
        editable: true,
      },
      {
        title: 'Link video',
        dataIndex: 'videoLink',
        editable: true
      },
      {
        title: 'operation',
        dataIndex: 'operation',
        render: (text, record) => {
          const { editingKey } = this.state;
          const editable = this.isEditing(record);
          return editable ? (
            <span>
              <EditableContext.Consumer>
                {form => (
                  <a
                    onClick={() => this.save(form, record.key)}
                    style={{ marginRight: 8 }}
                  >
                    Save
                  </a>
                )}
              </EditableContext.Consumer>
              <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.key)}>
                <a>Cancel</a>
              </Popconfirm>
            </span>
          ) : (
            <a disabled={editingKey !== ''} onClick={() => this.edit(record.key)}>
              Edit
            </a>
          );
        },
      },
    ];
    this.props.dispatch({type: 'sylabus/get', payload:(JSON.parse(localStorage.getItem('userData'))).uid});
    this.state = { courseID: this.props.courseID, editingKey: ''}
}
  
  getData = () => {
      const { list = [] } = this.props.sylabus;
      let sylabus = [];
      list.forEach(item => {
          if (item.courseID === this.state.courseID) {
            sylabus = item.Sylabus;
            sylabus.forEach(i => {i.key = i.week;})
          }
      })
      return sylabus;
  }

  isEditing = record => record.key === this.state.editingKey;

  cancel = () => {
    this.setState({ editingKey: '' });
  };

  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newData = this.getData();
      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        this.setState({ editingKey: '' });
        //dispatch
      } else {
        newData.push(row);
        this.setState({ editingKey: '' });
        //dispatch
      }
    });
  }

  edit(key) {
    this.setState({ editingKey: key });
  }

  render() {
    console.log(this.state);
    const components = {
      body: {
        cell: EditableCell,
      },
    };

    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === 'age' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });

    return (
      <EditableContext.Provider value={this.props.form}>
        <Table
          components={components}
          bordered
          dataSource={this.getData()}
          columns={columns}
          rowClassName="editable-row"
          pagination={{
            onChange: this.cancel,
          }}
        />
      </EditableContext.Provider>
    );
  }
}

const TableSylabusWrapper = connect(({sylabus}) => ({sylabus}))(EditableTable);
const EditableFormTable = Form.create()(TableSylabusWrapper);

class DrawerForm extends React.Component {
  state = { visible: false };

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
  
  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showDrawer}>
          <Icon type="plus" /> View
        </Button>
        <Drawer
          title={this.props.courseID}
          width={window.screen.width}
          onClose={this.onClose}
          visible={this.state.visible}
          bodyStyle={{ paddingBottom: 80 }}
        >       
          <EditableFormTable courseID = {this.props.courseID} />    
          <Divider />
          <Collapse onChange={()=>{}}>
            <Panel header="Add new lesson for your course" key="1">
                <WrappedForm/>
            </Panel>
        </Collapse>,
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
            <Button onClick={this.onClose} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button onClick={this.onClose} type="primary">
              Submit
            </Button>
          </div>
        </Drawer>
      </div>
    );
  }
}

export class Sylabus extends React.Component {
    render() {
        return (
            <DrawerForm courseID = {this.props.courseID}/>
        )
    } 
};
