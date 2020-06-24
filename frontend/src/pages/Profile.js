import React, { Component } from 'react'
import { Breadcrumb, Card, Avatar, Tag, Row, Col, Typography, notification } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import ReactHtmlParser from 'react-html-parser'
import API from 'utils/API'
import EditPost from 'components/EditPost'
import EditProfile from 'components/EditProfile'

const { Meta } = Card
const { Title } = Typography

export default class Place extends Component {
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
        message: 'SUCCESS',
        description: `UPDATED SUCCESSFULL`
      })
    } else {
      notification.error({
        message: 'ERROR',
        description: `SERVER DOWN`
      })
    }
    window.location.reload()
  }

  async handleDelete(id) {
    const { posts } = this.state
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
        message: 'SUCCESS',
        description: `${deleted.data.status} SUCCESSFULL`
      })
    } else {
      notification.error({
        message: 'ERROR',
        description: `SERVER DOWN`
      })
    }
    let newPosts = posts.filter((post) => post.id !== id)
    this.setState({ posts: newPosts })
  }

  render() {
    const { user, posts, showProfileModal } = this.state
    let token = localStorage.getItem('token')
    console.log(token);

    return (
      <div>
        <Breadcrumb separator=">" style={{ margin: '16px 0px', fontSize: 20 }}>
          <Breadcrumb.Item><Link to='/'>Home</Link></Breadcrumb.Item>
          <Breadcrumb.Item>My Profile</Breadcrumb.Item>
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
        <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
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
                    description={<div style={{ position: 'relative', maxHeight: 200, overflow: 'auto' }}>
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
          handleSubmit={this.handleEditProfile}
        />
      </div>
    )
  }
}
