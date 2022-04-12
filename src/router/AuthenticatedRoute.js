import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';

const { Content, Footer, Header } = Layout;

const AuthenticatedRoute = ({ component: Component }) => {
	const navigate = useNavigate();

	const handleClick = (event) => {
		navigate(event.key);
	};

  return (
    <Layout style={{ minHeight: '100vh' }}>
			<Header>
				<Menu theme="dark" mode="horizontal" defaultSelectedKeys={['/trading']}>
					<Menu.Item key="/trading" onClick={handleClick}>Trading</Menu.Item>
					<Menu.Item key="/defi" onClick={handleClick}>DeFi</Menu.Item>
					<Menu.Item key="/nft" onClick={handleClick}>NFT</Menu.Item>
				</Menu>
			</Header>
			<Content style={{ margin: '20px 40px' }}><Component/></Content>
			<Footer style={{ textAlign: 'center' }}>HU2 @2022</Footer>
    </Layout>
  );
};

export default AuthenticatedRoute;
