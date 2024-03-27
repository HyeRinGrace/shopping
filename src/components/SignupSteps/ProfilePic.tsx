import React, { useState } from 'react';
import styled from 'styled-components';
import { ISteps } from '../../models/steps';

const ProfilePic: React.FC<ISteps> = ({ step, setStep }: ISteps) => {
	const [imgFile, setImgFile] = useState('');

	const handlingNext = () => {
		// 유효성 검사 후
		setStep(step + 1);
		setImgFile('');
	};
	// 기본 이미지
	// https://i.stack.imgur.com/frlIf.png
	return (
		<SProfilePic>
			<h3 className='profile-title'>프로필 사진을 선택해주세요.</h3>
			<h4>사진 미리보기</h4>
			<div className='img-preview'>
				<img
					src={imgFile ? imgFile : 'https://care.ntbprov.go.id/img/noimage.png'}
					alt='프로필 사진'
				/>
			</div>
			<button type='button' className='btn-next' onClick={handlingNext}>
				다음
			</button>
		</SProfilePic>
	);
};

export default ProfilePic;

const SProfilePic = styled.div`
	position: relative;
	flex: 1 0 100%;
	padding-top: 18px;
	border-top: 4px solid rgb(244, 244, 244);

	.profile-title {
		margin-bottom: 20px;
		font-size: 20px;
		font-weight: 500;
		line-height: 28px;
		white-space: pre-wrap;
	}

	.container-pic-input {
		margin-bottom: 40px;
		padding: 0;

		.file-label {
			cursor: pointer;
			border: none;
			border: 1px solid #d4d4d4;
			width: 70%;
			height: 48px;
			box-sizing: border-box;
			font-size: 14px;
			font-weight: 700;
			margin-top: 10px;
			margin: 0 auto;
			display: flex;
			justify-content: center;
			align-items: center;
			&:hover {
				background-color: #1a1a1a;
				color: #fff;
				transition: 0.2s ease-in-out;
			}
		}

		.file-input {
			display: none;
		}
	}

	.img-preview {
		width: 100%;
		height: 240px;
		border: 1px solid #d4d4d4;
		border-radius: 5px;
		margin-bottom: 20px;
		overflow: hidden;

		img {
			width: 100%;
			height: 100%;
			border-radius: 5px;
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
