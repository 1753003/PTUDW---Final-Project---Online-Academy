import React from 'react';
import { Card, Typography, Tag, Rate } from 'antd';

const Course = ({ url, title, author, price }) => {
  return(
    <Card
    hoverable
    cover={<img alt="example" src={url} />}
    >   
        <Typography style={{fontWeight: 'bold'}}>{title}</Typography> 
        <Typography style={{fontSize: '11px'}}>{author}</Typography>  
        <Rate disabled style={{fontSize: '15px'}} defaultValue={5}/>
        <Typography style={{fontWeight: 'bold'}}>${price}</Typography>
        <Tag color="#f50">Bestseller</Tag>
       
    </Card>
  )
};


export default Course;