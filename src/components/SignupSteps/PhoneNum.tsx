import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { ISteps } from '../../models/steps';
import { useDispatch } from 'react-redux';
import { setting } from '../../store/signupSlice';

const PhoneNum: React.FC<ISteps> = ({ step, setStep }: ISteps) => {
	const dispatch = useDispatch();
	const [phoneNumber, setPhoneNumber] = useState<string>('');
	const [gender, setGender] = useState('');
	const validationCheck = phoneNumber.length === 13 && gender !== '';
	const handlingNext = () => {
		// 유효성 검사 후
		setStep(step + 1);
	};
	const formatPhoneNumber = (value: string): string => {
		const numericValue = value.replace(/\D/g, ''); // Remove non-digit characters
		const match = numericValue.match(/^(\d{3})(\d{0,4})(\d{0,4})$/);
		if (match) {
			return match[1] + (match[2] ? '-' + match[2] : '') + (match[3] ? '-' + match[3] : '');
		}
		return numericValue;
	};
	const onChangePhoneNum = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		const formattedValue = formatPhoneNumber(e.target.value);
		setPhoneNumber(formattedValue);
		dispatch(setting({ phoneNumber: formattedValue }));
	}, []);
	const onClickMale = () => {
		setGender('male');
		dispatch(setting({ sex: 'male' }));
	};
	const onClickFemale = () => {
		setGender('female');
		dispatch(setting({ sex: 'female' }));
	};
	return (
		<SPhoneNum>
			<h3 className='email-title'>
				전화번호를 입력해주세요.
				<br />
				성별을 선택해주세요.
			</h3>
			<div className='container-email-input'>
				<input
					type='text'
					placeholder='전화번호 입력'
					autoCapitalize='none'
					className='email-input'
					onChange={onChangePhoneNum}
					maxLength={13}
					value={phoneNumber}
				/>
				<div className='select-gender'>
					<input type='radio' id='select1' name='gender' />
					<label htmlFor='select1' onClick={onClickMale}>
						남성
					</label>
					<input type='radio' id='select2' name='gender' />
					<label htmlFor='select2' onClick={onClickFemale}>
						여성
					</label>
				</div>
			</div>
			<button
				type='button'
				className={validationCheck ? 'btn-next' : 'btn-next_invalid'}
				onClick={handlingNext}
				disabled={validationCheck ? false : true}
			>
				다음
			</button>
		</SPhoneNum>
	);
};

export default PhoneNum;

const SPhoneNum = styled.div`
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

		.select-gender {
			margin-top: 20px;
		}

		.select-gender input[type='radio'] {
			display: none;
		}

		.select-gender input[type='radio'] + label {
			display: inline-block;
			cursor: pointer;
			height: 48px;
			width: 90px;
			border: 1px solid #d4d4d4;
			line-height: 48px;
			text-align: center;
			font-weight: 500;
			font-size: 13px;
		}

		.select-gender input[type='radio'] + label {
			background: #fff;
			color: #1a1a1a;
		}

		.select-gender input[type='radio']:checked + label {
			background: #333;
			color: #fff;
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
