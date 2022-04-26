import React from 'react';

import { Tabs } from 'antd';

import PositionSizing from './PositionSizing';
import PositionSizingSimulator from './PositionSizingSimulator';

const { TabPane } = Tabs;

const Trading = () => {
	return (
		<div>
			<Tabs defaultActiveKey="position-sizing">
				<TabPane tab="Position Sizing" key="position-sizing">
					<PositionSizing />
				</TabPane>
				<TabPane tab="Position Sizing Simulator" key="position-sizing-simulator">
					<PositionSizingSimulator />
				</TabPane>
			</Tabs>
		</div>
	);
};

export default Trading;
