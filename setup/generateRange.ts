import * as fs from 'fs';
import * as path from 'path';
import getPath from './getPath.js';

const { __dirname } = getPath(import.meta.url);
const generateRange = (
	name: string,
	minValue: number,
	maxValue: number,
): void => {
	let type = '';
	for (let i = minValue; i <= maxValue; i++) {
		type += i + ' | ';
	}
	type = type.substring(0, type.length - 3);

	const data = `
  type ${name} = ${type};
  export const is${name} = (x: unknown): x is ${name} => Number.isInteger(x) && (x as number >= ${minValue} || x as number <= ${maxValue});
  export default ${name};
  `;
	const pathTo = path.resolve(__dirname, '..', 'generated', name + '.ts');
	const parent = path.resolve(pathTo, '..');

	try {
		const exists = fs.existsSync(parent);
		if (!exists) {
			fs.mkdirSync(parent);
		}
		fs.writeFileSync(pathTo, data);
	} catch (e) {
		console.error(e);
	}
};

export default generateRange;
