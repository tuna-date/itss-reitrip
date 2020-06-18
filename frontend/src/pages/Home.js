import React, { Component } from 'react'
import API from 'utils/API'
import { Card, Row, Col, Rate, Breadcrumb, Input } from 'antd'
import { Link } from 'react-router-dom'

const { Meta } = Card
const { Search } = Input;

export default class Home extends Component {
  constructor() {
    super()
    this.state = {
      places: null,
      fullPlaces: null
    }
  }

  async componentDidMount() {
    let data = await API.get('/places')
    this.setState({ places: data.data, fullPlaces: data.data })
  }

  handleSearch(value) {
    const { fullPlaces } = this.state
    if (value !== '') {
      let placesFilter = fullPlaces.filter((p) => p.name.includes(value))
      this.setState({ places: placesFilter })
    } else {
      this.setState({ places: fullPlaces })
    }
  }

  render() {
    const { places } = this.state
    const lists = places && places.map((p) => <Col className="gutter-row" key={p.id} span={6} style={{ textAlign: '-webkit-center' }}>
      <Link to={`/place/${p.id}`}>
        <Card
          hoverable
          style={{ width: 240, marginTop: 10 }}
          span={6}
          cover={
            <img alt='example' src={
              "https://res-4.cloudinary.com/enchanting/images/w_1600,h_700,c_fill,f_auto/et-web/2015/05/Enchanting-Travels-Vietnam-Tours-Nha-Trang-Hotels-Evason-Ana-Mandara-Nha-Trang-Hotel-in-Vietnam-Nha-Trang-beach-bbq/vietnam8217s-heritage-cities-and-beach-tour-trip-1.jpg"
            } />
          }
        >
          <Meta
            title={p.name}
            description={p.services}
          />
          <div>Location: {p.location}</div>
          <div>
            <Rate allowHalf disabled value={p.averageRate} />
          </div>
        </Card>
      </Link>
    </Col>)

    return (
      <div style={{ height: "100vh" }}>
        <Breadcrumb separator=">" style={{ margin: '16px 0px', fontSize: 20 }}>
          <Breadcrumb.Item><Link to='/'>Home</Link></Breadcrumb.Item>
        </Breadcrumb>
        <Search
          placeholder="Enter Place name"
          enterButton="Search"
          size="large"
          onSearch={value => this.handleSearch(value)}
        />
        <Row gutter={[16, 16]}>
          {lists}
        </Row>
      </div>
    )
  }
}
