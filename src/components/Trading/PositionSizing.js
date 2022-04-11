import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Form, Row } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';

const defaultValues = {
	portfolioBalance: 10000,
	spreadRisk: 2,
	stopLossDistance: 5,
}

const PositionSizing = () => {
	const [calculationInput, setCalculationInput] = useState(defaultValues);
	const { control, watch } = useForm({ defaultValues });

	useEffect(() => {
    const subscription = watch((value, { name }) => {
			setCalculationInput(preveCalculationInput => (
				{ ...preveCalculationInput, [name]: value[name] }
			));
		});

    return () => subscription.unsubscribe();
  }, [watch]);

	const positionRisk = calculationInput.portfolioBalance * calculationInput.spreadRisk / 100;

	return (
		<div>
			<Container fluid>
				<Row className="justify-content-md-center">
					<Col xs={4} >
						<Form>
							<Form.Group className="mb-3">
								<Form.Label>Portfolio Balance $</Form.Label>
								<Controller
									name="portfolioBalance"
									control={control}
									render={({ field }) => <Form.Control type="number" placeholder="Enter number" {...field} />}
								/>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label>Spread Risk %</Form.Label>
								<Controller
									name="spreadRisk"
									control={control}
									render={({ field }) => <Form.Control type="number" placeholder="Enter number" {...field} />}
								/>
							</Form.Group>
							<Card style={{ width: '18rem' }}>
								<Card.Body>
									<Card.Title>Position Risk $</Card.Title>
									<Card.Text>$ {positionRisk.toFixed(2)}</Card.Text>
								</Card.Body>
							</Card>
							<Form.Group className="mb-3">
								<Form.Label>Stop Loss Distance %</Form.Label>
								<Controller
									name="stopLossDistance"
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
							<Card.Title>Position Size</Card.Title>
							<Card.Text>$ {(positionRisk / (calculationInput.stopLossDistance / 100)).toFixed(2)}</Card.Text>
						</Card.Body>
					</Card>
				</Row>
			</Container>
		</div>
	);
};

export default PositionSizing;
