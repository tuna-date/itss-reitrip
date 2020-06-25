import React, { Component } from 'react'
import { Breadcrumb, Card, Avatar, Tag, Row, Col, Typography, notification } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import ReactHtmlParser from 'react-html-parser'
import API from 'utils/API'
import EditPost from 'components/EditPost'
import EditProfile from 'components/EditProfile'
import { withTranslation } from 'react-i18next';

const { Meta } = Card
const { Title } = Typography

class Profile extends Component {
  constructor() {
    super()
    this.state = {
      user: null,
      posts: null,
      showProfileModal: false
    }
  }

  async componentDidMount() {
    let token = localStorage.getItem('token')
    let user = await API.get('/auth/currentUser', {
      headers: {
        Authorization: token
      }
    })
    let postsData = await API.get('/places/1/currentUserPosts', {
      headers: {
        Authorization: token
      }
    })

    for (let i = 0; i < postsData.data.lenght; i++) {
      postsData.data[i].showPostModal = false
    }

    this.setState({
      token: token,
      user: user.data,
      posts: postsData.data,
      showPostModal: false,
      showProfileModal: false
    })
  }

  handleShowPostModal(index) {
    const { posts } = this.state
    posts[index].showPostModal = true
    posts.forEach((post, postIndex) => {
      if (postIndex === index) post.showPostModal = true
      else post.showPostModal = false
    })
    this.setState({ posts: posts, showProfileModal: false })
  }

  handleShowProfileModal() {
    const { posts } = this.state
    for (let i = 0; i < posts.length; i++) {
      posts[i].showPostModal = false
    }
    this.setState({ showProfileModal: true, posts: posts })
  }

  async handleEditProfile(username, avatar_url) {
    const { t } = this.props
    let token = localStorage.getItem('token')
    let user = await API.put('/users', {
      username: username,
      avatar_url: avatar_url
    }, {
      headers: {
        Authorization: token
      }
    })
    if (user.data) {
      notification.success({
        message: `${t("success")}`,
        description: `${t("updateSuccess")}`
      })
    } else {
      notification.error({
        message: `${t("error")}`,
        description: `${t("serverDown")}`
      })
    }
    window.location.reload()
  }

  async handleDelete(id) {
    const { posts } = this.state
    const { t } = this.props
    let token = localStorage.getItem('token')
    let deleted = await API.delete(`/places/3/posts`, {
      data: {
        id: id
      },
      headers: {
        Authorization: token
      }
    })
    if (deleted.data) {
      notification.success({
        message: `${t("success")}`,
        description: `${deleted.data.status} ${t("deleteSuccess")}`
      })
    } else {
      notification.error({
        message: `${t("error")}`,
        description: `${t("serverDown")}`
      })
    }
    let newPosts = posts.filter((post) => post.id !== id)
    this.setState({ posts: newPosts })
  }

  render() {
    const { user, posts, showProfileModal } = this.state
    const { t } = this.props

    return (
      <div>
        <Breadcrumb separator=">" className="breadcrumb">
          <Breadcrumb.Item><Link to='/'>{t("home")}</Link></Breadcrumb.Item>
          <Breadcrumb.Item>{t("profile")}</Breadcrumb.Item>
        </Breadcrumb>
        <Card actions={[<EditOutlined key="edit" onClick={this.handleShowProfileModal.bind(this)} />]}>
          <Meta
            avatar={<Avatar shape='square' size={100} src={user && user.avatar_url} />}
            title={<Title>{user && user.username}</Title>}
            description={<div>
              <Tag color="red">{user && user.email}</Tag>
            </div>}
          />
        </Card>
        <Row gutter={[16, 16]} className="listpost">
          {posts && posts.map((p, index) => (
            <Col className="gutter-row" key={p.id} span={24}>
              <Card
                hoverable
                actions={[
                  <EditOutlined key="edit" onClick={this.handleShowPostModal.bind(this, index)} />,
                  <DeleteOutlined key="delete" onClick={this.handleDelete.bind(this, p.id)} />
                ]}
              >
                <Link to={`/place/${p.placeId}/post/${p.id}`}>
                  <Meta
                    avatar={<Avatar size='large' src={user && user.avatar_url} />}
                    title={user.username}
                    description={<div className="meta">
                      {ReactHtmlParser(p.content)}
                    </div>}
                  />
                </Link>
              </Card>
              <EditPost
                showModal={p.showPostModal}
                content={p.content}
                placeId={p.placeId}
                postId={p.id}
                rate_score={localStorage.getItem(`${p.id}`) ?? 5}
              />
            </Col>
          ))}
        </Row>
        <EditProfile
          showModal={showProfileModal}
          username={user && user.username}
          avatar_url={user && user.avatar_url}
          handleSubmit={this.handleEditProfile.bind(this)}
        />
      </div>
    )
  }
}

export default withTranslation()(Profile)
