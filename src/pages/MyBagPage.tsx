import React, {useCallback,useMemo} from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { increaseQuantity, decreaseQuantity, removeProduct } from '../store/cartSlice';
import { ProductInterface } from '../models/product';
import { createAction } from '@reduxjs/toolkit';
// import ProductOption from '../components/ProductOption/ProductOption';

// 장바구니에 상품 추가 액션 생성
export const addToCart = createAction<ProductInterface>('cart/add');

// 나의 장바구니 페이지 컴포넌트
const MyBagPage: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const products = useSelector((state: RootState) => state.cart.products);

	// 감소 함수
	const handleDecreaseQuantity = useCallback(
		(index: number) => {
			dispatch(decreaseQuantity(index));
		},
		[dispatch]
	);

	// 증가 함수₩`
	const handleIncreaseQuantity = useCallback(
		(index: number) => {
			dispatch(increaseQuantity(index));
		},
		[dispatch]
	);

	// 삭제 함수
	const handleRemoveProduct = useCallback(
		(index: number) => {
			dispatch(removeProduct(index));
		},
		[dispatch]
	);

	// 총 가격 계산
	const totalPrice = useMemo(() => {
		return products.reduce((total: number, product: { price: any; quantity: any }) => {
			return total + (Number(product.price) || 1) * (Number(product.quantity) || 1);
		}, 0);
	}, [products]);

	// 이전 페이지로 돌아가는 함수
	const goBackToPreviousPage = () => {
		navigate(-2);
	};

	return (
		<MyBagPageContainer>
			<TotalPrice>Total: ${totalPrice.toFixed(2)}</TotalPrice>
			<Title>Cart</Title>
			{products.length === 0 ? (
				<EmptyMessage>장바구니에 담긴 물품이 없습니다.</EmptyMessage>
			) : (
				products.map((product, index) => (
					<ProductCard key={index}>
						<ProductImage
							src='https://img.29cm.co.kr/next-product/2023/05/03/03eafb89a29045bd818b3600b2bcae18_20230503165832.jpg?width=700'
							// src={product.thumbnail} 이미지 url이 제대로 안나와서 제가 다른걸로 일단 넣어놓겠습니다 ㅠㅠ
							alt={product.title}
						/>
						<ProductDetails>
							<ProductName>{product.title}</ProductName>
							<ProductDescription>{product.description}</ProductDescription>
							<ProductPriceAndQuantity>
								<ProductPrice>${Number(product.price).toFixed(1)}</ProductPrice>
								<QuantityButtons>
									<QuantityButton onClick={() => handleDecreaseQuantity(index)}>-</QuantityButton>
									<Quantity>{Number(product.quantity) || 1}</Quantity>
									<QuantityButton onClick={() => handleIncreaseQuantity(index)}>+</QuantityButton>
								</QuantityButtons>
							</ProductPriceAndQuantity>
						</ProductDetails>
						<RemoveButton onClick={() => handleRemoveProduct(index)}>X</RemoveButton>
					</ProductCard>
				))
			)}

			<ButtonContainer>
				<ContinueShoppingButton onClick={goBackToPreviousPage}>
					쇼핑 계속하기
				</ContinueShoppingButton>
				{products.length !== 0 && (
					<PaymentButton onClick={() => navigate('/ShippingPage')}>결제하기</PaymentButton>
				)}
			</ButtonContainer>
		</MyBagPageContainer>
	);
};

export default MyBagPage;

// CSS 코드
const Title = styled.h1`
	padding-top: 50px;
	font-size: 2em;
	margin-bottom: 20px;
	color: #333;
	border-bottom: 2px solid #333;
	padding-bottom: 10px;
`;

const MyBagPageContainer = styled.div`
	margin-top: 80px;
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 20px;
`;

const ProductImage = styled.img`
	width: 100px;
	height: 100px;
	object-fit: cover;
	margin-right: 16px;
`;

const ProductName = styled.h3`
	margin: 0;
	margin-bottom: 10px;
	text-align: left;
`;

const ProductPrice = styled.p`
	margin: 8px 0;
`;

const ProductDescription = styled.p`
	margin: 0;
	text-align: left;
`;

const ProductDetails = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

const ProductPriceAndQuantity = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const QuantityButtons = styled.div`
	display: flex;
	align-items: center;
`;

const Quantity = styled.div`
	padding: 0 10px;
`;

const QuantityButton = styled.button`
	padding: 5px;
	border: 1px solid #ccc;
	border-radius: 5px;
	background-color: #f0f0f0;
	cursor: pointer;
`;

const ProductCard = styled.div`
	width: 80%;
	margin-top: 30px;
	border: 1px solid #ccc;
	border-radius: 10px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	padding: 20px;
	margin-bottom: 20px;
	display: flex;
	align-items: center;
`;

const TotalPrice = styled.p`
	position: absolute;
	top: 20px;
	right: 20px;
	font-size: 1.5em;
	font-weight: bold;
`;

const RemoveButton = styled.button`
	margin-left: 10px;
	padding: 5px;
	border: 1px solid #ccc;
	border-radius: 5px;
	background-color: #f0f0f0;
	cursor: pointer;
`;

const PaymentButton = styled.button`
	padding: 10px 20px;
	margin-top: 20px;
	background-color: #333;
	color: white;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	font-size: 1.2em;
`;

const ContinueShoppingButton = styled.button`
	padding: 10px 20px;
	margin-top: 20px;
	background-color: #333;
	color: white;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	font-size: 1.2em;
`;

const ButtonContainer = styled.div`
	display: flex;
	justify-content: center;
	gap: 20px;
	margin-top: 20px;
`;

const EmptyMessage = styled.p`
	flex-grow: 1;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 200px;
	font-size: 1.5em;
	color: #555;
	text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
	padding: 10px;
`;
