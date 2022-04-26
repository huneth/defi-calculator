import React from 'react';
import { Tabs } from 'antd';

import ImpermanentLoss from './ImpermanentLoss';
import Staking from './Staking';
import Tokenomics from './Tokenomics';
import Pool2Trade from './Pool2Trade';

const { TabPane } = Tabs;

const DeFi = () => {
	return (
		<div>
			<Tabs defaultActiveKey="tokenomics">
				<TabPane tab="Tokenomics" key="tokenomics">
					<Tokenomics />
				</TabPane>
				<TabPane tab="Staking" key="staking">
					<Staking />
				</TabPane>
				<TabPane tab="Impermanent Loss" key="impermanent-loss">
					<ImpermanentLoss />
				</TabPane>
				<TabPane tab="Pool2 Trade" key="pool-2-trade">
					<Pool2Trade />
				</TabPane>
			</Tabs>
		</div>
	);
};

export default DeFi;
