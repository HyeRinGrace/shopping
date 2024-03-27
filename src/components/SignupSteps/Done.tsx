import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setting } from '../../store/signupSlice';
import { RootState } from '../../store/store';
import axios from 'axios';

const Done: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const check = useSelector((state: RootState) => state.signup);
	const [contents, setContents] = useState<string>('');
	const handlingNext = async () => {
		navigate('/');
		try {
			const response = await axios.post('https://shoppingmall.o-r.kr/api/v1/user/sign', check, {
				headers: {
					'Content-Type': 'application/json',
				},
			});
			console.log(response);
		} catch (error) {
			console.log(error);
		}
	};

	const onChangeIntroduce = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const intro = e.target.value;
		setContents(intro);
		dispatch(setting({ introduce: intro }));
	}, []);

	return (
		<SDone>
			<h3 className='done-title'>🥳 회원가입이 되었습니다. 🥳</h3>
			<div className='container-done-input'>
				<textarea
					maxLength={20}
					placeholder='간단한 자기소개를 해주세요! (선택)'
					autoCapitalize='none'
					className='done-input'
					value={contents}
					onChange={onChangeIntroduce}
				/>
				<div className='content-bottom'>
					<div className='current-number'>{contents.length}/20</div>
				</div>
			</div>
			<button type='button' className='btn-next' onClick={handlingNext}>
				완료
			</button>
		</SDone>
	);
};

export default Done;

const SDone = styled.div`
	position: relative;
	flex: 1 0 100%;
	padding-top: 18px;
	border-top: 4px solid rgb(244, 244, 244);

	.done-title {
		margin: 50px 0 50px;
		font-size: 30px;
		font-weight: 500;
		line-height: 28px;
		white-space: pre-wrap;
	}

	.container-done-input {
		margin-bottom: 40px;
		padding: 0;

		.done-input {
			border: 1px solid #d4d4d4;
			border-radius: 2px;
			display: block;
			width: 100%;
			height: 50px;
			padding: 0 14px;
			font-size: 14px;
			font-weight: 500;
			color: #1a1a1a;
			outline: none;
			text-size-adjust: none;
			appearance: none;
			resize: none;
		}
		.content-bottom {
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 100%;
			.current-number {
				width: 100%;
				display: flex;
				justify-content: end;
				color: gray;
				cursor: default;
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
`;
