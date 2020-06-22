import React, { Component } from 'react'
import { Breadcrumb, Card, Avatar, Tag, Row, Col, Typography } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import ReactHtmlParser from 'react-html-parser'
import API from 'utils/API'

const { Meta } = Card
const { Title } = Typography

export default class Place extends Component {
  constructor() {
    super()
    this.state = {
      user: null,
      posts: null
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
    this.setState({ token: token, user: user.data, posts: postsData.data })
  }

  render() {
    const { user, posts } = this.state

    return (
      <div>
        <Breadcrumb separator=">" style={{ margin: '16px 0px', fontSize: 20 }}>
          <Breadcrumb.Item><Link to='/'>Home</Link></Breadcrumb.Item>
          <Breadcrumb.Item>My Profile</Breadcrumb.Item>
        </Breadcrumb>
        <Card>
          <Meta
            avatar={<Avatar shape='square' size={100} src={user && user.avatar_url}/>}
            title={<Title>{user && user.username}</Title>}
            description={<div>
              <Tag color="red">{user && user.email}</Tag>
            </div>}
          />
        </Card>
        <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
          {posts && posts.map((p) => (
            <Col className="gutter-row" key={p.id} span={24}>
              <Link to={`/place/${p.placeId}/post/${p.id}`}>
                <Card hoverable>
                  <Meta
                    avatar={<Avatar size='large' src={user && user.avatar_url}/>}
                    title={user.username}
                    description={<div style={{ position: 'relative', maxHeight: 200, overflow: 'auto' }}>
                      {ReactHtmlParser(p.content)}
                    </div>}
                  />
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </div>
    )
  }
}
