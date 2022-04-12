import React from 'react';

import { Tabs } from 'antd';

import MarketCapitalization from './MarketCapitalization';
import RarityScore from './RarityScore';

const { TabPane } = Tabs;

const NFT = () => {
	return (
		<div>
			<Tabs defaultActiveKey="market-cap">
				<TabPane tab="Market Cap" key="market-cap">
					<MarketCapitalization />
				</TabPane>
				<TabPane tab="Rarity Score" key="impermanent-loss">
					<RarityScore />
				</TabPane>
			</Tabs>
		</div>
	);
};

export default NFT;
