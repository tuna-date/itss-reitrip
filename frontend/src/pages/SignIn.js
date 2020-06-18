import React, { Component } from 'react'
import { Form, Input, Button, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import API from 'utils/API'

const { Title } = Typography;
const FormItem = Form.Item

export default class SignIn extends Component {
  constructor() {
    super()
    this.state = {
      email: null,
      password: null
    }
  }

  async handleSubmit(values) {
    let data = await API.post('/auth/login', {
      email: values.email,
      password: values.password
    })
    console.log(data);

    await localStorage.setItem('token', data.data.token)
    if (localStorage.getItem('token')) window.location.href = '/'
  }

  render() {
    const { email, password } = this.state
    return (
      <div style={{ height: "100vh", margin: '8em 20em 0 20em' }}>
        <Form onFinish={this.handleSubmit} className="login-form">
          <FormItem style={{ textAlign: 'center' }}>
            <Title>REITRIP</Title>
          </FormItem>
          <FormItem
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input
              prefix={
                <UserOutlined
                  style={{ color: 'rgba(0,0,0,.25)' }}
                />}
              placeholder="Email"
              value={email}
            />
          </FormItem>
          <FormItem
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input.Password
              prefix={
                <LockOutlined
                  style={{ color: 'rgba(0,0,0,.25)' }}
                />}
              placeholder="Password"
              value={password}
            />
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: '100%' }}
            >
              Log in
            </Button>
            Or <Link to='/signup'>register now</Link>
          </FormItem>
        </Form>
      </div>
    )
  }
}

