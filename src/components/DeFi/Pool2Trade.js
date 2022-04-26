import React from 'react';
import { Card, Col, Row, Form, Input, Radio } from 'antd';
import { Controller, useForm } from 'react-hook-form';

import useCalculationInput from '../../hooks/useCalculationInput';

import { pool2Trade } from '../../utils/calculator';

const defaultValues = {
	orderSize: 5000,
	poolLiquidity: 1000000,
	tokenPrice: 10,
	type: 'buy'
}

const buttonOptions = [
  { label: 'Buy', value: 'buy' },
  { label: 'Sell', value: 'sell' },
];

const Pool2Trade = () => {
	const { control, watch } = useForm({ defaultValues });

	const { calculationInput } = useCalculationInput(defaultValues, watch);

	const tradeResults = pool2Trade(
		calculationInput.poolLiquidity,
		calculationInput.tokenPrice,
		calculationInput.orderSize,
		calculationInput.type
	);

	return (
		<div>
			<Row>
				<Col offset={8} span={8}>
					<Form layout="vertical">
						<Controller
							name="orderSize"
							control={control}
							render={({ field }) => (
								<Form.Item label="Order Size $">
									<Input type="number" placeholder="Enter number" {...field} />
								</Form.Item>
							)}
						/>
						<Controller
							name="type"
							control={control}
							render={({ field }) => (
								<Form.Item label="Order Type">
									<Radio.Group
										{...field}
										options={buttonOptions}
										optionType="button"
										buttonStyle="solid"
									/>
								</Form.Item>
							)}
						/>
						{calculationInput.type === 'buy' && (
							<div>{`You are buying XYZ token for $${calculationInput.orderSize.toLocaleString('en-US',  {maximumFractionDigits: 2 })} USDC.`}</div>
						)}
						{calculationInput.type === 'sell' && (
							<div>{`You are selling XYZ token for $${calculationInput.orderSize.toLocaleString('en-US',  {maximumFractionDigits: 2 })} USDC.`}</div>
						)}
						<Controller
							name="poolLiquidity"
							control={control}
							render={({ field }) => (
								<Form.Item label="Pool liquidty $">
									<Input type="number" placeholder="Enter number" {...field} />
								</Form.Item>
							)}
						/>
						<Controller
							name="tokenPrice"
							control={control}
							render={({ field }) => (
								<Form.Item label="Current token price $">
									<Input type="number" placeholder="Enter number" {...field} />
								</Form.Item>
							)}
						/>
					</Form>
				</Col>
			</Row>
			<Row gutter={[16, 32]}>
				<Col offset={8} span={8}>
					<Card title={calculationInput.type === 'buy' ? "Token received" : "Token sold"} size="small">
						{tradeResults.tokenChange.toFixed(2)}
					</Card>
				</Col>
				<Col offset={8} span={8}>
					<Card title="Price Impact" size="small">
						{tradeResults.priceImpact.toFixed(2)} %
					</Card>
				</Col>
				<Col offset={8} span={8}>
					<Card title="Price per token" size="small">
						$ {tradeResults.pricePerToken.toFixed(2)}
					</Card>
				</Col>
			</Row>
		</div>
	);
};

export default Pool2Trade;
