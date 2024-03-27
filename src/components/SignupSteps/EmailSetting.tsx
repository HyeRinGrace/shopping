import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { ISteps } from '../../models/steps';
import { useDispatch } from 'react-redux';
import { setting } from '../../store/signupSlice';
// import axios from 'axios';
import axios from '../../util/axiosInstance';

const EmailSetting: React.FC<ISteps> = ({ step, setStep }: ISteps) => {
	const dispatch = useDispatch();
	const [email, setEmail] = useState<string>('');
	const [name, setName] = useState<string>('');
	const [isEmail, setIsEmail] = useState<boolean>(false);
	const [isTouched, setIsTouched] = useState<boolean>(false);
	const [isValidEmail, setIsValidEmail] = useState({
		validEmail: false,
		validMessage: '',
	});
	const [isClicked, setIsClicked] = useState<boolean>(false);
	const emailInputInValid = !isEmail && isTouched;
	const finalConfirm = isEmail && name && isValidEmail.validEmail;

	// 다음 페이지로 이동
	const handlingNext = () => {
		// 유효성 검사 후
		setStep(step + 1);
	};

	// 이름 입력
	const onChangeName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		const newName = e.target.value;
		setName(newName);
		dispatch(setting({ name: newName }));
	}, []);

	// 이메일 입력
	const onChangeEmail = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		const emailRegex =
			/([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
		const emailCurrent = e.target.value;
		setIsClicked(false);
		setEmail(emailCurrent);
		setIsTouched(true);
		setIsValidEmail({ ...isValidEmail, validEmail: false });
		if (emailCurrent.trim() === '' || !emailRegex.test(emailCurrent)) {
			setIsEmail(false);
		} else {
			setIsEmail(true);
			dispatch(setting({ email: emailCurrent }));
		}
	}, []);

	// 이메일 중복검사버튼 클릭
	const onClickCheck = async () => {
		try {
			const res = await axios(`/api/v1/user/sign/${email}/exists`);
			setIsClicked(true);
			setIsValidEmail({ ...isValidEmail, validMessage: res.data.message });
			if (res.data.status === 'success') {
				setIsValidEmail({ validMessage: res.data.message, validEmail: true });
			}
		} catch (error) {
			setIsClicked(true);
			setIsValidEmail({ validEmail: false, validMessage: '중복된 이메일입니다.' });
			console.log(error);
		}
	};
	console.log(isValidEmail.validMessage);
	console.log(isValidEmail.validEmail);
	console.log();
	return (
		<SEmailSetting>
			<h3 className='email-title'>
				사용자 이름과 로그인에 사용할
				<br />
				이메일을 입력해주세요.
			</h3>
			<div className='container-email-input'>
				<input
					type='text'
					placeholder='이름 입력'
					autoCapitalize='none'
					className='email-input'
					onChange={onChangeName}
				/>
				<div></div>
				<input
					type='text'
					placeholder='아이디 (이메일) 입력'
					autoCapitalize='none'
					className='email-input'
					onChange={onChangeEmail}
				/>
				<button onClick={onClickCheck} className='btn-check-email'>
					이메일 중복 검사
				</button>

				{isClicked && email && (
					<p className={isValidEmail.validEmail ? 'email-message_success' : 'email-message_fail'}>
						{isValidEmail.validMessage}
					</p>
				)}
				{isClicked && !email && <p className='email-message_fail'>이메일을 작성해주세요.</p>}

				{emailInputInValid && <p className='err-message'>* 이메일 형식이 맞지 않습니다.</p>}
			</div>
			<button
				type='button'
				className={finalConfirm ? 'btn-next' : 'btn-next_invalid'}
				onClick={handlingNext}
				disabled={finalConfirm ? false : true}
			>
				다음
			</button>
		</SEmailSetting>
	);
};

export default EmailSetting;

const SEmailSetting = styled.div`
	position: relative;
	flex: 1 0 100%;
	padding-top: 18px;
	border-top: 4px solid rgb(244, 244, 244);

	.email-title {
		margin-bottom: 20px;
		font-size: 20px;
		font-weight: 500;
		line-height: 28px;
		white-space: pre-wrap;
	}

	.container-email-input {
		margin-bottom: 40px;
		padding: 0;

		.email-input {
			border: 1px solid #d4d4d4;
			border-radius: 2px;
			display: block;
			width: 100%;
			height: 48px;
			padding: 0 14px;
			font-size: 14px;
			font-weight: 500;
			color: #1a1a1a;
			outline: none;
			text-size-adjust: none;
			appearance: none;
		}

		.err-message {
			font-size: 13px;
			color: red;
			margin-left: 5px;
			display: flex;
		}

		.btn-check-email {
			display: flex;
			justify-content: flex-end;
			margin-top: 10px;
			margin-left: auto;
			border: 1px solid #d4d4d4;
			padding: 4px 4px;
			background-color: grey;
			color: white;
			border-radius: 5px;
		}

		.email-message_success {
			font-size: 13px;
			color: #1abc9c;
			margin-left: 5px;
			display: flex;
		}
		.email-message_fail {
			font-size: 13px;
			color: red;
			margin-left: 5px;
			display: flex;
		}
	}

	.btn-next {
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		min-width: 40px;
		min-height: 25px;
		width: 100%;
		height: 52px;
		background: rgb(0, 0, 0);
		color: rgb(255, 255, 255);
		font-size: 14px;
		font-weight: 700;
	}

	.btn-next_invalid {
		cursor: not-allowed;
		display: flex;
		align-items: center;
		justify-content: center;
		min-width: 40px;
		min-height: 25px;
		width: 100%;
		height: 52px;
		background: rgb(196, 196, 196);
		color: rgb(255, 255, 255);
		font-size: 14px;
		font-weight: 700;
	}
`;
