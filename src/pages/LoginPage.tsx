import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import kakao from '../assets/kakao_login_medium_narrow.png';
import naver from '../assets/btnG_완성형.png';
import { login } from '../store/loginSlice';
import { RootState } from '../store/store';
import { setTokenResetTimer } from '../util/util';

// interface form 설정 필요
axios.defaults.withCredentials = true;

const LoginPage: React.FC = () => {
	let JWT_EXPIRY_TIME = 3600 * 1000;
	const count = useRef(0);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [form, setForm] = useState({
		email: '',
		password: '',
	});
	const [valid, isValid] = useState({
		isEmail: false,
		isPassword: false,
	});
	const [touched, isTouched] = useState({
		email: false,
		password: false,
	});
	const [status, setStatus] = useState<string>('');
	const emailInputInValid = !valid.isEmail && touched.email;
	const passwordInputInValid = !valid.isPassword && touched.password;
	const checkLogout = useSelector((state: RootState) => state.login.isLogin);
	const signupHandler = () => {
		navigate('/signup');
	};

	// 토큰이 만료되었을 때
	const resetToken = async () => {
		const token = localStorage.getItem('ACCESS-TOKEN');
		const res = await fetch('https://shoppingmall.o-r.kr/api/v1/user/logout', {
			method: 'POST',
			headers: {
				'ACCESS-TOKEN': `${token}`,
			},
			body: {} as any,
		});
		const json = await res.json();
		console.log(json);
		localStorage.setItem('ACCESS-TOKEN', '');
		//localStorage.setItem('userId', )
		alert('인증이 만료되어 재 로그인이 필요합니다.');
		dispatch(login(false));
		navigate('/login');
	};
	const formSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const emailRegex =
			/([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
		const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
		isTouched({ email: true, password: true });
		isValid({ isEmail: true, isPassword: true });
		if (form.email.trim() === '' || !emailRegex.test(form.email)) {
			console.log('email fail');
			isValid({ isEmail: false, isPassword: true });
			count.current = count.current + 1;
		} else if (!passwordRegex.test(form.password)) {
			console.log('password fail');
			isValid({ isEmail: true, isPassword: false });
			count.current = count.current + 1;
		} else {
			const data = {
				email: form.email,
				password: form.password,
			};

			try {
				const response = await axios.post('https://shoppingmall.o-r.kr/api/v1/user/login', data, {
					headers: {
						'Content-Type': 'application/json',
					},
				});
				console.log(response);
				console.log(response.data.data.userId);
				const userId = response.data.data.userId;
				const token = response.headers['access-token'];
				localStorage.setItem('ACCESS-TOKEN', token);
				localStorage.setItem('userId', userId);
				dispatch(login(true));
				setStatus('success');
				setTokenResetTimer(setTimeout(resetToken, JWT_EXPIRY_TIME));
				navigate('/');
			} catch (error) {
				dispatch(login(false));
				setStatus('fail');
				count.current = count.current + 1;
				console.log(error);
			}
		}
		setForm({ email: '', password: '' });
	};

	// Refresh-token 재발급 테스트
	// Refresh-token 만료가 되었거나 값이 없거나 이럴 때, 로그인 필요
	/*const testReissue = async () => {
		const res = await fetch(
			'http://ec2-43-200-191-31.ap-northeast-2.compute.amazonaws.com:8080/api/v1/user/validate',
			{
				method: 'POST',
				headers: {
					'ACCESS-TOKEN': `${checkLogout.token}`,
				},
				body: {} as any,
			}
		);
		//console.log(res);
		const json = await res.json();
		console.log(json);
	};*/

	// Access-token 유효한지 확인
	const testValidate = async () => {
		const token = localStorage.getItem('ACCESS-TOKEN');
		// console.log(token);
		// try {
		// 	const response = await axios.post('https://shoppingmall.o-r.kr/api/v1/user/validate', null, {
		// 		headers: {
		// 			'Content-Type': 'application/json',
		// 			'ACCESS-TOKEN': `${token}`,
		// 		},
		// 	});
		// 	console.log(response);
		// } catch (error) {
		// 	console.log(error);
		// }
		const res = await fetch('https://shoppingmall.o-r.kr/api/v1/user/validate', {
			method: 'POST',
			headers: {
				'ACCESS-TOKEN': `${token}`,
			},
			body: {} as any,
		});
		//console.log(res);
		const json = await res.json();
		console.log(json);
	};

	useEffect(() => {}, [checkLogout]);
	// 로그아웃을 하면
	// 전에 쓰던 토큰은 지우고, 재발급받을 때도 지우고
	// console.log(checkLogout);
	return (
		<SLogin>
			<div className='wrapper'>
				<h2 className='title'>로그인</h2>
				<div className='underline'>
					<form onSubmit={formSubmitHandler}>
						<div className='form-box'>
							<input
								type='text'
								className='input-id'
								placeholder='아이디 (이메일)'
								autoCapitalize='none'
								name='username'
								value={form.email}
								onChange={e => setForm({ ...form, email: e.target.value })}
							/>
							{emailInputInValid && <p className='err-message'>* 아이디 형식이 맞지 않습니다.</p>}
						</div>
						<div className='form-box'>
							<input
								type='password'
								className='input-password'
								placeholder='비밀번호'
								autoCapitalize='none'
								name='password'
								value={form.password}
								onChange={e => setForm({ ...form, password: e.target.value })}
							/>
							{passwordInputInValid && (
								<p className='err-message'>* 비밀번호 형식이 맞지 않습니다.</p>
							)}
						</div>
						{count.current <= 4 && count.current !== 0 && (
							<p className='login-fail'>
								5회 로그인 실패 시, 로그인이 10분 동안 제한됩니다.({count.current}/5)
							</p>
						)}
						{status === 'fail' && <p className='login-fail'>아이디나 비밀번호가 틀렸습니다.</p>}
						<button className='btn-login' type='submit'>
							로그인하기
						</button>
					</form>
					<div className='container-sns_login'>
						<h3 className='title-sns'>SNS 계정으로 로그인하기</h3>
						<div className='container-sns'>
							<div className='sns'>
								<div className='btn-sns_kakao' onClick={testValidate}>
									<img src={kakao} alt='카카오 로그인' />
								</div>
							</div>
							<div className='sns'>
								<div className='btn-sns_naver'>
									<img src={naver} alt='네이버 로그인' />
								</div>
							</div>
						</div>
					</div>
					<div className='container-signup' onClick={signupHandler}>
						간편 회원가입하기
					</div>
				</div>
			</div>
		</SLogin>
	);
};

export default LoginPage;

const SLogin = styled.div`
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
			margin-bottom: 20px;
			color: #000;
			font-size: 44px;
			font-weight: 500;
			text-align: center;
		}

		.underline {
			padding-top: 18px;
			border-top: 4px solid #000;

			.login-fail {
				margin-bottom: 5px;
				color: rgb(255, 72, 0);
				font-size: 13px;
				line-height: 20px;
				word-break: keep-all;
			}

			form {
				padding: 0;
				margin: 0;

				.form-box {
					margin-top: 8px;
					margin-bottom: 8px;

					.err-message {
						font-size: 13px;
						color: red;
						margin-left: 5px;
						display: flex;
					}

					.input-id {
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

					.input-password {
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
				}
				.btn-login {
					display: flex;
					justify-content: center;
					align-items: center;
					min-width: 40px;
					min-height: 25px;
					width: 100%;
					height: 56px;
					margin: 20px 0 0;
					background: #000;
					border-radius: 2px;
					color: #fff;
					font-size: 16px;
					line-height: 56px;
					font-weight: 600;
				}
			}
			.container-sns_login {
				margin: 35px 0;

				.title-sns {
					margin-bottom: 20px;
					font-weight: 500;
					font-size: 16px;
					text-align: center;
					line-height: 1.3;
					color: #000;
					margin: 0px;
					padding: 0px;
				}
				.container-sns {
					display: flex;
					justify-content: center;
					align-items: center;
					gap: 25px;

					.sns {
						.btn-sns_kakao {
							margin-top: 10px;

							img {
								height: 40px;
							}
						}
						.btn-sns_naver {
							margin-top: 10px;
							img {
								height: 40px;
							}
						}
					}
				}
			}
			.container-signup {
				display: block;
				height: 56px;
				border: 1px solid #5d5d5d;
				border-radius: 28px;
				box-sizing: border-box;
				font-weight: 600;
				font-size: 14px;
				color: #1d1d1d;
				text-align: center;
				line-height: 56px;
				cursor: pointer;
			}
		}
	}
`;
