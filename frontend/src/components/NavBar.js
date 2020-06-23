import React, { Component } from 'react'
import { Menu, Button, notification, Radio } from 'antd'
import { Link } from 'react-router-dom'
import RegisterPlace from 'components/RegisterPlace'
import CreateNewPost from 'components/CreateNewPost'
import API from 'utils/API'

export default class NavBar extends Component {
  constructor() {
    super()
    this.state = {
      token: null,
      user: null,
      showModal: false,
      showPostModal: false
    }
  }

  async componentDidMount() {
    let token = localStorage.getItem('token')
    if (token) {
      let user = await API.get('/auth/currentUser', {
        headers: {
          Authorization: token
        }
      })
      this.setState({ token: token, user: user.data })
    }
  }

  handleShowModal() {
    this.setState({ showModal: true, showPostModal: false })
  }

  handleShowPostModal() {
    this.setState({ showPostModal: true, showModal: false })
  }
  
  async handleSubmit(name, services, location, imageUrl) {    
    let token = localStorage.getItem('token')    
    let data = await API.post('/places', {
      name: name,
      location: location,
      services: services,
      image_url: imageUrl
    }, {
      headers: {
        Authorization: token
      }
    })
    
    if(data.data) {
      notification.success({
        message: 'SUCCESS',
        description: `${data.data.name} is now on pending, waitign for ADMIN to approve`
      })
    } else {
      notification.error({
        message: 'ERROR',
        description: `SERVER DOWN`
      })
    }
  }

  async handleSubmitPost(placeId, rateScore, content) {    
    let token = localStorage.getItem('token')    
    let postsData = await API.post(`/places/${placeId}/posts`, {
      content: content,
      rate_score: rateScore
    }, {
      headers: {
        Authorization: token
      }
    })
    
    if(postsData.data) {
      notification.success({
        message: 'SUCCESS',
        description: `POST CREATED, RATED ${postsData.data.rate_score} stars`
      })
    } else {
      notification.error({
        message: 'ERROR',
        description: `SERVER DOWN`
      })
    }

    // let rateScoreData = await API.post(`/places/${placeId}/rate`, {
    //   rate_score: rateScore
    // }, {
    //   headers: {
    //     Authorization: token
    //   }
    // })

    // if(rateScoreData.data) {
    //   notification.success({
    //     message: 'SUCCESS',
    //     description: `RATED ${rateScoreData.data.rate_score} stars`
    //   })
    // } else {
    //   notification.error({
    //     message: 'ERROR',
    //     description: `SERVER DOWN`
    //   })
    // }
  }


  logout() {
    localStorage.removeItem('token')
    this.setState({ token: null, user: null })
    window.location.href = '/'
  }

  render() {
    const { token, user, showModal, showPostModal } = this.state

    return (
      <div>
        <div style={{ width: 120, height: 31, background: 'rgba(255, 255, 255, 0.2)', margin: '16px 24px 16px 0', float: 'left', color: 'white' }} />
        <Menu theme="dark" mode="horizontal">
          <Menu.Item>
            <Link to='/'>
              Home
            </Link>
          </Menu.Item>
          <Menu.Item onClick={this.handleShowModal.bind(this)}>
            {token ? <span>Register new Place</span> : ''}
          </Menu.Item>
          <Menu.Item onClick={this.handleShowPostModal.bind(this)}>
            {token ? <span>CreateNewPost</span> : ''}
          </Menu.Item>
          <Menu.Item
            style={{ float: 'right' }}
          >
            {token ?
              <Button type='danger' onClick={() => this.logout()}>
                Log Out
              </Button>
              : ''}
          </Menu.Item>
          <Menu.Item style={{ float: 'right' }}>
            {token ?
              <Link to='/myprofile'>
                {user.username}
              </Link> : ''}
          </Menu.Item>
          <Menu.Item style={{ float: 'right' }}>
            {token ? '' : <Link to='/signin'> Sign In </Link>}
          </Menu.Item>
        </Menu>
        <RegisterPlace showModal={showModal} handleSubmit={this.handleSubmit}/>
        <CreateNewPost showPostModal={showPostModal} handleSubmit={this.handleSubmitPost}/>
      </div>
    )
  }
}
