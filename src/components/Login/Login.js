import React from 'react';
import { Link } from 'react-router-dom'
import { Button } from 'antd';

const Login = () => {
	return (
		<div>
			<Link to="/auth/discord">
				<Button type="primary">Login with Discord</Button>
			</Link>
		</div>
	);
};

export default Login;
