import { dirname } from 'path';
import { fileURLToPath } from 'url';

interface Dir {
	__dirname: string;
	__filename: string;
}

const getPath = (url: string): Dir => {
	const __filename = fileURLToPath(url);
	const __dirname = dirname(__filename);
	return {
		__dirname,
		__filename,
	};
};

export default getPath;
