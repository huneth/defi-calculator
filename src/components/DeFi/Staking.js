import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Form, Row } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';

import { compoundsPerYear, stakingAPY, frequencySeconds, profit, totalValue } from '../../utils/calculator';

const defaultValues = {
	principal: 1000,
	stakingFrequencyDays: 1,
	stakingFrequencyDaily: 1,
	percentageAPR: 100,
}

const Staking = () => {
	const [calculationInput, setCalculationInput] = useState(defaultValues);
	const { control, watch } = useForm({ defaultValues });

	useEffect(() => {
    const subscription = watch((value, { name }) => {
			const valueInt = parseInt(value[name], 10);

			setCalculationInput(preveCalculationInput => (
				{ ...preveCalculationInput, [name]: valueInt }
			));
		});

    return () => subscription.unsubscribe();
  }, [watch]);

	const stakingFrequencyInSeconds = frequencySeconds(calculationInput.stakingFrequencyDays, calculationInput.stakingFrequencyDaily);

  return (
		<div>
			<Container fluid>
				<Row className="justify-content-md-center">
					<Col xs={4} >
						<Form>
						<Form.Group className="mb-3">
								<Form.Label>Principal value in USD</Form.Label>
								<Controller
									name="principal"
									control={control}
									render={({ field }) => <Form.Control type="number" placeholder="Enter number" {...field} />}
								/>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label>Staking frequency in days</Form.Label>
								<Controller
									name="stakingFrequencyDays"
									control={control}
									render={({ field }) => <Form.Control type="number" placeholder="Enter number" {...field} />}
								/>
							</Form.Group>
							{calculationInput.stakingFrequencyDays === 1 && (
							<Form.Group className="mb-3">
								<Form.Label>Staking frequency per day</Form.Label>
								<Controller
									name="stakingFrequencyDaily"
									control={control}
									render={({ field }) => <Form.Control type="number" placeholder="Enter number" {...field} />}
								/>
							</Form.Group>

							)}
							<Form.Group className="mb-3">
								<Form.Label>Staking APR</Form.Label>
								<Controller
									name="percentageAPR"
									control={control}
									render={({ field }) => <Form.Control type="number" placeholder="Enter number" {...field} />}
								/>
							</Form.Group>
						</Form>
					</Col>
				</Row>
				<Row className="justify-content-md-center">
					<Card style={{ width: '18rem' }}>
						<Card.Body>
							<Card.Title>Total compounds per year</Card.Title>
							<Card.Text>{compoundsPerYear(stakingFrequencyInSeconds)}</Card.Text>
						</Card.Body>
					</Card>
				</Row>
				<Row className="justify-content-md-center">
					<Card style={{ width: '18rem' }}>
						<Card.Body>
							<Card.Title>Staking APY</Card.Title>
							<Card.Text>{stakingAPY(stakingFrequencyInSeconds, calculationInput.percentageAPR).toFixed(2)} %</Card.Text>
						</Card.Body>
					</Card>
				</Row>
				<Row className="justify-content-md-center">
					<Card style={{ width: '18rem' }}>
						<Card.Body>
							<Card.Title>Profit</Card.Title>
							<Card.Text>$ {profit(calculationInput.principal, stakingFrequencyInSeconds, calculationInput.percentageAPR).toFixed(2)}</Card.Text>
						</Card.Body>
					</Card>
				</Row>
				<Row className="justify-content-md-center">
					<Card style={{ width: '18rem' }}>
						<Card.Body>
							<Card.Title>Total value</Card.Title>
							<Card.Text>$ {totalValue(calculationInput.principal, stakingFrequencyInSeconds, calculationInput.percentageAPR).toFixed(2)}</Card.Text>
						</Card.Body>
					</Card>
				</Row>
			</Container>
		</div>
	);
};

export default Staking;
