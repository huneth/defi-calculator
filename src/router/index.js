import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import DeFi from '../components/DeFi';
import NFT from '../components/NFT';
import Trading from '../components/Trading';

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route exact path="/defi" element={<DeFi />} />
				<Route exact path="/nft" element={<NFT />} />
				<Route exact path="/trading" element={<Trading />} />
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
