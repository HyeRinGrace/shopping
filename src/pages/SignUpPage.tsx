import React, { useState } from 'react';
import styled from 'styled-components';
import {
	ProgressBar,
	EmailSetting,
	PasswordSetting,
	PhoneNum,
	Done,
	AddressSetting,
} from '../components';

// type TStepComponent = {
// 	0: JSX.Element;
// 	1: JSX.Element;
// 	2: JSX.Element;
// 	3: JSX.Element;
// 	4: JSX.Element;
// };

const SignUpPage: React.FC = () => {
	const [step, setStep] = useState(0);
	const stepComponent = [
		<EmailSetting step={step} setStep={setStep} />,
		<PasswordSetting step={step} setStep={setStep} />,
		<PhoneNum step={step} setStep={setStep} />,
		<AddressSetting step={step} setStep={setStep} />,
		<Done />,
	];
	return (
		<SSignUp>
			<div className='wrapper'>
				<h2 className='title'>간편가입</h2>
				<div className='container'>
					<ProgressBar step={step} />
					<div>{stepComponent[step]}</div>
				</div>
			</div>
		</SSignUp>
	);
};

export default SignUpPage;

const SSignUp = styled.div`
	max-width: 1920px;
	width: 100%;
	background-color: #fff;
	height: 100vh;
	margin: 0 auto;
	color: #000;

	.wrapper {
		padding: 43px 0 50px;
		max-width: 400px;
		margin: 0 auto;
		margin-top: 80px;

		.title {
			margin-bottom: 34px;
			color: rgb(0, 0, 0);
			font-size: 44px;
			font-weight: 600;
			text-align: center;
		}

		.container {
			position: relative;
			overflow: hidden;
			width: 100%;
			height: calc(100vh - 100px);
		}
	}
`;
