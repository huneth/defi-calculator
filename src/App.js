import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Layout, Menu } from 'antd';

import Router from './router';

import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const { Header, Content, Footer } = Layout;

const App = () => {
  return (
    <div className="App">
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="/trading">Trading</Menu.Item>
            <Menu.Item key="/defi">DeFi</Menu.Item>
            <Menu.Item key="/nft">NFT</Menu.Item>
          </Menu>
        </Header>
      </Layout>
      {/* <Navbar bg="dark" variant="dark">
        <Container>
          <Nav className="me-auto">
            <Nav.Link href="/trading">Trading</Nav.Link>
            <Nav.Link href="/defi">DeFi</Nav.Link>
            <Nav.Link href="/nft">NFT</Nav.Link>
          </Nav>
        </Container>
      </Navbar> */}
      <Content>
        <Router />
      </Content>
      <Footer style={{ textAlign: 'center' }}>HU2 2022 Created by Adam, Dan, Luc, Michael and Silard</Footer>
    </div>
  );
}

export default App;
