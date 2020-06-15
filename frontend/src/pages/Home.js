import React, { Component } from 'react'
import API from 'utils/API'
import { Card, Row, Col, Rate, Skeleton } from 'antd'

const { Meta } = Card

export default class Home extends Component {
  constructor() {
    super()
    this.state = {
      data: null
    }
  }

  async componentDidMount() {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTkyMjAwNDk1LCJleHAiOjE1OTIyODY4OTV9.CDZlrS4zMBIukeOVQP6bT-w2_GTjB0K4v4r6cvGPjd4'
    let data = await API.get('/places', {
      headers: {
        Authorization: token
      }
    })
    this.setState({ data: data.data })
  }

  render() {
    const { data } = this.state
    console.log(data);
    const lists = [<Col className="gutter-row" span={6}>
      <Card
        hoverable
        style={{ width: 240, marginTop: 10 }}
        span={6}
        cover={
          <img alt="example" src={
            data && "https://hasura.io/blog/content/images/2019/08/Screen-Shot-2019-08-27-at-8.21.35.png"
          } />
        }
      >
        <Meta
          title={data && data[0].name}
          description={data && data[0].services}
        />
        <div>Location: {data && data[0].location}</div>
        <div>
          <Rate allowHalf disabled value={data && data[0].averageRate} />
        </div>
      </Card>
    </Col>]

    return (
      <div style={{ marginTop: 64 }}>
        <Row gutter={16}>
          {lists.concat(lists.concat(lists.concat(lists)))}
        </Row>
      </div>
    )
  }
}
