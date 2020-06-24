import React, { Component } from 'react'
import { Form, Input, Button, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons'
import API from 'utils/API'
import { withTranslation } from 'react-i18next';

const { Title } = Typography;
const FormItem = Form.Item
class SignUp extends Component {
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
    const { username, email, password, confirmPassword } = this.state
    const { t } = this.props
    return (
      <div className="container">
        <Form onFinish={this.handleSubmit} className="login-form">
          <FormItem className="center">
            <Title>REITRIP</Title>
          </FormItem>

          <FormItem
            name="username"
            rules={[{ required: true, message: `${t("userName")}` }]}
          >
            <Input
              prefix={
                <UserOutlined
                  className="logo"
                />}
              placeholder={t("name")}
              value={username}
            />
          </FormItem>
          <FormItem
            name="email"
            rules={[{ required: true, message: `${t("userEmail")}` }]}
          >
            <Input
              prefix={
                <MailOutlined
                  className="logo"
                />}
              placeholder={t("email")}
              value={email}
            />
          </FormItem>
          <FormItem
            name="password"
            rules={[{ required: true, message: `${t("userPassword")}` }]}
          >
            <Input.Password
              prefix={
                <LockOutlined
                  className="logo"
                />}
              placeholder={t("password")}
              value={password}
            />
          </FormItem>
          <FormItem
            name="confirmPassword"
            rules={[{ required: true, message: `${t("userConfirm")}` }]}
          >
            <Input.Password
              prefix={
                <LockOutlined
                  className="logo"
                />}
              placeholder={t("confirm")}
              value={confirmPassword}
            />
          </FormItem>

          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              className="filled"
            >
              {t("registerNow")}
            </Button>
            {t("orBack")} <Link to='/signin'>{t("signin")}</Link>
          </FormItem>
        </Form>
      </div>
    )
  }
}

export default withTranslation()(SignUp)
