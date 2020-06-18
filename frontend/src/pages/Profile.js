import React, { Component } from 'react'
import { Breadcrumb, Card, Avatar, Tag, Row, Col, Typography } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
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
      <div style={{ minHeight: 600, minWidth: 1000 }}>
        <Breadcrumb separator=">" style={{ margin: '16px 0px', fontSize: 20 }}>
          <Breadcrumb.Item><Link to='/'>Home</Link></Breadcrumb.Item>
          <Breadcrumb.Item>My Profile</Breadcrumb.Item>
        </Breadcrumb>
        <Card>
          <Meta
            avatar={<Avatar shape='square' size={100} src="https://static1.squarespace.com/static/54b7b93ce4b0a3e130d5d232/54e20ebce4b014cdbc3fd71b/5a992947e2c48320418ae5e0/1519987239570/icon.png" />}
            title={<Title>{user && user.username}</Title>}
            description={<div>
              <Tag color="red">{user && user.email}</Tag>
              {/* <div>Location: {place && place.location}</div>
              <div>
                <Rate allowHalf disabled value={place && place.averageRate} />
              </div> */}
            </div>}
          />
        </Card>
        <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
          {posts && posts.map((p) => (
            <Col className="gutter-row" key={p.id} span={24}>
              {/* <Link to={`/place/${place.id}/post/${p.id}`}> */}
              <Card hoverable>
                <Meta
                  avatar={<Avatar size='large' icon={<UserOutlined />} />}
                  title={user.username}
                  description={p.content}
                />
              </Card>
              {/* </Link> */}
            </Col>
          ))}
        </Row>
      </div>
    )
  }
}
