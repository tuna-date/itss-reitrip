import React, { Component } from 'react'
import { Modal, Form, Input } from 'antd'
import { withTranslation } from 'react-i18next';

class RegisterPlace extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      services: '',
      location: '',
      imageUrl: '',
      showModal: props.showModal
    }
  }

  handleCancel() {
    this.setState({
      name: '',
      services: '',
      location: '',
      imageUrl: '',
      showModal: false
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      showModal: nextProps.showModal,
    })
  }

  render() {
    const { handleSubmit, t } = this.props
    const { name, services, location, imageUrl, showModal } = this.state

    return (
      <div>
        <Modal
          title={t("register")}
          visible={showModal}
          onOk={() => {
            handleSubmit(name, services, location, imageUrl, t)
            this.setState({ showModal: false })
          }}
          onCancel={this.handleCancel.bind(this)}
        >
          <Form>
            <Form.Item
              name="name"
              rules={[{ required: true, message: `${t("placeName")}` }]}
            >
              <Input placeholder={t("name")} onChange={(e) => this.setState({ name: e.target.value })} />
            </Form.Item>
            <Form.Item
              name="service"
              rules={[{ required: true, message: `${t("placeService")}` }]}
            >
              <Input placeholder={t("service")} onChange={(e) => this.setState({ services: e.target.value })} />
            </Form.Item>
            <Form.Item
              name="location"
              rules={[{ required: true, message: `${t("placeLocation")}` }]}
            >
              <Input placeholder={t("location")} onChange={(e) => this.setState({ location: e.target.value })} />
            </Form.Item>
            <Form.Item
              name="imageUrl"
              rules={[{ required: true, message: `${t("placeImageUrl")}` }]}
            >
              <Input placeholder={t("imageUrl")} onChange={(e) => this.setState({ imageUrl: e.target.value })} />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}

export default withTranslation()(RegisterPlace)