import React, { Component } from 'react'
import { Modal, Form, Input } from 'antd'

export default class EditProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: props.username,
      avatar_url: props.avatar_url,
      showModal: props.showProfileModal
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      showModal: nextProps.showModal,
      username: nextProps.username,
      avatar_url: nextProps.avatar_url
    })
  }

  handleCancel() {
    this.setState({ showModal: false })
  }

  render() {
    const { handleSubmit } = this.props
    const { username, avatar_url, showModal } = this.state
    
    return (
      <div>
        <Modal
          title="EDIT PROFILE"
          visible={showModal}
          onOk={() => {
            handleSubmit(username, avatar_url)
            this.setState({ showModal: false })
          }}
          onCancel={this.handleCancel.bind(this)}
        >
          <Form
            initialValues={{
              username: username,
              avatar_url: avatar_url
            }}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input username!' }]}
            >
              <Input placeholder="Name" onChange={(e) => this.setState({ username: e.target.value })} />
            </Form.Item>
            <Form.Item
              name="avatar_url"
              rules={[{ required: true, message: 'Please input Url!' }]}
            >
              <Input placeholder="Avatar URL" onChange={(e) => this.setState({ avatar_url: e.target.value })} />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}
