import React, { Component } from 'react'
import { Modal, Form, Input } from 'antd'
import { withTranslation } from 'react-i18next';

class EditProfile extends Component {
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
    const { handleSubmit, t } = this.props
    const { username, avatar_url, showModal } = this.state

    return (
      <div>
        <Modal
          title={t("editProfile")}
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
              rules={[{ required: true, message: `${t("userName")}` }]}
            >
              <Input placeholder={t("name")} onChange={(e) => this.setState({ username: e.target.value })} />
            </Form.Item>
            <Form.Item
              name="avatar_url"
              rules={[{ required: true, message: `${t("url")}` }]}
            >
              <Input placeholder={t("avatarUrl")} onChange={(e) => this.setState({ avatar_url: e.target.value })} />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}

export default withTranslation()(EditProfile)
