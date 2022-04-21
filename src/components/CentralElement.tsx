import { ReactNode } from 'react';
import classNames from 'classnames';

interface Props {
	children: ReactNode;
	className?: string;
}

const CentralElement = (props: Props) => (
	<div
		className={classNames(
			'p-0 d-flex justify-content-center align-items-center',
			props.className,
		)}
		style={{
			height: '100vh',
			width: '100vw',
			position: 'absolute',
		}}
	>
		{props.children}
	</div>
);

export default CentralElement;
