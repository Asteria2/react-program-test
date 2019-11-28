import React, { Component } from "react";
import { Card, Button, Table, Radio, Modal } from "antd";
import "./role.less";
import dateFormat from "../../utils/dateFormat";
import AddRoleForm from "./addRoleForm/AddRoleForm";
import { getRolesAsync } from "../../redux/action-creators/role";
import { connect } from "react-redux";
@connect(state => ({ roles: state.roles }), { getRolesAsync })
class Role extends Component {
  state = {
    value: "",
    addRoleVisible: false
  };
  columns = [
    {
      dataIndex: "_id",
      render: id => <Radio value={id} />
    },
    {
      title: "角色名称",
      dataIndex: "name"
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      render: time => {
        return dateFormat(time);
      }
    },
    {
      title: "授权时间",
      dataIndex: "authTime",
      render: time => {
        return dateFormat(time);
      }
    },
    {
      title: "授权人",
      dataIndex: "authName"
    }
  ];
  showAddRole = () => {
    this.setState({
      addRoleVisible: true
    });
  };
  addRole = () => {
    this.setState({
      addRoleVisible: false
    });
  };
  hidden = () => {
    this.setState({
      addRoleVisible: false
    });
  };

  componentDidMount() {
    if (!this.props.roles.length) {
      this.props.getRolesAsync();
    }
  }

  render() {
    const { value, addRoleVisible } = this.state;
    const { roles } = this.props;
    return (
      <Card
        title={
          <div>
            <Button type="primary" onClick={this.showAddRole}>
              创建角色
            </Button>
            <Button type="primary" className="controlBtn">
              设置角色权限
            </Button>
          </div>
        }
      >
        <Radio.Group
          onChange={this.onChange}
          value={value}
          style={{ width: "100%" }}
        >
          <Table
            columns={this.columns}
            dataSource={roles}
            bordered
            rowKey="_id"
            pagination={{
              showQuickJumper: true,
              showSizeChanger: true,
              pageSizeOptions: ["3", "6", "9"],
              defaultPageSize: 3
            }}
          />
        </Radio.Group>
        <Modal
          title="创建角色"
          visible={addRoleVisible}
          onOk={this.addRole}
          onCancel={this.hidden}
          width={300}
        >
          <AddRoleForm
            wrappedComponentRef={form => (this.addRoleForm = form)}
          />
        </Modal>
      </Card>
    );
  }
}
export default Role;
