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

  const data = `type Type = ${type};\nexport default Type;`;
  const pathTo = path.resolve(__dirname, '..', 'generated', name + '.ts');
  console.log(pathTo);
  fs.writeFileSync(pathTo, data);
};

export default generateRange;
