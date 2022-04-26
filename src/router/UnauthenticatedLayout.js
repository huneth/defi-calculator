import React from 'react';
import { Layout } from 'antd';

const { Content, Footer } = Layout;

const UnauthenticatedLayout = ({ component: Component }) => {
  console.log("GEGE")
  return (
    <Layout style={{ minHeight: '100vh' }}>
			<Content style={{ margin: '20px 40px' }}><Component/></Content>
			<Footer style={{ textAlign: 'center' }}>HU2 @2022</Footer>
    </Layout>
  );
};

export default UnauthenticatedLayout;
