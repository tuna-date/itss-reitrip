import React, { Component } from 'react'
import { Menu, Button } from 'antd'
import { Link } from 'react-router-dom'
import API from 'utils/API'

export default class NavBar extends Component {
  constructor() {
    super()
    this.state = {
      token: null,
      user: null
    }
  }

  async componentDidMount() {
    let token = localStorage.getItem('token')
    // if (token) {
    let user = await API.get('/auth/currentUser', {
      headers: {
        Authorization: token
      }
    })
    this.setState({ token: token, user: user.data })
    // }
  }

  logout() {
    localStorage.removeItem('token')
    this.setState({ token: null, user: null })
  }

  render() {
    const { token, user } = this.state

    return (
      <div>
        <div style={{ width: 120, height: 31, background: 'rgba(255, 255, 255, 0.2)', margin: '16px 24px 16px 0', float: 'left', color: 'white' }} />
        <Menu theme="dark" mode="horizontal">
          <Menu.Item>
            <Link to='/' >
              Home
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to='/about' >
              About
            </Link>
          </Menu.Item>
          {token ? <>
            <Menu.Item
              style={{ float: 'right', marginLeft: 30 }}
            >
              <Button type='danger' onClick={() => this.logout()}>
                Log Out
              </Button>
            </Menu.Item>
            <Menu.Item style={{ float: 'right' }}>
              <Link to='/profile' >
                {user.username}
              </Link>
            </Menu.Item>
          </> :
            <Menu.Item style={{ float: 'right' }}>
              <Link to='/signin'>
                Sign In
              </Link>
            </Menu.Item>
          }
        </Menu>
      </div>
    )
  }
}
