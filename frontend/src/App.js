import React from 'react'
import Router from './router'
import { BrowserRouter } from 'react-router-dom'
import { Layout } from 'antd'
import NavBar from './components/NavBar'
import Foot from './components/Foot'

const { Header, Footer, Content } = Layout

function App() {
  return (
    <div className="App">
      <Layout>
        <Header>
          <NavBar/>
        </Header>
        <Content>
          <BrowserRouter>
            <Router/>
          </BrowserRouter>
        </Content>
        <Footer>
          <Foot/>
        </Footer>
      </Layout>
    </div>
  );
}

export default App;
