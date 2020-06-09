import React from 'react'
import { Menu } from 'antd'

export default function NavBar() {
  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item>
          Menu 1
        </Menu.Item>
        <Menu.Item>
          Menu 2
        </Menu.Item>
      </Menu>
    </div>
  )
}
