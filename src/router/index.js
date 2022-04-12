import React from 'react';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';

import AuthenticatedRoute from './AuthenticatedRoute';

import DeFi from '../components/DeFi';
import NFT from '../components/NFT';
import Trading from '../components/Trading';

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route exact path="/defi" element={<AuthenticatedRoute component={DeFi} />} />
				<Route exact path="/nft" element={<AuthenticatedRoute component={NFT} />} />
				<Route exact path="/trading" element={<AuthenticatedRoute component={Trading} />} />
				<Route path="*" element={<Navigate to="/trading" replace />}/>
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
