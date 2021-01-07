import React from 'react';
import { Card, Typography, Tag, Rate, Row, Col, Icon } from 'antd';
import styles from './index.less';
const {Meta} = Card
const Course = ({ url, title, lecturer, price, salePrice, category, rating, numRate }) => {
  return(
    <Card
    className={styles.main}
    hoverable
    cover={
      <img className={styles.cover} alt="example" src={url}/>
    }
    >
      <Meta
      title={title}
      description={
        lecturer+ "\n" + "Category: " + category 
      }
      >
      </Meta>
      <Row type='flex' justify='bottom' align='middle' style={{verticalAlign: 'baseline', fontWeight:'bolder', color:'peru'}}>
      {rating}
      <Rate className={styles.rate} disabled defaultValue={rating} style={{fontSize:'11pt'}}/>
      <Typography.Text style={{fontWeight:'normal',fontStyle: 'italic', fontSize:'10pt'}}>({numRate})</Typography.Text>
      </Row>
      <Row type='flex' gutter={[8, 8]}>
        <Col>
          <Typography.Text strong >${price}</Typography.Text>
        </Col><Col>
          <Typography.Text delete style={{textAlign:'right', fontSize:'12px'}}>${salePrice}</Typography.Text>
        </Col>
      </Row>
    </Card>
  )
};

export default Course;