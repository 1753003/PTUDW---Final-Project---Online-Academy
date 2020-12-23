import { Drawer, Form, Button, Col, Row, Input, Select } from 'antd';
import React from 'react';
import { PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

export class DrawerForm extends React.Component {
  state = { visible: false};
  
  constructor(props) {  
    super(props);
    this.state = {
      options: [],
      newName: '',
      newIDTopic: null,
      data: this.props.listData,
    }
    
  }
  
  createOptions = () => {
    // console.log("create options");
    // console.log(this.state.data);
    this.state.options.push(<Option key={-1}> Null </Option>);
    for (let i = 0; i < this.state.data.length; i++){
      if (this.state.data[i].idTopic === null) {
        this.state.options.push(<Option key={this.state.data[i].id}> {this.state.data[i].name} </Option>);
      }
    }
  }

  showDrawer = () => { 
    this.setState({
      data: this.props.listData,
      visible: true,
    })
    this.createOptions();   
    console.log(this.state.options); 
  };

  saveOption = (value) => {
    this.setState({
      newIDTopic: value
    })
  }

  saveName = (value) => {
    this.setState({
      newName: value
    })
  }

  onClose = () => {
    this.setState({
      visible: false,
    });
  }; 

  onSubmit = () => {
    const returnData = [this.state.newName, this.state.newIDTopic == -1 ? null : this.state.newIDTopic ];
    this.props.onSubmit(returnData);
    this.setState({
      visible: false,
    });
  }

  render() {
    return (
      <>
        <Button type="primary" onClick={this.showDrawer}>
          <PlusOutlined /> New category
        </Button>
        <Drawer
          title="Create a new category"
          width={720}
          onClose={this.onClose}
          visible={this.state.visible}
          bodyStyle={{ paddingBottom: 80 }}
        >
          <Form layout="vertical" hideRequiredMark>
            <Row>
              <Col span={24}>
                <Form.Item
                  name="name"
                  label="Name"
                  rules={[{ required: true, message: 'Please enter category name' }]}
                >
                  <Input placeholder="Please enter category name" onChange={e => this.saveName(e.target.value)} />
                </Form.Item>
              </Col>
            </Row>
            <Row >
              <Col>
                <Form.Item
                  name="owner"
                  label="Topic"
                  rules={[{ required: true, message: 'Please select a topic' }]}
                >
                  <Select 
                    placeholder="Please select a topic"
                    onChange={this.saveOption}
                  >
                    {this.state.options}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Form>
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
            <Button onClick={this.onSubmit} type="primary">
              Submit
            </Button>
          </div>
        </Drawer>
      </>
    );
  }
}
