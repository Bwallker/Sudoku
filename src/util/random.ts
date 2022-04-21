export const randomInt = (
	min: number,
	max: number,
	includeMax = false,
): number => {
	if (includeMax) max++;
	return Math.floor(Math.random() * (max - min)) + min;
};
