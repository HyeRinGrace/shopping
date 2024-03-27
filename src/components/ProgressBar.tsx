import { useState, useEffect } from 'react';
import styled from 'styled-components';

interface Istep {
	width: number | string;
}

const ProgressBar = ({ step }: any) => {
	const [progressBar, setProgressBar] = useState(0);

	const getProgressWidth = (step: number) => {
		return Math.floor((step / 4) * 100);
	};
	useEffect(() => {
		switch (step) {
			case 0:
				setProgressBar(getProgressWidth(0));
				break;
			case 1:
				setProgressBar(getProgressWidth(1));
				break;
			case 2:
				setProgressBar(getProgressWidth(2));
				break;
			case 3:
				setProgressBar(getProgressWidth(3));
				break;
			case 4:
				setProgressBar(getProgressWidth(4));
				break;
			default:
				break;
		}
	}, [step]);
	return (
		<>
			<SProgress width={`${progressBar}%`}></SProgress>
		</>
	);
};

export default ProgressBar;

const SProgress = styled.i<Istep>`
	position: absolute;
	top: 0px;
	left: 0px;
	width: ${({ width }) => width};
	height: 4px;
	background: rgb(0, 0, 0);
	transition: width 0.2s ease 0s;
	z-index: 1;
`;
