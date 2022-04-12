import React from 'react';
import { Card, Col, Row, Form, Input } from 'antd';
import { Controller, useForm } from 'react-hook-form';

import useCalculationInput from '../../hooks/useCalculationInput';
import { impermanentLossValues } from '../../utils/calculator';

const defaultValues = {
	principal: 1000,
	startingPriceTokenA: 1,
	startingPriceTokenB: 1,
	endingPriceTokenA: 1,
	endingPriceTokenB: 1,
}

const ImpermanentLoss = () => {
	const { control, watch } = useForm({ defaultValues });

	const { calculationInput } = useCalculationInput(defaultValues, watch);

	const impermanentLossObject = impermanentLossValues(
		calculationInput.principal,
		calculationInput.startingPriceTokenA,
		calculationInput.startingPriceTokenB,
		calculationInput.endingPriceTokenA,
		calculationInput.endingPriceTokenB
	)

	console.log(calculationInput)

  return (
		<div>
			<Row>
				<Col offset={8} span={8}>
					<Form layout="vertical">
						<Controller
							name="principal"
							control={control}
							render={({ field }) => (
								<Form.Item label="Principal value in US">
									<Input type="number" placeholder="Enter number" {...field} />
								</Form.Item>
							)}
						/>
						<Controller
							name="startingPriceTokenA"
							control={control}
							render={({ field }) => (
								<Form.Item label="Starting Price Token A">
									<Input type="number" placeholder="Enter number" {...field} />
								</Form.Item>
							)}
						/>
						<Controller
							name="startingPriceTokenB"
							control={control}
							render={({ field }) => (
								<Form.Item label="Starting Price Token B">
									<Input type="number" placeholder="Enter number" {...field} />
								</Form.Item>
							)}
						/>
						<Controller
							name="endingPriceTokenA"
							control={control}
							render={({ field }) => (
								<Form.Item label="Ending Price Token A">
									<Input type="number" placeholder="Enter number" {...field} />
								</Form.Item>
							)}
						/>
						<Controller
							name="endingPriceTokenB"
							control={control}
							render={({ field }) => (
								<Form.Item label="Ending Price Token B">
									<Input type="number" placeholder="Enter number" {...field} />
								</Form.Item>
							)}
						/>
					</Form>
				</Col>
			</Row>
			<Row>
				<Col offset={8} span={8}>
					<Card title="Impermanent Loss" size="small">
						{impermanentLossObject.impermanentLoss.toFixed(2)} %
					</Card>
				</Col>
			</Row>
			<Row>
				<Col offset={8} span={8}>
					<Card title="Total Value" size="small">
						$ {impermanentLossObject.endValue.toLocaleString('en-US',  {maximumFractionDigits: 2 })}
					</Card>
				</Col>
			</Row>
			<Row>
				<Col offset={8} span={8}>
					<Card title="Total value if you hadn't supplied liquidity" size="small">
						$ {impermanentLossObject.holdingValue.toLocaleString('en-US',  {maximumFractionDigits: 2 })}
					</Card>
				</Col>
			</Row>
		</div>
	);
};

export default ImpermanentLoss;
