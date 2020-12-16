/* eslint-disable no-undef */
import React, { useEffect } from 'react';
import { Icon, Table, PageHeader, Button, Divider, Popconfirm, Input } from 'antd';
import { connect } from 'dva';


const Category = ({list, dispatch}) => {
  useEffect(() => {
    dispatch({ type: 'category/get'});
  }, []);

  useEffect(() => {
  }, [list]);

  const data = list.list;
  const EditableCell = ({ editable, value, onChange }) => (
    <div>
      {editable
        ? <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
        : value
      }
    </div>
  );
  
  class EditableTable extends React.Component {
    constructor(props) {
      super(props);  
      this.columns = [{
        title: '',
        dataIndex: 'id',
        render: (text, record) => this.renderColumns(text, record, 'id', false),
      }, {
        title: 'name',
        dataIndex: 'name',
        render: (text, record) => this.renderColumns(text, record, 'name', true),
      }, {
        title: 'Null',
        dataIndex: 'isNull',
        render: isNull => (
            <Icon type={isNull === 1 ? 'check' : 'uncheck'} />
        )
      }, {
        title: 'Topic',
        render: (item) => (
            item.idTopic === null ? '' : list.list[item.idTopic - 1].name
        )
      }, {
        title: 'Remove',
        key: 'remove',
        render: (item) => (
            item.isNull === 1 ?
            <Button onClick={() => { dispatch({ type: 'category/remove', payload: item.id}) }}>
                <Icon type = 'delete' />
            </Button>
            :
            <Button disabled>
                <Icon type = 'delete' />
            </Button>
        )
      }, {
        title: 'edit',
        dataIndex: 'operation',
        render: (text, record) => {
          const { editable } = record;
          return (
            <div className="editable-row-operations">
              {
                editable ?
                  <span>
                    <a onClick={() => this.save(record.key)}>Save</a>
                    <p>   </p> 
                    <Popconfirm title="Sure to cancel?" okText="Yes" cancelText="No" onConfirm={() => this.cancel(record.key)}>
                      <a>Cancel</a>
                    </Popconfirm>
                  </span>
                  : <a onClick={() => this.edit(record.key)}>Edit</a>
              }
            </div>
          );
        },
      }];
      this.state = { data };
      this.cacheData = data.map(item => ({ ...item }));
    }
    
    // eslint-disable-next-line react/sort-comp
    renderColumns(text, record, column, isAccepted) {
      const isEditAccepted = isAccepted === true ? record.editable : false;
      return (
        <EditableCell
          editable={isEditAccepted}
          value={text}
          onChange={value => this.handleChange(value, record.key, column)}
        />
      );
    }
  
    handleChange(value, key, column) {
      const newData = [...this.state.data];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        target[column] = value;
        this.setState({ data: newData });
      }
    }
  
    edit(key) {
      const newData = [...this.state.data];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        target.editable = true;
        this.setState({ data: newData });
      }
    }
  
    save(key) {
      const newData = [...this.state.data];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        delete target.editable;
        this.setState({ data: newData });
        this.cacheData = newData.map(item => ({ ...item }));
     
        dispatch({ type: 'category/edit', payload: [target.id, target.name]});
      }
    }
  
    cancel(key) {
      const newData = [...this.state.data];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
        delete target.editable;
        this.setState({ data: newData });
      }
    }
  
    render() {
      return <Table bordered dataSource={this.state.data} columns={this.columns} />;
    }
  }

  return (
    <PageHeader>
        <h2>Category page</h2>  
        <Divider />
        <EditableTable/> 
    </PageHeader>
  )
};


export default connect(({ category }) => ({
  list: category
}))(Category);