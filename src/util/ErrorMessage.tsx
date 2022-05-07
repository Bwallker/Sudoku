import { ReactNode } from 'react';
import CentralElement from '../components/CentralElement';

interface Props {
	children: ReactNode;
}

const ErrorMessage = (props: Props) => (
	<CentralElement className='bg-black'>
		<h1 className='text-warning' style={{ fontSize: '3vw' }}>
			{props.children}
		</h1>
	</CentralElement>
);

export default ErrorMessage;
