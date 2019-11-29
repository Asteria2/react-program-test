import React, { Component } from "react";
import { Card, Button, Table, Radio, Modal, message } from "antd";
import "./role.less";
import dateFormat from "../../utils/dateFormat";
import AddRoleForm from "./addRoleForm/AddRoleForm";
import {
  getRolesAsync,
  addRoleAsync,
  delRoleAsync
} from "../../redux/action-creators/role";
import { connect } from "react-redux";
import SetControlForm from "./setControl/SetControlForm";

@connect(state => ({ roles: state.roles }), {
  getRolesAsync,
  addRoleAsync,
  delRoleAsync
})
class Role extends Component {
  state = {
    value: "",
    addRoleVisible: false,
    setControlVisible: false,
    isDisabled: true
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
        return time && dateFormat(time);
      }
    },
    {
      title: "授权人",
      dataIndex: "authName"
    }
  ];
  onRadioChange = e => {
    console.log(e.target.value);
    this.setState({
      isDisabled: false,
      value: e.target.value
    });
  };
  showAddRole = () => {
    this.setState({
      addRoleVisible: true
    });
  };
  showDelRole = () => {
    this.setState({
      delRoleVisible: true
    });
  };
  showSetControl = () => {
    this.setState({
      setControlVisible: true
    });
  };
  addRole = () => {
    this.addRoleForm.props.form.validateFields((err, values) => {
      if (!err) {
        const { roleName } = values;
        this.props.addRoleAsync(roleName);
        message.success("添加角色成功");
        this.addRoleForm.props.form.resetFields();
      }
      this.setState({
        addRoleVisible: false
      });
    });
  };
  delRole = () => {
    const { value } = this.state;
    const role = this.props.roles.find(role => role._id === value);
    console.log(role);
    Modal.confirm({
      title: `您确定要删除${role.name}角色吗？`,
      onOk: () => {
        this.props.delRoleAsync(role._id);
        
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

  setControl = () => {
    this.setState({
      setControlVisible: false
    });
  };
  componentDidMount() {
    if (!this.props.roles.length) {
      this.props.getRolesAsync();
    }
  }

  render() {
    const { value, addRoleVisible, setControlVisible, isDisabled } = this.state;
    const { roles } = this.props;
    const role = roles.find(role => role._id === value);
    return (
      <Card
        title={
          <div>
            <Button type="primary" onClick={this.showAddRole}>
              创建角色
            </Button>

            <Button
              type="primary"
              className="controlBtn"
              onClick={this.delRole}
              disabled={isDisabled}
            >
              删除角色
            </Button>
            <Button
              type="primary"
              onClick={this.showSetControl}
              disabled={isDisabled}
            >
              设置角色权限
            </Button>
          </div>
        }
      >
        <Radio.Group
          onChange={this.onRadioChange}
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
          onCancel={this.hidden("addRole")}
          width={300}
        >
          <AddRoleForm
            wrappedComponentRef={form => (this.addRoleForm = form)}
          />
        </Modal>
        <Modal
          title="设置角色权限"
          visible={setControlVisible}
          onOk={this.setControl}
          onCancel={this.hidden("setControl")}
          width={600}
        >
          <SetControlForm
            wrappedComponentRef={form => (this.setControlForm = form)}
            role={role}
          />
        </Modal>
      </Card>
    );
  }
}
export default Role;
