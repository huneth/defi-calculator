import { useEffect, useState } from 'react';

const useCalculationInput = (defaultValues, watch) => {
	const [calculationInput, setCalculationInput] = useState(defaultValues);

	useEffect(() => {
    const subscription = watch((value, { name }) => {
			const formattedValue = parseFloat(value[name]) || value[name];
			setCalculationInput(preveCalculationInput => (
				{ ...preveCalculationInput, [name]: formattedValue }
			));
		});
    return () => subscription.unsubscribe();
  }, [watch]);
	return { calculationInput }
};

export default useCalculationInput;
