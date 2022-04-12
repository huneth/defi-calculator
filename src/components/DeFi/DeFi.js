import React from 'react';
import { Tabs } from 'antd';

import ImpermanentLoss from './ImpermanentLoss';
import Staking from './Staking';
import Tokenomics from './Tokenomics';

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
			</Tabs>
		</div>
	);
};

export default DeFi;
