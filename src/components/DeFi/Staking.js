import React from 'react';
import { Card, Col, Row, Form, Input } from 'antd';
import { Controller, useForm } from 'react-hook-form';

import useCalculationInput from '../../hooks/useCalculationInput';
import { compoundsPerYear, stakingAPY, frequencySeconds, profit, totalValue } from '../../utils/calculator';

const defaultValues = {
	principal: 1000,
	stakingFrequencyDays: 1,
	stakingFrequencyDaily: 1,
	percentageAPR: 100,
}

const Staking = () => {
	const { control, watch } = useForm({ defaultValues });

	const { calculationInput } = useCalculationInput(defaultValues, watch);

	const stakingFrequencyInSeconds = frequencySeconds(calculationInput.stakingFrequencyDays, calculationInput.stakingFrequencyDaily);

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
							name="stakingFrequencyDays"
							control={control}
							render={({ field }) => (
								<Form.Item label="Staking frequency in days">
									<Input type="number" placeholder="Enter number" {...field} />
								</Form.Item>
							)}
						/>
						{calculationInput.stakingFrequencyDays === 1 && (
							<Controller
								name="stakingFrequencyDaily"
								control={control}
								render={({ field }) => (
									<Form.Item label="Staking frequency per day">
										<Input type="number" placeholder="Enter number" {...field} />
									</Form.Item>
								)}
							/>
						)}
						<Controller
							name="percentageAPR"
							control={control}
							render={({ field }) => (
								<Form.Item label="Staking APR">
									<Input type="number" placeholder="Enter number" {...field} />
								</Form.Item>
							)}
						/>
					</Form>
				</Col>
			</Row>
			<Row>
				<Col offset={8} span={8}>
					<Card title="Total compounds per year" size="small">
						{compoundsPerYear(stakingFrequencyInSeconds)}
					</Card>
				</Col>
			</Row>
			<Row>
				<Col offset={8} span={8}>
					<Card title="Staking APY" size="small">
						{stakingAPY(stakingFrequencyInSeconds, calculationInput.percentageAPR).toFixed(2)} %
					</Card>
				</Col>
			</Row>
			<Row>
				<Col offset={8} span={8}>
					<Card title="Profit" size="small">
						$ {profit(calculationInput.principal, stakingFrequencyInSeconds, calculationInput.percentageAPR).toLocaleString('en-US',  {maximumFractionDigits: 2 })}
					</Card>
				</Col>
			</Row>
			<Row>
				<Col offset={8} span={8}>
					<Card title="Total value" size="small">
						$ {totalValue(calculationInput.principal, stakingFrequencyInSeconds, calculationInput.percentageAPR).toLocaleString('en-US',  {maximumFractionDigits: 2 })}
					</Card>
				</Col>
			</Row>
		</div>
	);
};

export default Staking;
