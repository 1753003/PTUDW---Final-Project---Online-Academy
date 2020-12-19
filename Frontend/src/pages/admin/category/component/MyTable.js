// eslint-disable-next-line max-classes-per-file
import React from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, Icon, Button } from 'antd';
import { connect } from 'dva';

const EditableContext = React.createContext();

class EditableCell extends React.Component {
getInput = () => {
    if (this.props.inputType === 'number') {
    return <InputNumber />;
    }
    return <Input />;
};

renderCell = ({ getFieldDecorator }) => {
    const {
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
    } = this.props;
    return (
    <td {...restProps}>
        {editing ? (
        <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator(dataIndex, {
            rules: [
                {
                required: true,
                message: `Please Input ${title}!`,
                },
            ],
            initialValue: record[dataIndex],
            })(this.getInput())}
        </Form.Item>
        ) : (
        children
        )}
    </td>
    );
};

render() {
    return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
}
}

class EditableTable extends React.Component {
constructor(props) {
    super(props);
   
    this.state = { editingKey: '' };
    this.columns = [
    {
        title: 'ID',
        dataIndex: 'key',
        editable: false
    },
    {
        title: 'name',
        dataIndex: 'name',
        editable: true,
    },
    {
        title: 'Null',
        dataIndex: 'isNull',
        editable: false,
        render: isNull => (
            <Icon type={isNull === 1 ? 'check' : 'uncheck'} />
        ) 
    },
    {
        title: 'Topic',
        editable: false,
        render: (item) => (
            item.idTopic === null ? '' : this.props.data[item.idTopic - 1].name
        )
    },
    {
        title: 'Remove',
        render: (item) => (
            item.isNull === 1 ?
            <Button onClick={() => { this.props.dispatch({ type: 'category/remove', payload: item.key}) }}>
                <Icon type = 'delete' />
            </Button>
            :
            <Button disabled>
                <Icon type = 'delete' />
            </Button>
        )
    },
    {
        title: 'Edit',
        dataIndex: 'edit',
        render: (text, record) => {
        const { editingKey } = this.state;
        const editable = this.isEditing(record);
 
        return editable ? (
            <span>
            <EditableContext.Consumer>
                {form => (
                <a
                    onClick={() => this.save(form, record.key)}
                    style={{ marginRight: 8 }}
                >
                    Save
                </a>
                )}
            </EditableContext.Consumer>
            <Popconfirm title="Sure to cancel?" okText="Yes" cancelText="No" onConfirm={() => this.cancel(record.key)}>
                <a>Cancel</a>
            </Popconfirm>
            </span>
        ) : (
            <a disabled={editingKey !== ''} onClick={() => this.edit(record.key)}>
            Edit
            </a>
        );
        },
    },
    ];
}

isEditing = record => record.key === this.state.editingKey;

cancel = () => {
    this.setState({ editingKey: '' });
};

save(form, key) {
    form.validateFields((error, row) => {
    if (error) {
        return;
    }
    const newData = this.props.data;
    const index = newData.findIndex(item => key === item.key);
    
    if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
        ...item,
        ...row,
        });
        this.setState({ editingKey: '' });
    } else {
        newData.push(row);
        this.setState({ editingKey: '' });
    }
    this.props.dispatch({ type: 'category/edit', payload: [index+1, newData[index].name]});
    });
}

edit(key) {
    this.setState({ editingKey: key });
}

render() {
    const components = {
        body: {
            cell: EditableCell,
        },
    };

    const columns = this.columns.map(col => {
    if (!col.editable) {
        return col;
    }
    return {
        ...col,
        onCell: record => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: this.isEditing(record),
        }),
    };
    });
    return (
    <EditableContext.Provider value={this.props.form}>
        <Table
        components={components}
        bordered
        dataSource={this.props.data}
        columns={columns}
        rowClassName="editable-row"
        pagination={{
            onChange: this.cancel,
        }}
        />
    </EditableContext.Provider>
    );
}
}

const A = connect()(EditableTable);
const EditableFormTable = Form.create()(A);
    
export class MyTable extends React.Component {
    transformData = (i) => ({
        key: i.id,
        name: i.name,
        isNull: i.isNull,
        idTopic: i.idTopic
    });

    render(){
        return <EditableFormTable data={this.props.listData.map(this.transformData)} />
    }
}
