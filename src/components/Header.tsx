import React, { useEffect } from 'react';
import styled from 'styled-components';
import { BsFillPersonFill } from 'react-icons/bs';
import { PiHandbagBold } from 'react-icons/pi';
import { RiLoginBoxLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/loginSlice';
import { RootState } from '../store/store';
import { devices } from '../assets/styles/constants';
import { clearTokenResetTimer } from '../util/util';

const Header: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isLogin = useSelector((state: RootState) => state.login.isLogin);

	const myHandler = () => {
		if (isLogin) {
			navigate('/my');
		} else {
			navigate('/login');
		}
	};
	const mybagHandler = () => {
		if (isLogin) {
			navigate('/mybag');
		} else {
			navigate('/login');
		}
	};

	const logoutHandler = async () => {
		if (isLogin) {
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
			clearTokenResetTimer();
			localStorage.setItem('ACCESS-TOKEN', '');
			dispatch(login(false));
		} else {
			navigate('/login');
		}
	};
	const homeHandler = () => {
		navigate('/');
	};

	const categoryHandler = (event: any) => {
		const value = event.target.getAttribute('data-value');
		navigate(`/category/${value}?code=1`);
	};
	useEffect(() => {}, [isLogin]);
	//console.log(isLogin);
	const category = [
		{ value: 'women', name: 'WOMEN' },
		{ value: 'men', name: 'MEN' },
		{ value: 'digital', name: 'DIGITAL' },
		{ value: 'interior', name: 'INTERIOR' },
	];
	return (
		<SHeader>
			<div className='header-wrapper'>
				<div className='header-navigation'>
					<div>
						<div className='temp-logo' onClick={homeHandler}>
							GD Mall
						</div>
					</div>
					<div className='navigation'>
						<div className='home' onClick={homeHandler}>
							Home
						</div>
					</div>
				</div>
				<div className='category'>
					{category?.map((item, index) => (
						<button data-value={item.value} onClick={categoryHandler} key={`button-${index}`}>
							{item.name}
						</button>
					))}
				</div>
				<div className='header-menu'>
					<div className='menu-container'>
						<div className='mypage' onClick={myHandler}>
							<div className='menu-icon'>
								<BsFillPersonFill />
							</div>
							<span>마이페이지</span>
						</div>
						<div className='mybag' onClick={mybagHandler}>
							<div className='menu-icon'>
								<PiHandbagBold />
							</div>
							<span>장바구니</span>
						</div>
						<div className='login' onClick={logoutHandler}>
							<div className='menu-icon'>
								<RiLoginBoxLine />
							</div>
							<span>{isLogin ? '로그아웃' : '로그인'}</span>
						</div>
					</div>
				</div>
			</div>
		</SHeader>
	);
};

export default Header;

const SHeader = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;

	z-index: 100;
	height: 80px;
	background: #000;
	color: #fff;

	.header-wrapper {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 100%;
		.header-navigation {
			display: flex;
			justify-content: center;
			align-items: flex-start;
			height: 100%;

			.temp-logo {
				display: flex;
				justify-content: center;
				align-items: center;
				text-align: center;
				font-size: 50px;
				margin-top: 10px;
				margin-left: 30px;
				margin-right: 70px;
				cursor: pointer;
			}
			.navigation {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				.home {
					display: flex;
					justify-content: center;
					align-items: center;
					text-align: center;
					margin-top: 30px;
					font-size: 20px;
					cursor: pointer;
				}
			}
		}
		.category {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			button {
				color: white;
				margin: 1rem;
			}
		}
		.menu-container {
			display: flex;
			justify-content: center;
			align-items: center;
			gap: 20px;
			margin-right: 50px;
			margin-top: 10px;

			.mypage,
			.mybag,
			.login {
				display: flex;
				flex-direction: column;
				margin-right: 10px;
				align-items: center;
				cursor: pointer;
				span {
					font-size: 10px;
				}
			}

			.menu-icon {
				font-size: 30px;
			}
		}
	}
	@media ${devices.md} {
		min-width: 0px;
		height: 60px;
		.header-wrapper {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.header-navigation {
				display: flex;
				justify-content: center;
				align-items: flex-start;
				height: 100%;

				.temp-logo {
					display: flex;
					justify-content: center;
					align-items: center;
					text-align: center;
					font-size: 1.5rem;
					letter-spacing: 5px;
					margin-top: 10px;
					margin-left: 30px;
					margin-right: 70px;
					cursor: pointer;
				}
				.navigation {
					display: flex;
					justify-content: flex-start;
					align-items: center;
					.home {
						display: none;
					}
				}
			}
			.category {
				display: none;
			}
			.menu-container {
				display: flex;
				justify-content: center;
				align-items: center;
				gap: 0.5rem;
				margin-right: 10px;
				margin-top: 0px;

				.mypage,
				.mybag,
				.login {
					display: flex;
					flex-direction: column;
					margin-right: 10px;
					align-items: center;
					cursor: pointer;
					span {
						display: none;
					}
				}
				.menu-icon {
					font-size: 1.5rem;
				}
			}
		}
	}
`;
