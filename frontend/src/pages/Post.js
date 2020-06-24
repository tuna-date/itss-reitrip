import React, { Component } from 'react'
import { Breadcrumb, Card, Row, Col, Button, Form, Input, Rate } from 'antd'
import { Link } from 'react-router-dom'
import ReactHtmlParser from 'react-html-parser'
import API from 'utils/API'
import { withTranslation } from 'react-i18next';

const { Meta } = Card

class Post extends Component {
  constructor() {
    super()
    this.state = {
      place: null,
      post: null,
      post_owner: null,
      comments: null,
      rate_score: null
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
    let rate_score = localStorage.getItem(`${params.postid}`)
    this.setState({
      place: places.data,
      post: postDetail.data,
      post_owner: post_owner.data,
      comments: commentsData.data,
      token: token,
      rate_score: rate_score
    })

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
    const { place, post, post_owner, comments, token, rate_score } = this.state
    const { match: { params }, t } = this.props

    return (
      <div>
        <Breadcrumb separator=">" className="breadcrumb">
          <Breadcrumb.Item><Link to='/'>{t("home")}</Link></Breadcrumb.Item>
          <Breadcrumb.Item><Link to={`/place/${params.id}`}>{place && place.name}</Link></Breadcrumb.Item>
        </Breadcrumb>
        <h2>{t("post")}</h2>
        <Row className="show-grid post_content">
          <Col className="gutter-row">
            <h3 className="title_color">{post_owner && post_owner.username}</h3>
            <i>{post && post.created_at}</i>
            <div>
              {post && ReactHtmlParser(post.content)}
            </div>
            {rate_score
              ? <Rate allowHalf value={rate_score} disabled />
              : <Rate value={5} disabled />}
          </Col>
        </Row>

        <h3 className="comment" >{t("comments")}</h3>
        <Row gutter={[16, 16]} className="list">
          {comments && comments.map((p) => (
            <Col className="gutter-row" key={p.id} lg={{ span: 12 }} md={{ span: 24 }} sm={{ span: 24 }} xs={{ span: 24 }}>
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
              {t("comment")}
            </Button>
          </Form>
          : <div>{t("commentError")}</div>
        }
      </div>
    )
  }
}

export default withTranslation()(Post)
