import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { ProductInterface } from '../models/product';
import { RootState, updateQuantity } from '../store/manageSlice';

const ProductManage: React.FC = () => {
	const dispatch = useDispatch();
	const productInfo = useSelector((state: RootState) => state.manage.products);

	const [editedProducts, setEditedProducts] = useState<{ [key: number]: boolean }>({});
	const [editedQuantities, setEditedQuantities] = useState<{ [key: number]: number }>({});
	//할인가격 코드
	const calculateDiscountedPrice = (originalPrice: number, discountRate: number) => {
		const price = Number(originalPrice);
		const rate = Number(discountRate);
		const discountedPrice = price - price * (rate / 100);
		return discountedPrice;
	};

	//수량 수정
	const editClickedHandler = (productId: number) => {
		setEditedProducts(prevEditedProducts => ({
			...prevEditedProducts,
			[productId]: true,
		}));
		//현재 값으로 수정된 수량을 초기화
		const currentQuantity = productInfo.find(product => product.id === productId)?.quantity || 0;
		setEditedQuantities(prevValue => ({
			...prevValue,
			[productId]: currentQuantity,
		}));
	};
	const handleEditedQuantityChange = (
		productId: number,
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const value = event.target.value;
		const parsedValue = value.trim() === '' ? undefined : parseInt(value, 10);
		setEditedQuantities(prevValue => {
			return {
				...prevValue,
				[productId]: parsedValue !== undefined ? parsedValue : 0,
			};
		});
	};
	const submitHandler = (productId: number) => {
		if (editedQuantities[productId] !== undefined) {
			dispatch(updateQuantity({ productId, newQuantity: editedQuantities[productId] }));
			// 클리어
			setEditedProducts(prevValue => ({
				...prevValue,
				[productId]: false,
			}));
		}
	};

	return (
		<>
			<ProductManageWrapper>
				<ProductManageTitle>
					<div>판매 관리</div>
				</ProductManageTitle>
				<ProductInfoCon>
					{productInfo &&
						productInfo.map((product: ProductInterface) => (
							<Products key={product.id}>
								<ProductManageImg>
									<img src={product.image} alt='판매 상품 이미지' />
								</ProductManageImg>
								<ProductText>
									<ProductManageInfoTitle>
										{product.isNew ? (
											<NewItem>
												<div>new</div>
												{product.title}
											</NewItem>
										) : (
											''
										)}
									</ProductManageInfoTitle>
									<ProductManageInfo>
										{product.categoryId} {product.subCategoryId}
									</ProductManageInfo>
									<ProductManageInfo>브랜드: {product.brandId}</ProductManageInfo>
									{product.discountRate ? (
										<>
											<DiscountPrice>
												가격:
												<BeforeDiscount>{Number(product.price).toLocaleString()}</BeforeDiscount>
												➡️
												{calculateDiscountedPrice(
													product.price,
													product.discountRate
												).toLocaleString()}
												원 {Number(product.discountRate)}%
											</DiscountPrice>

											<ProductManageInfo>
												할인기간:{' '}
												{product.saleStartDate && product.saleEndDate
													? `${product.saleStartDate.toLocaleDateString(
															'en-US'
													  )} ~ ${product.saleEndDate.toLocaleDateString('en-US')}`
													: 'N/A'}
											</ProductManageInfo>
										</>
									) : (
										<ProductManageInfo>가격:{product.price.toLocaleString()}원</ProductManageInfo>
									)}
									<ProductManageInfo>
										배송비:{product.delivaryPrice.toLocaleString()}원
									</ProductManageInfo>
									<ProductManageInfo>설명: {product.description}</ProductManageInfo>
									<ProductQuantity>
										{!editedProducts[product.id] ? (
											<>
												수량:{Number(product.quantity).toLocaleString()}
												<Edit onClick={() => editClickedHandler(product.id)}>수정</Edit>
											</>
										) : (
											<>
												수량:
												<input
													type='number'
													value={editedQuantities[product.id] || ''}
													onChange={e => handleEditedQuantityChange(product.id, e)}
												/>
												<Edit onClick={() => submitHandler(product.id)}>완료</Edit>
											</>
										)}
									</ProductQuantity>
								</ProductText>
							</Products>
						))}
				</ProductInfoCon>
			</ProductManageWrapper>
		</>
	);
};

export default ProductManage;

const NewItem = styled.div`
	font-weight: 700;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	> div {
		color: #ffff;
		display: flex;
		width: 40px;
		height: 20px;
		background-color: #000000;
		justify-content: center;
		align-items: center;
		border-radius: 50px;
		margin-right: 5px;
	}
`;

const ProductManageWrapper = styled.div`
	margin-top: 30px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;
const ProductManageTitle = styled.div`
	display: flex;
	justify-content: flex-start;
	width: 50%;
	font-weight: 700;
	margin-bottom: 20px;
	font-size: 20px;
	border-bottom: 2px solid rgb(0, 0, 0);
`;

const ProductInfoCon = styled.div`
	width: 50%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
`;
const Products = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 10px;
	border-bottom: 1px solid #f4f4f4;
`;

const ProductManageImg = styled.div`
	margin-right: 30px;
	> img {
		width: 100px;
	}
`;

const ProductText = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
`;

const ProductManageInfoTitle = styled.div`
	width: 100%;
	display: flex;
	font-weight: 700;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	margin-bottom: 10px;
`;
const ProductManageInfo = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	margin-bottom: 10px;
`;
const DiscountPrice = styled.div`
	width: 100%;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	margin-bottom: 10px;
`;

const BeforeDiscount = styled.div`
	color: #aeaeae;
`;
const ProductQuantity = styled.div`
	width: 100%;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	margin-bottom: 10px;
`;

const Edit = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 40px;
	height: 20px;
	background-color: #f0f0f0;
	border: none;
	padding: 5px 10px;
	font-size: 10px;
	cursor: pointer;
	border-radius: 30px;
	margin-left: 10px;
`;
