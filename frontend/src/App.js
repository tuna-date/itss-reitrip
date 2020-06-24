import React, { Component } from 'react'
import Router from './router'
import { BrowserRouter } from 'react-router-dom'
import { Layout } from 'antd'
import NavBar from './components/NavBar'
import Foot from './components/Foot'

const { Header, Footer, Content } = Layout

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Layout>
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
              <NavBar />
            </Header>
            <Content style={{ padding: '10px 50px', margin: '64px 10em 0px 10em', minHeight: '100vh' }}>
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
