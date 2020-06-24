import React, { Component } from 'react'
import Router from './router'
import { BrowserRouter } from 'react-router-dom'
import { Layout } from 'antd'
import NavBar from './components/NavBar'
import Foot from './components/Foot'

const { Header, Footer, Content } = Layout

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      value: 'en'
    }
  }
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Layout>
            <Header className="header">
              <NavBar />
            </Header>
            <Content className="app_content">
              <Router />
            </Content>
            <Footer>
              <Foot />
            </Footer>
          </Layout>
        </BrowserRouter>
      </div>
    );
  }
}
