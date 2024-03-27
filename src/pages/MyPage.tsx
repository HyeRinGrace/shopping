import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import CategoryMenu from '../components/MyPage/CategoryMenu';
import Profile from '../components/MyPage/Profile';
import Purchase from '../components/MyPage/Purchase';
import Sale from '../components/MyPage/Sale';

const MyPage = () => {
	const location = useLocation();

	const category = useMemo(() => {
		const pathname = location.pathname;

		if (pathname === '/my/profile' || pathname === '/my') {
			return 'profile';
		}

		if (pathname === '/my/purchase') {
			return 'purchase';
		}

		if (pathname === '/my/sale') {
			return 'sale';
		}
	}, [location]);

	return (
		<MyPageContainer>
			<MyPageLeft>
				<CategoryMenu category={category} />
			</MyPageLeft>

			<MyPageRight>
				{category === 'profile' && <Profile />}
				{category === 'purchase' && <Purchase />}
				{category === 'sale' && <Sale />}
			</MyPageRight>
		</MyPageContainer>
	);
};

const MyPageContainer = styled.div`
	width: 1050px;
	margin: 100px auto;
	display: flex;
	justify-content: space-between;
`;

const MyPageLeft = styled.div`
	padding: 0 50px 0 0;
	display: flex;
	flex-direction: column;
	align-items: start;
	font-size: 14px;
	width: 230px;
`;

const MyPageRight = styled.div`
	flex: 1;
`;

export default MyPage;
