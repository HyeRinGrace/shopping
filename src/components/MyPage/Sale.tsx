import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Sale: React.FC = () => {
	const navigate = useNavigate();

	const goToMyProductPage = useCallback(() => {
		navigate('/myproduct');
	}, []);

	return (
		<ProfileWrapper>
			<button onClick={goToMyProductPage}>상품 등록하기</button>
			<p>* 버튼을 클릭하시면 상품 등록 페이지로 이동합니다.</p>
		</ProfileWrapper>
	);
};

const ProfileWrapper = styled.div`
	display: flex;
	justify-content: start;
	align-items: center;
	margin-top: 20px;
	padding-top: 20px;
	border-top: 4px solid #000;

	button {
		padding: 10px 20px;
		font-size: 22px;
		color: #000;
		line-height: 30px;
		font-weight: 500;
		// margin-top: 20px;
		border: 1px solid #ccc;
		border-radius: 10px;
	}
	p {
		margin-left: 10px;
	}
`;

export default Sale;
