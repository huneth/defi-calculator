import React from 'react';
import { BrowserRouter, Navigate, Routes, Route, useLocation } from 'react-router-dom';

import AppLayout from './AppLayout';
import UnauthenticatedLayout from './UnauthenticatedLayout';

import DeFi from '../components/DeFi';
import Login from '../components/Login';
import NFT from '../components/NFT';
import Trading from '../components/Trading';

const AuthRoute = ({ isLoggedIn, children }) => {
	const location = useLocation();

	console.log('logger', isLoggedIn);

	if (!isLoggedIn) {
		return <Navigate to="/login" state={{ from: location }} />;
	}

	return children;
};

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					exact
					path="/login"
					element={
						<UnauthenticatedLayout component={Login} />
					}
				/>
				<Route
					exact
					path="/defi"
					element={
						<AuthRoute isLoggedIn>
							<AppLayout component={DeFi} />
						</AuthRoute>
					}
				/>
				<Route
					exact
					path="/nft"
					element={
						<AuthRoute isLoggedIn>
							<AppLayout component={NFT} />
						</AuthRoute>
					}
				/>
				<Route
					exact
					path="/trading"
					element={
						<AuthRoute isLoggedIn>
							<AppLayout component={Trading} />
						</AuthRoute>
					}
				/>
				<Route
					path="*"
					element={
						<AuthRoute isLoggedIn>
							<Navigate to="/trading" replace />
						</AuthRoute>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
