import React, { Component } from 'react'
import { Menu } from 'antd'

export default class NavBar extends Component {
  render() {
    return (
      <div>
        <div style={{ width: 120, height: 31, background: 'rgba(255, 255, 255, 0.2)', margin: '16px 24px 16px 0', float: 'left', color: 'white' }} />
        <Menu theme="dark" mode="horizontal">
          <Menu.Item>
            Home
          </Menu.Item>
          <Menu.Item>
            About
          </Menu.Item>
          <Menu.Item style={{ float: 'right' }}>
            Sign In
          </Menu.Item>
        </Menu>
      </div>
    )
  }
}
