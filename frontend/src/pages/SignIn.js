import React, { Component } from 'react'
import { Form, Input, Button, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import API from 'utils/API'
import { withTranslation } from 'react-i18next';

const { Title } = Typography;
const FormItem = Form.Item

class SignIn extends Component {
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

    await localStorage.setItem('token', data.data.token)
    if (localStorage.getItem('token')) window.location.href = '/'
  }

  render() {
    const { email, password } = this.state
    const { t } = this.props
    return (
      <div className="container">
        <Form onFinish={this.handleSubmit} className="login-form">
          <FormItem className="center">
            <Title>REITRIP</Title>
          </FormItem>
          <FormItem
            name="email"
            rules={[{ required: true, message: `${t("userEmail")}` }]}
          >
            <Input
              prefix={
                <UserOutlined
                  className="logo_color"
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
                  className="logo_color"
                />}
              placeholder={t("password")}
              value={password}
            />
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              className="filled"
            >
              {t("signin")}
            </Button>
            {t("or")} <Link to='/signup'>{t("registerNow")}</Link>
          </FormItem>
        </Form>
      </div>
    )
  }
}

export default withTranslation()(SignIn)
