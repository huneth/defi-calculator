import React from 'react';
import { Card, Col, Row, Form, Input } from 'antd';
import { Controller, useForm } from 'react-hook-form';

import useCalculationInput from '../../hooks/useCalculationInput';

const defaultValues = {
	portfolioBalance: 10000,
	spreadRisk: 2,
	stopLossDistance: 5,
}

const PositionSizing = () => {
	const { control, watch } = useForm({ defaultValues });

	const { calculationInput } = useCalculationInput(defaultValues, watch);

	const positionRisk = calculationInput.portfolioBalance * calculationInput.spreadRisk / 100;

	return (
		<div>
			<Row>
				<Col offset={8} span={8}>
					<Form layout="vertical">
						<Controller
							name="portfolioBalance"
							control={control}
							render={({ field }) => (
								<Form.Item label="Portfolio Balance $">
									<Input type="number" placeholder="Enter number" {...field} />
								</Form.Item>
							)}
						/>
						<Controller
							name="spreadRisk"
							control={control}
							render={({ field }) => (
								<Form.Item label="Spread Risk %">
									<Input type="number" placeholder="Enter number" {...field} />
								</Form.Item>
							)}
						/>
						<Card title="Position Risk $" size="small">
							$ {positionRisk.toFixed(2)}
						</Card>
						<Controller
							name="stopLossDistance"
							control={control}
							render={({ field }) => (
								<Form.Item label="Stop Loss Distance %">
									<Input type="number" placeholder="Enter number" {...field} />
								</Form.Item>
							)}
						/>
					</Form>
				</Col>
			</Row>
			<Row>
				<Col offset={8} span={8}>
					<Card title="Position Size" size="small">
						$ {(positionRisk / (calculationInput.stopLossDistance / 100)).toFixed(2)}
					</Card>
				</Col>
			</Row>
		</div>
	);
};

export default PositionSizing;
