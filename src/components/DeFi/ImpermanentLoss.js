import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Form, Row } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';

import { impermanentLossValues } from '../../utils/calculator';

const defaultValues = {
	principal: 1000,
	startingPriceTokenA: 1,
	startingPriceTokenB: 1,
	endingPriceTokenA: 1,
	endingPriceTokenB: 1,
}

const ImpermanentLoss = () => {
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

	const impermanentLossObject = impermanentLossValues(
		calculationInput.principal,
		calculationInput.startingPriceTokenA,
		calculationInput.startingPriceTokenB,
		calculationInput.endingPriceTokenA,
		calculationInput.endingPriceTokenB
	)

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
								<Form.Label>Starting Price Token A</Form.Label>
								<Controller
									name="startingPriceTokenA"
									control={control}
									render={({ field }) => <Form.Control type="number" placeholder="Enter number" {...field} />}
								/>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label>Starting Price Token B</Form.Label>
								<Controller
									name="startingPriceTokenB"
									control={control}
									render={({ field }) => <Form.Control type="number" placeholder="Enter number" {...field} />}
								/>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label>Ending Price Token A</Form.Label>
								<Controller
									name="endingPriceTokenA"
									control={control}
									render={({ field }) => <Form.Control type="number" placeholder="Enter number" {...field} />}
								/>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label>Ending Price Token B</Form.Label>
								<Controller
									name="endingPriceTokenB"
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
							<Card.Title>Impermanent Loss</Card.Title>
							<Card.Text>
								{impermanentLossObject.impermanentLoss.toFixed(2)} %
								</Card.Text>
						</Card.Body>
					</Card>
				</Row>
				<Row className="justify-content-md-center">
					<Card style={{ width: '18rem' }}>
						<Card.Body>
							<Card.Title>Total Value</Card.Title>
							<Card.Text>$ {impermanentLossObject.endValue.toFixed(2)}</Card.Text>
						</Card.Body>
					</Card>
				</Row>
				<Row className="justify-content-md-center">
					<Card style={{ width: '18rem' }}>
						<Card.Body>
							<Card.Title>Total value if you hadn't supplied liquidity</Card.Title>
							<Card.Text>$ {impermanentLossObject.holdingValue.toFixed(2)}</Card.Text>
						</Card.Body>
					</Card>
				</Row>
			</Container>
		</div>
	);
};

export default ImpermanentLoss;
