import React, { Component } from 'react'
import { Form, Input, Button, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons'
import API from 'utils/API'

const { Title } = Typography;
const FormItem = Form.Item
export default class SignUp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: null,
      email: null,
      password: null,
      confirmPassword: null,
      error: null,
    }
  }

  async handleSubmit(values) {

    try {
      if (values.password !== values.confirmPassword) throw new Error('Password not match');

      let data = await API.post('/auth/register', {
        username: values.username,
        email: values.email,
        password: values.password
      })

      window.location.href = '/signin'
    } catch (err) {
      console.log('LOI CMNR');
    }
  }

  render() {
    const { username, email, password, confirmPassword, error } = this.state
    return (
      <div style={{ margin: '8em 20em 0 20em' }}>
        <Form onFinish={this.handleSubmit} className="login-form">
          <FormItem style={{ textAlign: 'center' }}>
            <Title>REITRIP</Title>
          </FormItem>

          <FormItem style={{ textAlign: 'center' }}>
            <span>{error}</span>
          </FormItem>

          <FormItem
            name="username"
            rules={[{ required: true, message: 'Please input your username' }]}
          >
            <Input
              prefix={
                <UserOutlined
                  style={{ color: 'rgba(0,0,0,.25)' }}
                />}
              placeholder="Username"
              value={username}
            />
          </FormItem>
          <FormItem
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input
              prefix={
                <MailOutlined
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
          <FormItem
            name="confirmPassword"
            rules={[{ required: true, message: 'Please confirm your password!' }]}
          >
            <Input.Password
              prefix={
                <LockOutlined
                  style={{ color: 'rgba(0,0,0,.25)' }}
                />}
              placeholder="Confirm password"
              value={confirmPassword}
            />
          </FormItem>

          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: '100%' }}
            >
              Register
            </Button>
            Or back to <Link to='/signin'>Login</Link>
          </FormItem>
        </Form>
      </div>
    )
  }
}
