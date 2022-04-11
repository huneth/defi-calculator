import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Form, Row } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';

const defaultValues = {
	price: 1.0,
	maxSupply: 10000000,
	circulatingSupply: 100000000,
}

const Tokenomics = () => {
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
								<Form.Label>Price $</Form.Label>
								<Controller
									name="price"
									control={control}
									render={({ field }) => (
										<Form.Control
											type="number"
											step="0.00000001"
											placeholder="Enter number"
											{...field}
										/>
									)}
								/>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label>Circulating Supply</Form.Label>
								<Controller
									name="circulatingSupply"
									control={control}
									render={({ field }) => <Form.Control type="number" placeholder="Enter number" {...field} />}
								/>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label>Max Supply</Form.Label>
								<Controller
									name="maxSupply"
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
							<Card.Title>Market Cap (MC)</Card.Title>
							<Card.Text>$ {(calculationInput.price * calculationInput.circulatingSupply).toFixed(2)}</Card.Text>
						</Card.Body>
					</Card>
				</Row>
				<Row className="justify-content-md-center">
					<Card style={{ width: '18rem' }}>
						<Card.Body>
							<Card.Title>Fully Diluted Valuation (FDV) $</Card.Title>
							<Card.Text>$ {(calculationInput.price * calculationInput.maxSupply).toFixed(2)}</Card.Text>
						</Card.Body>
					</Card>
				</Row>
			</Container>
		</div>
	);
};

export default Tokenomics;
