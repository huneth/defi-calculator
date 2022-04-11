import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';

import ImpermanentLoss from './ImpermanentLoss';
import Staking from './Staking';
import Tokenomics from './Tokenomics';

const DeFi = () => {
	return (
		<div>
			<Tabs defaultActiveKey="tokenomics" id="uncontrolled-tab-example" className="mb-3">
				<Tab eventKey="tokenomics" title="Tokenomics">
					<Tokenomics />
				</Tab>
				<Tab eventKey="staking" title="Staking">
					<Staking />
				</Tab>
				<Tab eventKey="impermanent-loss" title="Impermanent Loss">
					<ImpermanentLoss />
				</Tab>
			</Tabs>
		</div>
	);
};

export default DeFi;
