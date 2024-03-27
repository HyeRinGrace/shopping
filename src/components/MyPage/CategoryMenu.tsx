import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

interface Props {
	category: string | undefined;
}

const CategoryMenu: React.FC<Props> = ({ category }) => {
	const navigate = useNavigate();

	const goToProfilePage = useCallback(() => {
		navigate('/my/profile');
	}, []);

	const goToPurchasePage = useCallback(() => {
		navigate('/my/purchase');
	}, []);

	const goToSalePage = useCallback(() => {
		navigate('/my/sale');
	}, []);

	return (
		<CategoryWrapper>
			<h3>My</h3>
			<span>나의 정보</span>
			<ul>
				<li className={category === 'profile' ? 'active' : ''}>
					<button onClick={goToProfilePage}>프로필</button>
				</li>

				<li className={category === 'purchase' ? 'active' : ''}>
					<button onClick={goToPurchasePage}>주문내역 조회</button>
				</li>

				<li className={category === 'sale' ? 'active' : ''}>
					<button onClick={goToSalePage}>상품 등록</button>
				</li>
			</ul>
		</CategoryWrapper>
	);
};

const CategoryWrapper = styled.div`
	text-align: left;

	h3 {
		font-size: 40px;
		font-weight: 700;
		margin-bottom: 40px;
	}

	span {
		margin-bottom: 8px;
		font-size: 17px;
		line-height: 26px;
		font-weight: 800;
		color: #303033;
	}

	ul {
		display: flex;
		flex-direction: column;
		align-items: start;

		li {
			button {
				padding: 10px 10px;
				font-size: 15px;
				font-weight: 200;
				color: '#5d5d5d';
				cursor: pointer;

				&:hover {
					color: #000;
				}
			}

			&.active button {
				font-weight: 400;
				color: #000;
			}
		}
	}
`;

export default CategoryMenu;
