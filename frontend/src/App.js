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
        <Layout>
          <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
            <NavBar />
          </Header>
          <Content>
            <BrowserRouter>
              <Router />
            </BrowserRouter>
          </Content>
          <Footer>
            <Foot />
          </Footer>
        </Layout>
      </div>
    );
  }
}
