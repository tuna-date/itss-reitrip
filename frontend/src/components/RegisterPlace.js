import React, { Component } from 'react'
import { Modal, Form, Input, Upload, message } from 'antd'
import { withTranslation } from 'react-i18next';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { storage } from '../utils/firebase';

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

  getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }

  firebaseUpload = async ({ onError, onSuccess, file }) => {
    try {
      const uploadedImage = await storage.ref(`images/${file.name}`).put(file);
      storage
          .ref("images")
          .child(file.name)
          .getDownloadURL()
          .then(url => {
            this.setState({imageUrl: url});
          });
      onSuccess(null, uploadedImage);
    } catch (err) {
      onError(err)
    }
  };

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      showModal: nextProps.showModal,
    })
  }

  render() {
    const { handleSubmit, t } = this.props
    const { name, services, location, imageUrl, showModal } = this.state
    const uploadButton = (
      <div>
        {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">Upload</div>
      </div>
    );

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
          </Form>
          <div>
            <div>{t("uploadImage")}</div>
            <Upload
              name="avatar"
              listType="picture-card"
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              customRequest={this.firebaseUpload}
              className="avatar-uploader"
              showUploadList={false}
              beforeUpload={this.beforeUpload}
              onChange={this.handleChange}
            >
              {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
          </div>
        </Modal>
      </div>
    )
  }
}

export default withTranslation()(RegisterPlace)