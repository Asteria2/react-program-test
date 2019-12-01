import React, { Component } from "react";
import { Card, Button, Table, Modal, message } from "antd";
import { reqGetUsers, reqAddUser, reqDelUser } from "../../api";
import dateFormat from "../../utils/dateFormat";
import AddUserForm from "./addUserForm/AddUserForm";
import UpdatePasswordForm from "./updatePasswordForm/UpdatePasswordForm";
import { connect } from "react-redux";
import { getRolesAsync } from "../../redux/action-creators/role";
import { updatePasswordAsync } from "../../redux/action-creators/user";

@connect(state => ({ roles: state.roles }), {
  getRolesAsync,
  updatePasswordAsync
})
class User extends Component {
  state = {
    users: [],
    data: {},
    addUserVisible: false,
    updatePasswordVisible: false
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
      render: data => {
        return (
          <div>
            <Button type="link" onClick={this.updateUserPassword(data)}>
              修改密码
            </Button>
            <Button type="link" onClick={this.delUser(data)}>
              删除
            </Button>
          </div>
        );
      }
    }
  ];

  delUser = data => {
    return () => {
      console.log(data);
      Modal.confirm({
        title: `您确定要删除用户${data.username}吗？`,
        onOk: () => {
          reqDelUser(data.username);
          reqGetUsers().then(res => {
            this.setState({
              users: res
            });
          });
        }
      });
    };
  };
  updateUserPassword = data => {
    return () => {
      this.setState({
        data: data,
        updatePasswordVisible: true
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
        let result = null;
        try {
          let { username, password, phone, email, roleId } = values;
          if (!phone || !email) {
            phone = "";
            email = "";
          }
          result = await reqAddUser({
            username,
            password,
            phone,
            email,
            roleId
          });
          console.log(result);
          message.success("添加用户成功");
          this.addUserForm.props.form.resetFields();
          this.setState({
            users: [...this.state.users, result]
          });
          this.setState({
            addUserVisible: false
          });
        } catch {
          this.addUserForm.props.form.resetFields(["username"]);
        }
      }
    });
  };
  hidden = name => {
    return () => {
      this.setState({
        [name + "Visible"]: false
      });
    };
  };
  updatePassword = () => {
    this.updatePasswordForm.props.form.validateFields(async (err, values) => {
      if (!err) {
        const { password } = values;
        const { username } = this.state.data;
        const result = await this.props.updatePasswordAsync(username, password);
        console.log(result);
        message.success("修改密码成功");
        this.updatePasswordForm.props.form.resetFields();
        this.setState({
          updatePasswordVisible: false
        });
      }
      this.updatePasswordForm.props.form.resetFields();
    });
  };
  render() {
    const { users, addUserVisible, updatePasswordVisible } = this.state;
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
          onCancel={this.hidden("addUser")}
          width={500}
        >
          <AddUserForm
            wrappedComponentRef={form => (this.addUserForm = form)}
            roles={roles}
          />
        </Modal>
        <Modal
          title="修改密码"
          visible={updatePasswordVisible}
          onOk={this.updatePassword}
          onCancel={this.hidden("updatePassword")}
          width={500}
        >
          <UpdatePasswordForm
            wrappedComponentRef={form => (this.updatePasswordForm = form)}
          />
        </Modal>
      </Card>
    );
  }
}
export default User;
