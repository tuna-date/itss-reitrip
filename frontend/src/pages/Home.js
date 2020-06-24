import React, { Component } from 'react'
import API from 'utils/API'
import { Card, Row, Col, Rate, Breadcrumb, Input, Tooltip } from 'antd'
import { Link } from 'react-router-dom'
import { withTranslation } from 'react-i18next';

const { Meta } = Card
const { Search } = Input;

class Home extends Component {
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
      let placesFilter = fullPlaces.filter((p) => p.name.toLowerCase().includes(value.toLowerCase()))
      this.setState({ places: placesFilter })
    } else {
      this.setState({ places: fullPlaces })
    }
  }

  render() {
    const { places } = this.state
    const { t } = this.props
    const lists = places && places.map((p) => <Col className="gutter-row list_center" key={p.id} xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} xl={{ span: 6 }}>
      <Link to={`/place/${p.id}`}>
        <Card
          hoverable
          className="card"
          span={6}
          cover={
            <img alt='example' className="image" src={p.image_url} />
          }
        >
          <Meta
            title={<Tooltip title={p.name}>{p.name}</Tooltip>}
            description={<Tooltip title={p.services}><div className="ellipsis">{p.services}</div></Tooltip>}
          />
          <div>{t("location")}: {<Tooltip title={p.location}><span className="ellipsis">{p.location}</span></Tooltip>}</div>
          <div>
            <Rate allowHalf disabled value={p.averageRate} />
          </div>
        </Card>
      </Link>
    </Col>)

    return (
      <div>
        <Breadcrumb separator=">" className="breadcrumb">
          <Breadcrumb.Item><Link to='/'>{t("home")}</Link></Breadcrumb.Item>
        </Breadcrumb>
        <Search
          placeholder={t("enter")}
          enterButton={t("search")}
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

export default withTranslation()(Home)