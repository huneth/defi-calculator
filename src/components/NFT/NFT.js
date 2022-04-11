import React from 'react';

import { Tabs, Tab } from 'react-bootstrap';

import MarketCapitalization from './MarketCapitalization';
import RarityScore from './RarityScore';

const NFT = () => {
	return (
		<div>
			<Tabs defaultActiveKey="market-cap" id="uncontrolled-tab-example" className="mb-3">
				<Tab eventKey="market-cap" title="Market Cap">
					<MarketCapitalization />
				</Tab>
				<Tab eventKey="rarity-score" title="Rarity Score">
					<RarityScore />
				</Tab>
			</Tabs>
		</div>
	);
};

export default NFT;
