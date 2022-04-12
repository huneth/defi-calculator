import { useEffect, useState } from 'react';

const useCalculationInput = (defaultValues, watch) => {
	const [calculationInput, setCalculationInput] = useState(defaultValues);

	useEffect(() => {
    const subscription = watch((value, { name }) => {
			setCalculationInput(preveCalculationInput => (
				{ ...preveCalculationInput, [name]: value[name] }
			));
		});
    return () => subscription.unsubscribe();
  }, [watch]);
	return { calculationInput }
};

export default useCalculationInput;
