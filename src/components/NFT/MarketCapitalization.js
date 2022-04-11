import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Form, Row } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';

const defaultValues = {
	collectionSize: 10000,
	floorPrice: 1000,
}

const MarketCapitalization = () => {
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

	return (
		<div>
			<Container fluid>
				<Row className="justify-content-md-center">
					<Col xs={4} >
						<Form>
							<Form.Group className="mb-3">
								<Form.Label>Collection Size</Form.Label>
								<Controller
									name="collectionSize"
									control={control}
									render={({ field }) => <Form.Control type="number" placeholder="Enter number" {...field} />}
								/>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label>Floor Price $</Form.Label>
								<Controller
									name="floorPrice"
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
							<Card.Title>Min Market Cap (MC)</Card.Title>
							<Card.Text>$ {(calculationInput.collectionSize * calculationInput.floorPrice).toFixed(2)}</Card.Text>
						</Card.Body>
					</Card>
				</Row>
			</Container>
		</div>
	);
};

export default MarketCapitalization;
