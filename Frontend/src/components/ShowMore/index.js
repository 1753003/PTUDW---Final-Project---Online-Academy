import React, { useState } from 'react';
import { Card, Typography, Tag, Rate, Button, Col, Row, Icon } from 'antd';

const ShowMore = ({ url, title, author, price }) => {
    const [toggle, setToggle] = useState(false);

    const handleClick = () => {
        setToggle(!toggle);
    }
    return (
        <div>
            <Row onClick={handleClick} style={{ border: '1px solid #d9d9d9', backgroundColor: '#e8e8e8', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px' }}>
                <Col span={23} >
                    <Typography.Title level={4}>Title</Typography.Title>
                </Col>
                <Col span={1} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',  }}>
                    {toggle === false ? <Icon type="caret-down" /> :
                        <Icon type="caret-up" />}
                </Col>
            </Row>

            {toggle && <Typography style={{ border: '1px solid #d9d9d9', wordBreak: 'break-all', padding: '10px', borderTopWidth: '0px'}}>Inner Card contentfasdfkalsdfklasdjfklsajdfklajsdklfjaskldfjlksajdfklasjdfkInner Card contentfasdfkalsdfklasdjfklsajdfklajsdklfjaskldfjlksajdfklasjdfkInner Card contentfasdfkalsdfklasdjfklsajdfklajsdklfjaskldfjlksajdfklasjdfkInner Card contentfasdfkalsdfklasdjfklsajdfklajsdklfjaskldfjlksajdfklasjdfkl</Typography>}

        </div>
    )
};


export default ShowMore;