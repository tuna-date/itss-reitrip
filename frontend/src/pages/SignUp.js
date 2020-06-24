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
      if (data)
        window.location.href = '/signin'
    } catch (err) {
      console.log('LOI CMNR');
    }
  }

  render() {
    const { username, email, password, confirmPassword, error } = this.state
    return (
      <div className="container">
        <Form onFinish={this.handleSubmit} className="login-form">
          <FormItem className="center">
            <Title>REITRIP</Title>
          </FormItem>

          <FormItem
            name="username"
            rules={[{ required: true, message: 'Please input your username' }]}
          >
            <Input
              prefix={
                <UserOutlined
                  className="logo"
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
                  className="logo"
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
                  className="logo"
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
                  className="logo"
                />}
              placeholder="Confirm password"
              value={confirmPassword}
            />
          </FormItem>

          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              className="filled"
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
