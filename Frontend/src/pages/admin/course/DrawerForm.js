import { Drawer, Button, Col, Row, Icon, Divider, Avatar } from 'antd';
import React from 'react';

const pStyle = {
  fontSize: 16,
  color: 'rgba(0,0,0,0.85)',
  lineHeight: '24px',
  display: 'block',
  marginBottom: 16,
  fontWeight: 'bold'
};

const DescriptionItem = ({ title, content }) => (
  <div
    style={{
      fontSize: 14,
      lineHeight: '22px',
      marginBottom: 7,
      color: 'rgba(0,0,0,0.65)',
    }}
  >
    <p
      style={{
        marginRight: 8,
        display: 'inline-block',
        color: 'rgba(0,0,0,0.85)',
      }}
    >
      {title}:
    </p>
    {content}
  </div>
);

export class DrawerForm extends React.Component {
  state = { visible: false, data: {} };

  showDrawer = () => {
    this.setState({
      visible: true,
      data: this.props.course,
    });

    // console.log(this.state.data);
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
          width={400}
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <Row>
            <Col span={18}>
              <p style={{ ...pStyle, marginBottom: 24 }}>Course information</p>
            </Col>
            <Col span={6}>
              <Avatar src={this.state.data.URL} size={64} />
            </Col>
          </Row>
          <DescriptionItem title="Course Name" content={this.state.data.name} />
          <DescriptionItem title="Category Name" content={this.state.data.categoryName} />
          <DescriptionItem title="Rate" content={this.state.data.rating} />
          <DescriptionItem title="Price" content={this.state.data.price} />
          <DescriptionItem title="Sale Price" content={this.state.data.salePrice} />
          <DescriptionItem title="Created Date" content={this.state.data.createdDate} />
          <DescriptionItem title="Updated Date" content={this.state.data.updatedDate} />
          <DescriptionItem title="Brief Description" content={this.state.data.briefDescription} />
          <DescriptionItem title="Detail Description" content={this.state.data.detailDescription} />
          <DescriptionItem title="Sale Information" content={this.state.data.saleInformation} />
          <DescriptionItem title="Views" content={this.state.data.views} />
          <DescriptionItem title="Status" content={this.state.data.status} />
          <Divider/>
          <p style={{ ...pStyle, marginBottom: 24 }}>Lecturer Information</p>
          <DescriptionItem title="Lecturer name" content={this.state.data.lecturerName} />
        </Drawer>
      </>
    );
  }
}