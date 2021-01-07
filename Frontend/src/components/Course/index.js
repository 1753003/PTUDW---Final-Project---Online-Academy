import React from 'react';
import { Card, Typography, Tag, Rate, Row, Col, Icon } from 'antd';
import styles from './index.less';
const {Meta} = Card
const Course = ({ url, title, author, price, salePrice, category, rating, numRate }) => {
  return(
    // <Card className={styles.main}
    // hoverable
    // cover={<img alt="example" src={url} />}
    // >   
    //     <Typography style={{fontWeight: 'bold'}}>{title}</Typography> 
    //     <Typography style={{fontSize: '11px', fontWeight: 'bold'}}>Topic: {category}</Typography>    
    //     <Typography style={{fontSize: '11px'}}>{author}</Typography>
    //     <Row type='inline' justify='center' align='middle'>
    //     <Typography.Text type = 'warning' strong>{rating} </Typography.Text>
    //     <Rate disabled defaultValue={rating} style={{height:'12px', margin:'0 auto'}}/>
    //     <span className="ant-rate-text" style={{fontStyle: 'italic'}}>({numRate})</span>
    //     </Row>
    //     <Row type='flex' gutter={[8, 8]}>
    //       <Col>
    //         <Typography style={{fontWeight: 'bold'}}>${price}</Typography>
    //       </Col><Col>
    //         <Typography.Text delete style={{textAlign:'right', fontSize:'12px'}}>${salePrice}</Typography.Text>
    //       </Col>
    //     </Row>
    // </Card>
    <Card
    hoverable
    cover={
      <img alt="example" src={url}/>
    }
    >
      <Meta
      title={title}
      description={
        author, category
      }
      >
      </Meta>
      <Row type='flex' justify='bottom' align='middle' style={{verticalAlign: 'baseline', fontWeight:'bolder', color:'peru'}}>
      {/* <Typography.Text type = 'warning' strong style={{fontSize:'12pt'}}>{rating} </Typography.Text> */}
      {rating}
      <Rate disabled defaultValue={rating} style={{fontSize:'11pt'}}/>
      <Typography.Text style={{fontWeight:'normal',fontStyle: 'italic', fontSize:'10pt'}}>({numRate})</Typography.Text>
      </Row>
      <Row type='flex' gutter={[8, 8]}>
        <Col>
          <Typography style={{fontWeight: 'bold'}}>${price}</Typography>
        </Col><Col>
          <Typography.Text delete style={{textAlign:'right', fontSize:'12px'}}>${salePrice}</Typography.Text>
        </Col>
      </Row>
    </Card>
  )
};


export default Course;