const secondsInYear = 60 * 60 * 24 * 365;


export const compoundsPerYear = (stakingFrequencySeconds) => Math.floor(secondsInYear / stakingFrequencySeconds);

export const frequencySeconds = (frequencyDays, frequencyDaily) => frequencyDays / frequencyDaily * 24 * 60 * 60;

export const impermanentLossValues = (initialLiqudityValue, startingPriceTokenA, startingPriceTokenB, endingPriceTokenA, endingPriceTokenB) => {
	const x = (initialLiqudityValue / 2) / startingPriceTokenA;
	const y = (initialLiqudityValue / 2) / startingPriceTokenB;
	const k = x * y;

	const x2 = Math.sqrt(k * endingPriceTokenB / endingPriceTokenA);
	const y2 = k / x2;

	const holdingValue = x * endingPriceTokenA + y * endingPriceTokenB;
	const endValue = x2 * endingPriceTokenA + y2 * endingPriceTokenB;

	return ({
		impermanentLoss: 100 - (endValue / holdingValue) * 100,
		holdingValue,
		endValue
	});
};

export const stakingAPY = (stakingFrequencySeconds, percentageAPR) => {
	const interestRate = (percentageAPR / 100) / compoundsPerYear(stakingFrequencySeconds);
	const totalValueInPercentage = (1 + interestRate) ** compoundsPerYear(stakingFrequencySeconds) * 100;
	const totalYieldInPercentage = totalValueInPercentage - 100;
	return totalYieldInPercentage;
};

export const stakingAPR = (stakingFrequencySeconds, percentageAPY) => {
	return Math.pow(percentageAPY / 100, 1 / compoundsPerYear(stakingFrequencySeconds))
};

export const profit = (principal, stakingFrequencySeconds, percentageAPR) => principal * stakingAPY(stakingFrequencySeconds, percentageAPR) / 100;

export const totalValue = (principal, stakingFrequencySeconds, percentageAPR) => principal * (stakingAPY(stakingFrequencySeconds, percentageAPR) + 100) / 100;
