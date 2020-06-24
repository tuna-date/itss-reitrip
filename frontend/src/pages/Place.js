import React, { Component } from 'react'
import { Breadcrumb, Card, Avatar, Rate, Row, Col, Tooltip } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import ReactHtmlParser from 'react-html-parser'
import API from 'utils/API'

const { Meta } = Card

export default class Place extends Component {
  constructor() {
    super()
    this.state = {
      place: null,
      posts: null
    }
  }

  async componentDidMount() {
    const { match: { params } } = this.props
    let places = await API.get(`/places/${params.id}`)
    let postsData = await API.get(`/places/${params.id}/posts`)
    for (let i = 0; i < postsData.data.length; i++) {
      let user = await API.get(`/users/${postsData.data[i].userId}`)
      postsData.data[i].user = user.data
    }
    this.setState({ place: places.data, posts: postsData.data })
  }

  render() {
    const { place, posts } = this.state

    return (
      <div>
        <Breadcrumb separator=">" className="breadcrumb">
          <Breadcrumb.Item><Link to='/'>Home</Link></Breadcrumb.Item>
          <Breadcrumb.Item>Place</Breadcrumb.Item>
        </Breadcrumb>
        <Card>
          <Meta
            avatar={<Avatar shape='square' size={100} src={place && place.image_url} />}
            title={<Tooltip title={place && place.name}>{place && place.name}</Tooltip>}
            description={<div>
              <div><Tooltip title={place && place.services}><div className="ellipsis">{place && place.services}</div></Tooltip></div>
              <div>Location: {<Tooltip title={place && place.location}><span className="ellipsis">{place && place.location}</span></Tooltip>}</div>
              <div>
                <Rate allowHalf disabled value={place && place.averageRate} />
              </div>
            </div>}
          />
        </Card>
        <Row gutter={[16, 16]} className="listpost">
          {posts && posts.map((p) => (
            <Col className="gutter-row" key={p.id} span={24}>
              <Link to={`/place/${place.id}/post/${p.id}`}>
                <Card hoverable>
                  <Meta
                    avatar={<Avatar size='large' icon={<UserOutlined />} />}
                    title={p.user.username}
                    description={<div className="meta">{ReactHtmlParser(p.content)}</div>}
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
