import React, { useState } from 'react';
import { Typography, Col, Row, Icon } from 'antd';

const ShowMore = ({ title, info }) => {
    const [toggle, setToggle] = useState(false);

    const handleClick = () => {
        setToggle(!toggle);
    }
    return (
        <div>
            <Row onClick={handleClick} style={{ border: '1px solid #bfbfbfy', backgroundColor: '#e8e8e8', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px', paddingBottom: '0px' }}>
                <Col span={23} >
                    <Typography.Title level={4} style={{color: 'black'}}>{title}</Typography.Title>
                </Col>
                <Col span={1} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                    {toggle === false ? <Icon type="caret-down" /> :
                        <Icon type="caret-up" />}
                </Col>
            </Row>

            {toggle && <Typography style={{ border: '1px solid #d9d9d9', wordBreak: 'break-all', padding: '10px', borderTopWidth: '0px' }}>{info}</Typography>}

        </div>
    )
};


export default ShowMore;