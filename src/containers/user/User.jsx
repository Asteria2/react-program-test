import React, { Component } from "react";
import { Card, Button, Table, Modal } from "antd";
import { reqGetUsers } from "../../api";
import dateFormat from "../../utils/dateFormat";
import AddUserForm from "./addUserForm/AddUserForm";
class User extends Component {
  state = {
    users: [],
    addUserVisible: false
  };
  columns = [
    {
      title: "用户名",
      dataIndex: "username"
    },
    {
      title: "邮箱",
      dataIndex: "email"
    },
    {
      title: "电话",
      dataIndex: "phone"
    },
    {
      title: "注册时间",
      dataIndex: "createTime",
      render: time => {
        return dateFormat(time);
      }
    },
    {
      title: "所属角色",
      // dataIndex: "roleId",
      render: user => {
        console.log(user);
      }
    },
    {
      title: "操作",
      render: () => {
        return (
          <div>
            <Button type="link">修改密码</Button>
            <Button type="link">删除</Button>
          </div>
        );
      }
    }
  ];
  componentDidMount() {
    reqGetUsers().then(res => {
      this.setState({
        users: res
      });
    });
  }
  showAddUser = () => {
    this.setState({
      addUserVisible: true
    });
  };
  addUser = () => {
    this.setState({
      addUserVisible: false
    });
  };
  hidden = () => {
    this.setState({
      addUserVisible: false
    });
  };
  render() {
    const { users, addUserVisible } = this.state;
    return (
      <Card
        title={
          <Button type="primary" onClick={this.showAddUser}>
            创建用户
          </Button>
        }
      >
        <Table
          columns={this.columns}
          dataSource={users}
          bordered
          rowKey="_id"
          pagination={{
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: ["3", "6", "9"],
            defaultPageSize: 3
          }}
        />
        <Modal
          title="创建用户"
          visible={addUserVisible}
          onOk={this.addUser}
          onCancel={this.hidden}
          width={300}
        >
          <AddUserForm
            wrappedComponentRef={form => (this.addUserForm = form)}
          />
        </Modal>
      </Card>
    );
  }
}
export default User;
