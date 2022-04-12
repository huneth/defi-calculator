import React from 'react';
import { Card, Col, Row, Form, Input } from 'antd';
import { Controller, useForm } from 'react-hook-form';

import useCalculationInput from '../../hooks/useCalculationInput';

const defaultValues = {
	price: 1.0,
	circulatingSupply: 10 ** 6,
	maxSupply: 10 ** 7,
}

const Tokenomics = () => {
	const { control, watch } = useForm({ defaultValues });

	const { calculationInput } = useCalculationInput(defaultValues, watch);

  return (
		<div>
			<Row>
				<Col offset={8} span={8}>
					<Form layout="vertical">
						<Controller
							name="price"
							control={control}
							render={({ field }) => (
								<Form.Item label="Price $">
									<Input
										type="number"
										step="0.00000001"
										placeholder="Enter number"
										{...field}
									/>
								</Form.Item>
							)}
						/>
						<Controller
							name="circulatingSupply"
							control={control}
							render={({ field }) => (
								<Form.Item label="Circulating Supply">
									<Input type="number" placeholder="Enter number" {...field} />
								</Form.Item>
							)}
						/>
						<Controller
							name="maxSupply"
							control={control}
							render={({ field }) => (
								<Form.Item label="Max Supply">
									<Input type="number" placeholder="Enter number" {...field} />
								</Form.Item>
							)}
						/>
					</Form>
				</Col>
			</Row>
			<Row>
				<Col offset={8} span={8}>
					<Card title="Market Cap (MC) $" size="small">
						$ {(calculationInput.price * calculationInput.circulatingSupply).toLocaleString('en-US',  {maximumFractionDigits: 2 })}
					</Card>
				</Col>
			</Row>
			<Row>
				<Col offset={8} span={8}>
					<Card title="Fully Diluted Valuation (FDV) $" size="small">
						$ {(calculationInput.price * calculationInput.maxSupply).toLocaleString('en-US',  {maximumFractionDigits: 2 })}
					</Card>
				</Col>
			</Row>
		</div>
	);
};

export default Tokenomics;
