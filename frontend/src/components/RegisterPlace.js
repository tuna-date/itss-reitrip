import React, { Component } from 'react'
import { Modal, Form, Input } from 'antd'

export default class RegisterPlace extends Component {
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
    const { handleSubmit } = this.props
    const { name, services, location, imageUrl, showModal } = this.state

    return (
      <div>
        <Modal
          title="Register new Place"
          visible={showModal}
          onOk={() => {
            handleSubmit(name, services, location, imageUrl)
            this.setState({ showModal: false })
          }}
          onCancel={this.handleCancel.bind(this)}
        >
          <Form>
            <Form.Item
              name="name"
              rules={[{ required: true, message: 'Please input place name!' }]}
            >
              <Input placeholder="Name" onChange={(e) => this.setState({ name: e.target.value })}/>
            </Form.Item>
            <Form.Item
              name="service"
              rules={[{ required: true, message: 'Please input place service!' }]}
            >
              <Input placeholder="Service" onChange={(e) => this.setState({ services: e.target.value })}/>
            </Form.Item>
            <Form.Item
              name="location"
              rules={[{ required: true, message: 'Please input place location!' }]}
            >
              <Input placeholder="Location" onChange={(e) => this.setState({ location: e.target.value })}/>
            </Form.Item>
            <Form.Item
              name="imageUrl"
              rules={[{ required: true, message: 'Please input place imageUrl!' }]}
            >
              <Input placeholder="ImageUrl" onChange={(e) => this.setState({ imageUrl: e.target.value })}/>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}
