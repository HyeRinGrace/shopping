import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import styled from 'styled-components';
import axiosClient from '../../util/axiosInstance';

import { clearTokenResetTimer } from '../../util/util';

import { login } from '../../store/loginSlice';

interface User {
	email: string;
	sex: string;
	name: string;
	phoneNumber: string;
	profileImgUrl: string;
	mainAddress: string[];
	detailAddress: string[];
	introduce: string;
}

const Profile: React.FC = () => {
	const userId = localStorage.getItem('userId');

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [userData, setUserData] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	const handleLogout = async () => {
		await axiosClient('/api/v1/user/logout', {
			method: 'POST',
		});

		clearTokenResetTimer();

		localStorage.setItem('ACCESS-TOKEN', '');

		dispatch(login(false));

		navigate('/');
	};

	const cancelMembership = useCallback(async () => {
		if (confirm('탈퇴하시겠습니까?')) {
			try {
				await axiosClient({
					method: 'patch',
					url: `/api/v1/user/${userId}/withdrawal`,
					data: {
						id: userId,
					},
				});

				alert('탈퇴가 완료되었습니다.');

				handleLogout();
			} catch (err) {
				console.log('탈퇴 오류가 발생했습니다.');
			}
		}
	}, []);

	useEffect(() => {
		const fetchUser = async () => {
			setIsLoading(true);

			try {
				const res = await axiosClient({
					method: 'get',
					url: `api/v1/user/${userId}`,
					params: {
						id: userId,
					},
				});

				setUserData(res.data.data);

				setIsLoading(false);
			} catch (err) {
				console.log('유저 정보를 불러오는데 실패하였습니다.');
				setIsError(true);
			}
		};

		fetchUser();
	}, []);

	if (isLoading) return <>Loading</>;

	if (!userData || isError) return <p>유저정보를 불러올 수 없습니다.</p>;

	return (
		<ProfileWrapper>
			<h3>회원정보</h3>
			<ul>
				<li>
					<h4>로그인 정보</h4>
					<ul>
						<li>
							<div>
								<span>아이디(이메일)</span>
								<p>{userData.email}</p>
							</div>
						</li>
						<li>
							<div>
								<span>회원탈퇴</span>
								<button onClick={cancelMembership}>회원 탈퇴하기</button>
							</div>
							{/* <div>
								<span>비밀번호</span>
								<p>********</p>
							</div> */}
						</li>
					</ul>
				</li>

				<li>
					<h4>회원 정보</h4>
					<ul>
						<li>
							<div>
								<span>성명</span>
								<p>{userData.name}</p>
							</div>
						</li>
						<li>
							<div>
								<span>연락처</span>
								<p>{userData.phoneNumber}</p>
							</div>
						</li>
						{/* <li>
							<div>
								<span>생일</span>
								<p>2013년 8월 30일</p>
							</div>
						</li> */}
						<li>
							<div>
								<span>성별</span>
								<p>{userData.sex === 'female' ? '여' : '남'}</p>
							</div>
						</li>
						<li>
							<div>
								<span>주소정보</span>
								<p>
									{userData.mainAddress}
									{userData.detailAddress}
								</p>
							</div>
						</li>
						<li>
							<div>
								<span>자기소개</span>
								<p>{userData.introduce}</p>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</ProfileWrapper>
	);
};

const ProfileWrapper = styled.div`
	h3 {
		position: relative;
		padding-bottom: 10px;
		font-size: 22px;
		color: #000;
		line-height: 30px;
		font-weight: 500;
		text-align: left;
	}

	> ul {
		display: flex;
		flex-direction: column;
		text-align: left;

		> li {
			border-top: 4px solid #000;
			padding: 28px 0 35px;

			ul {
				padding: 20px 0 40px;

				li {
					max-width: 360px;
					margin-bottom: 16px;

					div {
						display: flex;
						align-items: center;
						color: #303033;
						font-size: 14px;
						line-height: 30px;

						span:first-child {
							display: inline-block;
							width: 70px;
							padding-right: 20px;
						}
						button {
							border: 1px solid #ccc;
							padding: 5px;
							border-radius: 5px;
						}
					}
				}
			}
		}
	}
`;

export default Profile;
