import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { ISteps } from '../../models/steps';
import { useDispatch } from 'react-redux';
import { setting } from '../../store/signupSlice';

const AddressSetting: React.FC<ISteps> = ({ step, setStep }: ISteps) => {
	const dispatch = useDispatch();
	const [address, setAddress] = useState<string>('');
	const [subaddress, setSubaddress] = useState<string>('');
	const handlingNext = () => {
		// 유효성 검사 후
		setStep(step + 1);
	};
	const onChangeMain = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		const mainAddress = e.target.value;
		setAddress(mainAddress);
		dispatch(setting({ mainAddress: mainAddress }));
	}, []);
	const onChangeSub = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		const subAddress = e.target.value;
		setSubaddress(e.target.value);
		dispatch(setting({ subAddress: subAddress }));
		console.log(subaddress);
	}, []);
	return (
		<SAddressSetting>
			<h3 className='address-title'>
				사용자 이름과 로그인에 사용할
				<br />
				이메일을 입력해주세요.
			</h3>
			<div className='container-address-input'>
				<input
					type='text'
					placeholder='기본 주소 입력 (필수)'
					autoCapitalize='none'
					className='address-input'
					onChange={onChangeMain}
				/>
				<div></div>
				<input
					type='text'
					placeholder='주소 입력 (선택)'
					autoCapitalize='none'
					className='address-input'
					onChange={onChangeSub}
				/>
			</div>
			<button
				type='button'
				className={address ? 'btn-next' : 'btn-next_invalid'}
				onClick={handlingNext}
				disabled={address ? false : true}
			>
				다음
			</button>
		</SAddressSetting>
	);
};

export default AddressSetting;

const SAddressSetting = styled.div`
	position: relative;
	flex: 1 0 100%;
	padding-top: 18px;
	border-top: 4px solid rgb(244, 244, 244);

	.address-title {
		margin-bottom: 20px;
		font-size: 20px;
		font-weight: 500;
		line-height: 28px;
		white-space: pre-wrap;
	}

	.container-address-input {
		margin-bottom: 40px;
		padding: 0;

		.address-input {
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
