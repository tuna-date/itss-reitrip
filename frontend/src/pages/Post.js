import React, { Component } from 'react'
import { Breadcrumb, Card, Row, Col, Button, Form, Input } from 'antd'
import { LikeOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import ReactHtmlParser from 'react-html-parser'
import API from 'utils/API'

const { Meta } = Card

export default class Post extends Component {
  constructor() {
    super()
    this.state = {
      place: null,
      post: null,
      post_owner: null,
      comments: null
    }
  }

  async componentDidMount() {
    const { match: { params } } = this.props
    let places = await API.get(`/places/${params.id}`)

    let postDetail = await API.get(`/places/${params.id}/posts/${params.postid}`)
    let post_owner = await API.get(`users/${postDetail.data.user_id}`)
    let commentsData = await API.get(`/places/${params.id}/posts/${params.postid}/comments`)
    for (let i = 0; i < commentsData.data.length; i++) {
      let user = await API.get(`/users/${commentsData.data[i].userId}`)
      commentsData.data[i].user = user.data
    }
    let token = localStorage.getItem('token')
    this.setState({ place: places.data, post: postDetail.data, post_owner: post_owner.data, comments: commentsData.data, token: token })
  }

  upVote() {

  }

  async handleComment(values) {
    const { comments, place, post } = this.state
    let token = localStorage.getItem('token')

    let commentData = await API.post(`/places/${place.id}/posts/${post.id}/comments`, {
      content: values.comment
    }, {
      headers: {
        Authorization: token
      }
    })
    let commentUser = await API.get(`/users/${commentData.data.userId}`)
    commentData.data.user = commentUser.data
    comments.push(commentData.data)
    this.setState({ comments: comments })
  }

  render() {
    const { place, post, post_owner, comments, token } = this.state
    const { match: { params } } = this.props

    return (
      <div>
        <Breadcrumb separator=">" style={{ margin: '16px 0px', fontSize: 20 }}>
          <Breadcrumb.Item><Link to='/'>Home</Link></Breadcrumb.Item>
          <Breadcrumb.Item><Link to={`/place/${params.id}`}>{place && place.name}</Link></Breadcrumb.Item>
        </Breadcrumb>
        <h2>Post</h2>
        <Row className="show-grid" style={{ background: '#f8f3f3', padding: '10px' }}>
          <Col xs={6} md={8} className="gutter-row">
            <h3 style={{ color: '#1890ff' }}>{post_owner && post_owner.username}</h3>
            <i>{post && post.created_at}</i>
            <div>
              { post && ReactHtmlParser(post.content)}
            </div>
            <Button variant="contained" color="primary" className="float-right" onClick={this.upVote}>
              <LikeOutlined />
            </Button>
          </Col>
        </Row>

        <h3 style={{ marginTop: 16 }} >Comments</h3>
        <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
          {comments && comments.map((p) => (
            <Col className="gutter-row" key={p.id} span={12}>
              <Card hoverable>
                <i>{p.created_at}</i>

                <Meta
                  title={p.user.username}
                  description={p.content}
                />
              </Card>
            </Col>
          ))}
        </Row>
        {token ?
          <Form onFinish={this.handleComment.bind(this)}>
            <Form.Item name="comment">
              <Input allowClear />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Comment
            </Button>
          </Form>
          : <div>You Must Login to Comment</div>
        }
      </div>
    )
  }
}
