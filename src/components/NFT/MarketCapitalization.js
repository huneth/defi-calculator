import React from 'react';
import { Card, Col, Row, Form, Input } from 'antd';
import { Controller, useForm } from 'react-hook-form';

import useCalculationInput from '../../hooks/useCalculationInput';

const defaultValues = {
	collectionSize: 10000,
	floorPrice: 1000,
}

const MarketCapitalization = () => {
	const { control, watch } = useForm({ defaultValues });

	const { calculationInput } = useCalculationInput(defaultValues, watch);

	return (
		<div>
			<Row>
				<Col offset={8} span={8}>
					<Form layout="vertical">
						<Controller
							name="collectionSize"
							control={control}
							render={({ field }) => (
								<Form.Item label="Collection Size">
									<Input placeholder="Enter number" type="number" {...field} />
								</Form.Item>
							)}
						/>
						<Controller
							name="floorPrice"
							control={control}
							render={({ field }) => (
								<Form.Item label="Floor Price $">
									<Input placeholder="Enter number" type="number" {...field} />
								</Form.Item>
							)}
						/>
					</Form>
				</Col>
			</Row>
			<Row>
				<Col offset={8} span={8}>
					<Card title="Market Cap (MC)" size="small">
						$ {(calculationInput.collectionSize * calculationInput.floorPrice).toFixed(2)}
					</Card>
				</Col>
			</Row>
		</div>
	);
};

export default MarketCapitalization;
