import React, { Component } from 'react'
import { Menu, Button, notification, Tooltip, Select } from 'antd'
import { Link } from 'react-router-dom'
import RegisterPlace from 'components/RegisterPlace'
import CreateNewPost from 'components/CreateNewPost'
import API from 'utils/API'
import { withTranslation } from 'react-i18next';

const { Option } = Select

class NavBar extends Component {
  constructor() {
    super()
    this.state = {
      token: null,
      user: null,
      showModal: false,
      showPostModal: false
    }
  }

  async componentDidMount() {
    let token = localStorage.getItem('token')
    if (token) {
      let user = await API.get('/auth/currentUser', {
        headers: {
          Authorization: token
        }
      })
      this.setState({ token: token, user: user.data })
    }
  }

  handleShowModal() {
    this.setState({ showModal: true, showPostModal: false })
  }

  handleShowPostModal() {
    this.setState({ showPostModal: true, showModal: false })
  }

  async handleSubmit(name, services, location, imageUrl, t) {
    let token = localStorage.getItem('token')
    let data = await API.post('/places', {
      name: name,
      location: location,
      services: services,
      image_url: imageUrl
    }, {
      headers: {
        Authorization: token
      }
    })

    if (data.data) {
      notification.success({
        message: `${t("success")}`,
        description: `${data.data.name} ${t("onPending")}`
      })
    } else {
      notification.error({
        message: `${t("error")}`,
        description: `${t("serverDown")}`
      })
    }
  }

  async handleSubmitPost(placeId, rateScore, content, t) {
    let token = localStorage.getItem('token')
    let postsData = await API.post(`/places/${placeId}/posts`, {
      content: content,
      rate_score: rateScore
    }, {
      headers: {
        Authorization: token
      }
    })

    if (postsData.data) {
      notification.success({
        message: `${t("success")}`,
        description: `${t("created")} ${postsData.data.rate_score} ${t("stars")}`
      })
    } else {
      notification.error({
        message: `${t("error")}`,
        description: `${t("serverDown")}`
      })
    }
    localStorage.setItem(`${postsData.data.id}`, postsData.data.rate_score)
  }


  logout() {
    localStorage.removeItem('token')
    this.setState({ token: null, user: null })
    window.location.href = '/'
  }

  render() {
    const { token, user, showModal, showPostModal } = this.state
    const { t, i18n } = this.props
    return (
      <div>
        <div className="navbar_logo" />
        <Menu theme="dark" mode="horizontal">
          <Menu.Item>
            <Link to='/'>
              {t("home")}
            </Link>
          </Menu.Item>
          <Menu.Item className="navbar_max" onClick={this.handleShowModal.bind(this)}>
            {token ? <div className="ellipsis"><Tooltip title={t("register")}>{t("register")}</Tooltip></div> : ''}
          </Menu.Item>
          <Menu.Item className="navbar_max" onClick={this.handleShowPostModal.bind(this)}>
            {token ? <div className="ellipsis"><Tooltip title={t("create")}>{t("create")}</Tooltip></div> : ''}
          </Menu.Item>
          <div className="item" style={{ marginLeft: 5 }}>
            <Select defaultValue="jap" onChange={(value) => i18n.changeLanguage(value)}>
              <Option value="en" key="en">EN</Option>
              <Option value="jap" key="jap">JP</Option>
              <Option value="vie" key="jap">VN</Option>
            </Select>
          </div>
          <Menu.Item
            className="item"
          >
            {token ?
              <Button type='danger' onClick={() => this.logout()}>
                {t("logout")}
              </Button>
              : ''}
          </Menu.Item>
          <Menu.Item className="item">
            {token ?
              <Link to='/myprofile'>
                {user.username}
              </Link> : ''}
          </Menu.Item>
          <Menu.Item className="item">
            {token ? '' : <Link to='/signin'> {t("signin")} </Link>}
          </Menu.Item>
        </Menu>
        <RegisterPlace showModal={showModal} handleSubmit={this.handleSubmit} />
        <CreateNewPost showPostModal={showPostModal} handleSubmit={this.handleSubmitPost} />
      </div>
    )
  }
}

export default withTranslation()(NavBar)
