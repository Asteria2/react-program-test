import React, { Component } from "react";
import { Card, Button, Table, Modal, message } from "antd";
import { reqGetUsers, reqAddUser } from "../../api";
import dateFormat from "../../utils/dateFormat";
import AddUserForm from "./addUserForm/AddUserForm";
import { connect } from "react-redux";
import { getRolesAsync } from "../../redux/action-creators/role";
import { reqDelUser } from "../../api";

@connect(state => ({ roles: state.roles }), { getRolesAsync })
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
      dataIndex: "roleId",
      render: id => {
        const { roles } = this.props;
        const role = roles.find(role => {
          return role._id === id;
        });
        return role && role.name;
      }
    },
    {
      title: "操作",
      render: user => {
        return (
          <div>
            <Button type="link">修改密码</Button>
            <Button type="link" onClick={this.delUser(user)}>
              删除
            </Button>
          </div>
        );
      }
    }
  ];
  delUser = user => {
    return () => {
      console.log(user);
      Modal.confirm({
        title: `您确定要删除用户${user.username}吗？`,
        onOk: () => {
          reqDelUser(user.username);
        }
      });
    };
  };
  componentDidMount() {
    reqGetUsers().then(res => {
      this.setState({
        users: res
      });
    });
    if (!this.props.roles.length) {
      this.props.getRolesAsync();
    }
  }
  showAddUser = () => {
    this.setState({
      addUserVisible: true
    });
  };
  addUser = () => {
    this.addUserForm.props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log(values);
        const result = await reqAddUser(values);
        console.log(result);
        message.success("添加用户成功");
        this.addUserForm.props.form.resetFields();
        this.setState({
          users: [...this.state.users, result]
        });
        this.setState({
          addUserVisible: false
        });
      }
    });
  };
  hidden = () => {
    this.setState({
      addUserVisible: false
    });
  };
  render() {
    const { users, addUserVisible } = this.state;
    const { roles } = this.props;
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
            roles={roles}
          />
        </Modal>
      </Card>
    );
  }
}
export default User;
