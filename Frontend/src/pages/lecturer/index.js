/* eslint-disable max-classes-per-file */
import React from 'react';
import {connect} from 'dva';
// eslint-disable-next-line import/no-extraneous-dependencies
import ReactQuill from 'react-quill';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-quill/dist/quill.snow.css';
import { Upload, Icon, message, PageHeader, Button, Form, Col, Row, Input, Select, InputNumber, Divider } from 'antd';

const { Option } = Select;
const { TextArea } = Input;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

class Avatar extends React.Component {
  state = {
    loading: false,
  };

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => {
        this.setState({
          imageUrl,
          loading: false,
        });

        this.props.onDone(this.state.imageUrl);
    }); 
    }
  };

  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { imageUrl } = this.state;
    return (
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
    );
  }
}

class MyForm extends React.Component {
  state = {options: [], url: ''};

  constructor(props) {
      super(props);
      this.props.dispatch({type:'category/get'});
      console.log(this.props);
      this.createOptions();
  }

  createOptions = () => {
    for (let i = 0; i < this.props.category.list.length; i++){
      if (this.props.category.list[i].idTopic !== null) {
        this.state.options.push(<Option key={this.props.category.list[i].id}> {this.props.category.list[i].name} </Option>);
      }
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      values.url = this.state.url;
      values.lecturerID = (JSON.parse(localStorage.getItem('userData'))).uid;
      values.rating = 0;
      values.status = "Not complete";
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.dispatch({type: 'course/add', payload: values});
      }
    });
  };

  render() {
    const { getFieldDecorator, } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form" layout="horizontal">
        <Row gutter={16}>
            <Col span={4} />
            <Col span={14}>
                <Form.Item>
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: 'Please input course name!' }],
                    })(
                        <Input
                        placeholder="Course name"
                        />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('categoryID', {
                        rules: [{ required: true, message: 'Please choose category!' }],
                    })(
                        <Select 
                            placeholder="Please select a topic"
                            onChange={this.saveOption}
                        >
                            {this.state.options}
                        </Select>
                    )}
                </Form.Item>       
                <Form.Item >
                    {getFieldDecorator('briefDescription', {
                        rules: [{ required: true, message: 'Please input brief description!' }],
                    })(
                        <TextArea 
                          placeholder = "Brief Description"
                          rows={2}/>
                    )}
                </Form.Item>  
                <Form.Item label="Please describe the course content in detail in the form below">
                    {getFieldDecorator('detailDescription', {
                        rules: [{ required: true, message: 'Please input detail description!' }],
                        initialValue: ''
                    })(
                      <ReactQuill theme="snow" />
                    )}
                </Form.Item>   
                <Row gutter = "32">
                    <Col span="4">Price: </Col>
                    <Col span="8">
                      <Form.Item>
                      {getFieldDecorator('price', {
                          rules: [{ required: true, message: 'Please input course price!' }],
                      })(
                        <InputNumber defaultValue={1000}
                        formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={value => value.replace(/\$\s?|(,*)/g, '')}
                        />
                      )}
                      </Form.Item>   
                    </Col>
                    <Col span="4">Sale Price: </Col>
                    <Col span="8">
                      <Form.Item>
                      {getFieldDecorator('salePrice', {
                          rules: [{ required: true, message: 'Please input sale price!' }],
                      })(
                        <InputNumber defaultValue={1000}
                        formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={value => value.replace(/\$\s?|(,*)/g, '')}/>
                      )}
                      </Form.Item>   
                    </Col>
                </Row>
                <Form.Item>
                      {getFieldDecorator('saleInformation', {
                      })(
                        <TextArea rows={3} placeholder="Sale information"/>
                      )}
                      </Form.Item>   
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Upload
                    </Button>
                </Form.Item>
            </Col>
            <Col span={2}>
              <Avatar onDone = {(img) => {this.setState({url: img})}}/>
            </Col>
            <Col span={4} />
        </Row>
      </Form>
    );
  }
}
const A = connect(({category, user}) => ({category, user}))(MyForm);
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(A);

const Home = () => {
    return (
        <PageHeader>
            <h1>Add new course</h1>
            <Divider/>
            <WrappedNormalLoginForm />
        </PageHeader>       
    )    
};

export default Home;