import React from 'react';
import { Card, Typography, Tag, Rate, Row, Col } from 'antd';

const Course = ({ url, title, author, price, salePrice, category, rating, numRate }) => {
  return(
    <Card
    hoverable
    cover={<img alt="example" src={url} />}
    >   
        <Typography style={{fontWeight: 'bold'}}>{title}</Typography> 
        <Typography style={{fontSize: '11px', fontWeight: 'bold'}}>Topic: {category}</Typography>    
        <Typography style={{fontSize: '11px'}}>{author}</Typography>  
        <Rate disabled style={{fontSize: '15px'}} defaultValue={rating}/>
        <Typography style={{fontStyle: 'italic'}}>({numRate} person has rated)</Typography>
        <Row>
          <Col span={12}>
            <Typography style={{fontWeight: 'bold'}}>${price}</Typography>
          </Col>
          <Col span={12}>
            <Typography.Text delete style={{fontWeight: 'bold', textAlign:'right'}}>${salePrice}</Typography.Text>
          </Col>
        </Row>      
    </Card>
  )
};


export default Course;