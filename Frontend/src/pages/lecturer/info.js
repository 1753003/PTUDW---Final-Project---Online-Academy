/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable max-classes-per-file */
import { Drawer, Button, Icon, Divider, PageHeader, Form, Input, InputNumber} from 'antd';
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import ReactQuill from 'react-quill';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-quill/dist/quill.snow.css';

const { TextArea } = Input;

class MyForm extends React.Component {
  state = {isEdit : false, initValue: {}};

  constructor(props) {
    super(props);
    this.state = {initValue: this.props.course}
    this.quillRef = React.createRef();    
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onUpdate(values);
        this.quillRef.current.editor.enable(false); 
        this.setState({
          isEdit: !this.state.isEdit,
        })
      }
    });
  };

  componentDidMount = () => {
    this.quillRef.current.editor.enable(false);   // undefined
  };

  render() { 
    const { getFieldDecorator } = this.props.form;
    const { setFieldsValue } = this.props.form;
    const { course } = this.props;
    
    return (
      <PageHeader>  
         <h3>Course Information</h3> 
         <Button type="primary" disabled={this.state.isEdit} onClick={()=>{
           this.setState({isEdit: !this.state.isEdit})
           this.quillRef.current.editor.enable(true); 
           }}>Edit</Button>
         <Divider />
         <Form onSubmit={this.handleSubmit} className="login-form" layout="vertical">  
            <Form.Item label="Course name" >
                {getFieldDecorator('name', {initialValue:course.name,
                          rules: [{ required: true, message: 'Please input course name!' }],
                      })(
                    <Input
                      disabled={!this.state.isEdit}
                    />
                )}
            </Form.Item>
            <Form.Item label="Category name" >
                {getFieldDecorator('categoryName', {initialValue:course.categoryName})(
                    <Input
                      disabled="true"
                    />
                )}
            </Form.Item>
            <Form.Item label="Rate" >
                {getFieldDecorator('rating', {initialValue:course.rating})(
                    <Input
                      disabled="true"
                    />
                )}
            </Form.Item>
            <Form.Item label="Price" >
                {getFieldDecorator('price', {rules: [{ required: true, message: 'Please input course name!' }],
                initialValue:course.price})(
                    <InputNumber
                      disabled={!this.state.isEdit}
                    />
                )}
            </Form.Item>
            <Form.Item label="Sale Price" >
                {getFieldDecorator('salePrice', {rules: [{ required: true, message: 'Please input course name!' }],
                initialValue:course.salePrice})(
                    <InputNumber
                      disabled={!this.state.isEdit}
                    />
                )}
            </Form.Item>
            <Form.Item label="Created Date" >
                {getFieldDecorator('createdDate', {initialValue:course.createdDate})(
                    <Input
                      disabled="true"
                    />
                )}
            </Form.Item>
            <Form.Item label="Updated Date" >
                {getFieldDecorator('updatedDate', {initialValue:course.updatedDate})(
                    <Input
                      disabled="true"
                    />
                )}
            </Form.Item>
            <Form.Item label="Brief Description" >
                {getFieldDecorator('briefDescription', {rules: [{ required: true, message: 'Please input course name!' }],
                initialValue:course.briefDescription})(
                    <TextArea
                      disabled={!this.state.isEdit}
                    />
                )}
            </Form.Item>
            <Form.Item label="Detail Description" >
                {getFieldDecorator('detailDescription', {rules: [{ required: true, message: 'Please input course name!' }],
                initialValue:course.detailDescription})(
                    <ReactQuill theme="snow" ref={this.quillRef}/>
                )}
            </Form.Item>
            <Form.Item label="Sale information" >
                {getFieldDecorator('saleInformation', {rules: [{ required: true, message: 'Please input course name!' }],
                initialValue:course.saleInformation})(
                    <TextArea
                      disabled={!this.state.isEdit}
                    />
                )}
            </Form.Item>
            <Form.Item label="Views" >
                {getFieldDecorator('views', {initialValue:course.views})(
                    <Input
                      disabled="true"
                    />
                )}
            </Form.Item>
            <Form.Item label="Status" >
                {getFieldDecorator('status', {rules: [{ required: true, message: 'Please input course name!' }],
                initialValue:course.status})(
                    <Input
                    disabled={!this.state.isEdit}
                  />
                )}
            </Form.Item>
            <Form.Item style={{float: 'right'}}>
                <Button type="primary" htmlType="submit" className="login-form-button" disabled={!this.state.isEdit}>
                    Save
                </Button>
                <Button disabled={!this.state.isEdit}
                        onClick={()=>{
                          this.setState({isEdit: !this.state.isEdit});
                          this.quillRef.current.editor.enable(false); 
                          setFieldsValue({
                            name: this.state.initValue.name,
                            price: this.state.initValue.price,
                            salePrice: this.state.initValue.salePrice,
                            briefDescription: this.state.initValue.briefDescription,
                            detailDescription: this.state.initValue.detailDescription,
                            saleInformation: this.state.initValue.saleInformation,
                            status: this.state.initValue.status
                          });
                          }} 
                        style={{marginLeft:'10px'}}>
                    Cancel
                </Button>
            </Form.Item>
            
        </Form> 
      </PageHeader>    
    );
  }
}

const MyFormWrapper = Form.create()(MyForm);

export class Info extends React.Component {
  state = { visible: false };

  editable = false;

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
      <> 
        <Button type='link' onClick={this.showDrawer}>
            <Icon type="info-circle" theme="twoTone" />
        </Button>
        <Drawer
          width={800}
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
        >
         
          <MyFormWrapper course={this.props.course} onUpdate={(course) => {this.props.onUpdate(course)}}/>
        </Drawer>
      </>
    );
  }
}