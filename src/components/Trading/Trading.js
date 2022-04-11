import React from 'react';

import { Tabs, Tab } from 'react-bootstrap';

import PositionSizing from './PositionSizing';

const Trading = () => {
	return (
		<div>
			<Tabs defaultActiveKey="market-cap" id="uncontrolled-tab-example" className="mb-3">
				<Tab eventKey="market-cap" title="Position Sizing">
					<PositionSizing />
				</Tab>
				<Tab eventKey="rarity-score" title="Rarity Score">
				</Tab>
			</Tabs>
		</div>
	);
};

export default Trading;
