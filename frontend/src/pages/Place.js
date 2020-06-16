import React, { Component } from 'react'
import { Breadcrumb, Card, Avatar, Rate, Row, Col } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
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
    let posts = await API.get(`/places/${params.id}/posts`)
    if (posts.data && places.data) {
      posts.data.map(async (p) => {
        let user = await API.get(`/users/${p.userId}`)
        p.realuser = user.data
      })
      this.setState({ place: places.data, posts: posts.data })
    }
  }

  renderPostsList(posts) {
    // posts[0].realuser = "a"
    // let user = await API.get(`/users/${p.userId}`)
    // console.log(Object.keys(posts[0]));

    // return posts.map((p) => (
    // <Col className="gutter-row" key={p.id} span={6}>
    //   <Card>
    //     <Meta
    //       avatar={<Avatar size='large' icon={<UserOutlined />} />}
    //       title={p.user}
    //       description={p.content}
    //     />
    //   </Card>
    // </Col>
    // ))
    return posts.map((p) => {
      let user = API.get(`/users/${p.userId}`)
      p['realuser'] = user.data
      return p
    })
  }

  render() {
    const { place, posts } = this.state
    console.log(posts && this.renderPostsList(posts));
    
    return (
      <div style={{ minHeight: 380, minWidth: 1000 }}>
        <Breadcrumb separator=">" style={{ margin: '16px 0px', fontSize: 20 }}>
          <Breadcrumb.Item><Link to='/'>Home</Link></Breadcrumb.Item>
          <Breadcrumb.Item>Place</Breadcrumb.Item>
        </Breadcrumb>
        <Card>
          <Meta
            avatar={<Avatar shape='square' size={100} src="https://res-4.cloudinary.com/enchanting/images/w_1600,h_700,c_fill,f_auto/et-web/2015/05/Enchanting-Travels-Vietnam-Tours-Nha-Trang-Hotels-Evason-Ana-Mandara-Nha-Trang-Hotel-in-Vietnam-Nha-Trang-beach-bbq/vietnam8217s-heritage-cities-and-beach-tour-trip-1.jpg" />}
            title={place && place.name}
            description={<div>
              <div>{place && place.services}</div>
              <div>Location: {place && place.location}</div>
              <div>
                <Rate allowHalf disabled value={place && place.averageRate} />
              </div>
            </div>}
          />
        </Card>
        <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
          {posts && this.renderPostsList(posts).map((p) => (
            <Col className="gutter-row" key={p.id} span={6}>
              <Card>
                <Meta
                  avatar={<Avatar size='large' icon={<UserOutlined />} />}
                  // title={p.realuser.username}
                  description={p.content}
                />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    )
  }
}
