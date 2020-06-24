import React, { Component } from 'react'
import { Modal, Select, Avatar, Rate } from 'antd'
import ReactQuill from 'react-quill'
import API from 'utils/API'

const { Option } = Select

export default class CreateNewPost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: props.showPostModal,
      content: '',
      placeId: null,
      places: null,
      valueSearch: undefined,
      rate: 5
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      showModal: nextProps.showPostModal,
      rate: 5,
      content: '',
      placeId: null,
      valueSearch: undefined
    })
  }

  async componentDidMount() {
    let data = await API.get('/places')
    this.setState({ places: data.data })
  }

  handleCancel() {
    this.setState({
      content: '',
      showModal: false,
      placeId: null,
      rate: null,
      valueSearch: undefined
    })
  }

  render() {
    const { handleSubmit } = this.props
    const { content, showModal, placeId, places, valueSearch, rate } = this.state
    const placesOption = places && places.map((p) => <Option key={p.id} value={p.name}>
      <Avatar size={18} src={p.image_url}></Avatar><span className="option">{p.name}</span>
    </Option>)

    return (
      <div>
        <Modal
          title='Create New Post'
          visible={showModal}
          onOk={() => {
            handleSubmit(placeId, rate, content)
            this.setState({ showModal: false })
          }}
          onCancel={this.handleCancel.bind(this)}
        >
          <Select
            showSearch
            placeholder='Choose a place'
            value={valueSearch}
            filterOption={(input, option) =>
              option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            className="select"
            onChange={(value, option) => this.setState({ valueSearch: value, placeId: option.key })}
          >
            {placesOption}
          </Select>
          <Rate allowHalf defaultValue={5} value={rate} onChange={(value) => this.setState({ rate: value })} />
          <ReactQuill theme="snow" value={content} onChange={(value) => this.setState({ content: value })} />
        </Modal>
      </div>
    )
  }
}
