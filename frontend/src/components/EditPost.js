import React, { Component } from 'react'
import { Modal, Rate, Input, notification } from 'antd'
import ReactQuill from 'react-quill'
import API from 'utils/API'
import { withTranslation } from 'react-i18next';

class EditPost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: props.showModal,
      content: props.content,
      placeId: props.placeId,
      postId: props.postId,
      place: null,
      rate: props.rate_score
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      showModal: nextProps.showModal,
      rate: nextProps.rate_score,
      content: nextProps.content,
      placeId: nextProps.placeId,
      postId: nextProps.postId
    })
  }

  async componentDidMount() {
    const { placeId } = this.state
    let place = await API.get(`/places/${placeId}`)
    this.setState({ place: place.data })
  }

  async handleSubmit(placeId, rate, content, postId) {
    const { t } = this.props
    let updatedPost = await API.put(`/places/${placeId}/posts`, {
      id: postId,
      content: content,
      rate_score: rate
    }, {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    })

    if (updatedPost.data) {
      notification.success({
        message: `${t("success")}`,
        description: `${t("updateSuccess")}`
      })
      localStorage.setItem(`${updatedPost.data.id}`, updatedPost.data.rate_score)
    } else {
      notification.error({
        message: `${t("error")}`,
        description: `${t("serverDown")}`
      })
    }
    window.location.reload()
  }

  handleCancel() {
    this.setState({ showModal: false })
  }

  render() {
    const { postId, t } = this.props
    const { content, showModal, placeId, place, rate } = this.state

    return (
      <div>
        <Modal
          title={t("edit")}
          visible={showModal}
          onOk={() => {
            this.handleSubmit(placeId, rate, content, postId)
            this.setState({ showModal: false })
          }}
          onCancel={this.handleCancel.bind(this)}
        >
          <Input disabled defaultValue={place && place.name} />
          <Rate allowHalf defaultValue={5} value={rate} onChange={(value) => this.setState({ rate: value })} />
          <ReactQuill theme="snow" value={content} onChange={(value) => this.setState({ content: value })} />
        </Modal>
      </div>
    )
  }
}

export default withTranslation()(EditPost)