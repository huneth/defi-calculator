import React from 'react';

import { Tabs } from 'antd';

import PositionSizing from './PositionSizing';

const { TabPane } = Tabs;

const Trading = () => {
	return (
		<div>
			<Tabs defaultActiveKey="position-sizing">
				<TabPane tab="Position Sizing" key="position-sizing">
					<PositionSizing />
				</TabPane>
			</Tabs>
		</div>
	);
};

export default Trading;
