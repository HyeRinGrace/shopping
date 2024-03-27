import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { ISteps, IValid } from '../../models/steps';
import { useDispatch } from 'react-redux';
import { setting } from '../../store/signupSlice';

const PasswordSetting: React.FC<ISteps> = ({ step, setStep }: ISteps) => {
	const dispatch = useDispatch();
	const [password, setPassword] = useState<string>('');
	const [pwCheck, setPwCheck] = useState<string>('');
	const [confirm, setConfirm] = useState<boolean>(false);
	const [isValid, setIsValid] = useState<IValid>({
		isAlpha: false,
		isCharacter: false,
		isNumber: false,
		isSize: false,
		isPw: false,
	});
	const [isTouched, setIsTouched] = useState({
		pw: false,
		pwCheck: false,
	});
	const alphaRegex = /(?=.*[a-zA-Z])/;
	const characterRegex = /(?=.*[!@#$%^*+=-])/;
	const numberRegex = /(?=.*[0-9])/;
	const handlingNext = () => {
		// 유효성 검사 후
		setStep(step + 1);
	};

	// console.log(alphaRegex.test('ekoeE'));
	// console.log(characterRegex.test('?ekoeE2'));
	// console.log(numberRegex.test('?ekoeE2'));
	const onChangePassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		const pwCurrent = e.target.value;
		setPassword(pwCurrent);
		setIsTouched({ ...isTouched, pw: true });

		const isValidAlpha = alphaRegex.test(pwCurrent);
		const isValidCharacter = characterRegex.test(pwCurrent);
		const isValidNumber = numberRegex.test(pwCurrent);
		const isValidLength = pwCurrent.length >= 8 && pwCurrent.length <= 20;

		setIsValid({
			isAlpha: isValidAlpha,
			isCharacter: isValidCharacter,
			isNumber: isValidNumber,
			isSize: isValidLength,
			isPw: isValidAlpha && isValidCharacter && isValidNumber && isValidLength,
		});
	}, []);
	const onChangePwCheck = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const pwCheckCurrent = e.target.value;
			setPwCheck(pwCheckCurrent);
			if (password === pwCheckCurrent) {
				setConfirm(true);
				dispatch(setting({ password: pwCheckCurrent }));
			} else {
				setConfirm(false);
			}
			console.log(pwCheck);
		},
		[password]
	);
	return (
		<SPasswordSetting>
			<h3 className='pw-title'>비밀번호를 입력해주세요.</h3>
			<div className='container-pw-input'>
				<input
					type='password'
					placeholder='비밀번호 입력'
					autoCapitalize='none'
					className='pw-input'
					onChange={onChangePassword}
				/>
				<p className='validation-check'>
					<span className={isValid.isAlpha ? 'check-valid' : 'check'}>대소문자</span>
					<span className={isValid.isNumber ? 'check-valid' : 'check'}>숫자</span>
					<span className={isValid.isCharacter ? 'check-valid' : 'check'}>특수문자</span>
					<span className={isValid.isSize ? 'check-valid' : 'check'}>8-20자 이내</span>
				</p>
				<input
					type='password'
					placeholder='비밀번호 확인'
					autoCapitalize='none'
					className='pw-input'
					onChange={onChangePwCheck}
				/>
				<p className='validation-check'>
					<span className={confirm ? 'check-valid' : 'check'}>비밀번호 일치</span>
				</p>
			</div>
			<button
				type='button'
				className={confirm ? 'btn-next' : 'btn-next_invalid'}
				onClick={handlingNext}
				disabled={confirm ? false : true}
			>
				다음
			</button>
		</SPasswordSetting>
	);
};

export default PasswordSetting;

const SPasswordSetting = styled.div`
	position: relative;
	flex: 1 0 100%;
	padding-top: 18px;
	border-top: 4px solid rgb(244, 244, 244);

	.pw-title {
		margin-bottom: 20px;
		font-size: 20px;
		font-weight: 500;
		line-height: 28px;
		white-space: pre-wrap;
	}

	.container-pw-input {
		.pw-input {
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

		.validation-check {
			display: flex;
			align-items: center;
			height: 40px;
			font-size: 12px;
			line-height: 20px;

			.check {
				position: relative;
				padding-right: 30px;
				color: rgb(196, 196, 196);
			}
			.check::after {
				position: absolute;
				top: 2px;
				right: 10px;
				width: 10px;
				height: 6px;
				border-bottom: 1px solid rgb(196, 196, 196);
				border-left: 1px solid rgb(196, 196, 196);
				border-top-color: rgb(196, 196, 196);
				border-right-color: rgb(196, 196, 196);
				transform: rotate(-45deg);
				content: '';
				box-sizing: content-box;
			}
			.check-valid {
				position: relative;
				padding-right: 25px;
				color: rgb(55, 95, 255);
			}
			.check-valid::after {
				position: absolute;
				top: 2px;
				right: 10px;
				width: 10px;
				height: 6px;
				border-bottom: 1px solid rgb(55, 95, 255);
				border-left: 1px solid rgb(55, 95, 255);
				border-top-color: rgb(55, 95, 255);
				border-right-color: rgb(55, 95, 255);
				transform: rotate(-45deg);
				content: '';
				box-sizing: content-box;
			}
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
