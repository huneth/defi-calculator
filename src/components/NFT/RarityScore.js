import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row, Form, Input } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { Controller, useForm, useFieldArray } from 'react-hook-form';

import { rarityScore } from '../../utils/calculator';

const defaultValues = {
	collectionSize: 10000,
	traits: [{ value: 1000 }]
}

const RarityScore = () => {
	const [calculationInput, setCalculationInput] = useState({
		rarityScore:rarityScore(defaultValues.traits.map(t => t.value), defaultValues.collectionSize)
	});
	const { control, watch } = useForm({ defaultValues });
	const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "traits", // unique name for your Field Array
  });

	const handleAddField = () => {
		append({ value: 1000 });
	};

	const handleRemoveField = (index) => {
		console.log(index);
		remove(index);
	};

	useEffect(() => {
    const subscription = watch((value, { name }) => {
			const traitSizeArray = value.traits.map(trait => trait.value);
			console.log('ts', traitSizeArray)

			setCalculationInput({ rarityScore: rarityScore(traitSizeArray, value.collectionSize) })
		});
    return () => subscription.unsubscribe();
  }, [watch]);

	return (
		<div>
			<Form layout="vertical">
				<Row>
					<Col offset={8} span={7}>
						<Controller
							name="collectionSize"
							control={control}
							render={({ field }) => (
								<Form.Item label="Collection Size">
									<Input type="number" placeholder="Enter number" {...field} />
								</Form.Item>
							)}
						/>
					</Col>
				</Row>
				{fields.map((field, index) => (
					<Row key={index}>
						<Col offset={8} span={8}>
							<Form.Item label={`Number of NFT's with trait #${index + 1}`} style={{ marginBottom: "0px" }}>
								<Row>
									<Col offset={0} span={21}>
										<Controller
											name={`traits.${index}.value`}
											control={control}
											render={({ field }) => (
												<Input
													type="number"
													placeholder="Enter number"
													key={field.id}
													{...field}
												/>
											)}
										/>
									</Col>
									<Col offset={1}>
									<Button type="secondary" onClick={() => handleRemoveField(index)} icon={<CloseOutlined />} />
									</Col>
								</Row>
							</Form.Item>
						</Col>
					</Row>
				))}
			</Form>
			<Row gutter={[0, 32]}>
				<Col offset={8} span={8}>
					<Button type="primary" onClick={handleAddField}>Add More Traits</Button>
				</Col>
				<Col offset={8} span={8}>
					<Card title="Rarity Score" size="small">
						{calculationInput.rarityScore}
					</Card>
				</Col>
			</Row>
		</div>
	);
};

export default RarityScore;
