import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import ProductCount from '../../components/ProductCount/ProductCount';
import ProductDesc from '../../components/ProductDesc/ProductDesc';
import ProductOption from '../../components/ProductOption/ProductOption';
import { addToCart } from '../../store/cartSlice'; //CartSlice 작업 추가(김혜린)
import axios from 'axios';
// import { setProductsData } from '../../store/productsSlice';
import { fetchProducts, ProductsState } from '../../store/productsSlice';
import { AppDispatch } from '../../store/store';

const ProductDetail: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

	const { id } = useParams<{ id?: string }>();
	// const idAsNumber = parseInt(id, 10);

	const productData = useSelector((state: ProductsState) => state.products.data);
	const selectedProduct = productData.data; //상품 리스트 나오면 삭제
	const optionList = selectedProduct && selectedProduct.optionList;
	const optionId = selectedProduct && selectedProduct.optionList[0].optionId;

	const [showPopup, setShowPopup] = useState(false);

	// const productsArray = productData.products;  //나중에 상품리스트 나오면 이걸로 바꾸기
	// const selectedProduct =
	// 	productsArray && productsArray.find((it: { id: number }) => it.id === idAsNumber); // 상품정보 id값으로 받아올 변수선언(김혜린)

	const discountPer = 50;
	//할인된 값
	const currentPrice = selectedProduct
		? selectedProduct.price - (selectedProduct.price * discountPer) / 100
		: 0;

	const reviewNum = selectedProduct ? selectedProduct.rating : 0;

	const [selectedQuantity, setSelectedQuantity] = useState<number>(1); // Producount에서 선택된 수량 전달받기

	const gotoMyBag = () => {
		setShowPopup(false); // 팝업을 닫는 로직 추가 (김혜린)
		navigate('/mybag');
	};

	const gotoShipping = () => {
		navigate('/ShippingPage');
	};

	// putCart 영역 선택된 값만 받아올 수 있도록 addTocart 따로 추가했습니다. (김혜린)
	const putCart = async () => {
		if (selectedProduct) {
			const updatedProduct = {
				...selectedProduct,
				price: currentPrice,
			};

			const requestData = {
				count: selectedQuantity,
				optionId: optionId,
			};

			try {
				const response = await axios.post(
					'https://shoppingmall.o-r.kr/api/v1/cart/1',
					requestData,
					{
						headers: {
							'Content-Type': 'application/json',
						},
					}
				);

				if (response.status === 200) {
					console.log('Item added to cart:', response.data);
				} else {
					console.error('Error adding item to cart:', response.data);
				}
			} catch (error) {
				console.error('Error adding item to cart:', error);
			}

			dispatch(
				addToCart({
					product: updatedProduct,
					quantity: selectedQuantity,
					option: optionId,
				})
			);
		}
		setShowPopup(true);
	};

	const xbutton = () => {
		setShowPopup(false);
	};

	useEffect(() => {
		if (id) {
			dispatch(fetchProducts());
		}
	}, [dispatch, id]);

	return (
		<ProductDetailWrapper>
			<div className='product-detail'>
				{selectedProduct && (
					<ProductDetailInfoCon>
						<DetailInfoConImg
							// src={selectedProduct.thumbnail}
							src='https://img.29cm.co.kr/next-product/2023/05/03/03eafb89a29045bd818b3600b2bcae18_20230503165832.jpg?width=700'
							alt={selectedProduct.title}
						></DetailInfoConImg>
						<DetailInfoCon>
							<ProductBrand>
								<BrandInfoCon>{selectedProduct.brand}</BrandInfoCon>
							</ProductBrand>
							<InfoConTextBox>
								<TextBoxText>
									<InfoTextBox>
										<InfoTextBoxTitle>{selectedProduct.name}</InfoTextBoxTitle>
										<InfoTextBoxHeart></InfoTextBoxHeart>
										<InfoTextReviewCon>
											<ReviewConStars></ReviewConStars>
											<ReviewConText>{reviewNum}</ReviewConText>
										</InfoTextReviewCon>
									</InfoTextBox>

									<InfoTextPriceCon>
										<PrevPrice>{selectedProduct.price}$</PrevPrice>
										<CurrentPriceCon>
											<DiscountPer>{discountPer}%</DiscountPer>
											<CurrentPrice>{currentPrice}$</CurrentPrice>
										</CurrentPriceCon>
									</InfoTextPriceCon>
								</TextBoxText>
								<TextBoxShipping>
									<ShippingTitle>배송정보</ShippingTitle>
									<ShippingInfo>
										<div>배송비 {selectedProduct.deliveryPrice}원</div>
										{/* <div>배송기간</div> */}
									</ShippingInfo>
								</TextBoxShipping>
							</InfoConTextBox>
							{/* 카운트 함수가 동작할떄, 상태 업데이트 되도록 수정(김혜린) */}
							<ProductCount
								onQuantityChange={(quantity: number) => setSelectedQuantity(quantity)}
							/>
							{/* 옵션 함수가 동작할때, 상태 업데이트 되도록 수정(김혜린)*/}
							{/* <ProductOption
								onOptionChange={function (_option: string): void {
									throw new Error('Function not implemented.');
								}}
							/> */}
							<ProductOption optionList={optionList} />
							<DetailButtonCon>
								<ButtonConCart onClick={putCart}>장바구니 담기</ButtonConCart>
								<ButtonConPurchase onClick={gotoShipping}>바로 구매하기</ButtonConPurchase>
							</DetailButtonCon>
						</DetailInfoCon>
						{showPopup && (
							<Popup>
								<PopupXButton>
									<button onClick={xbutton}>X</button>
								</PopupXButton>
								<p>장바구니에 상품이 담겼습니다</p>
								<PopupButton>
									<button onClick={gotoMyBag}>장바구니 바로가기</button>
								</PopupButton>
							</Popup>
						)}
					</ProductDetailInfoCon>
				)}
				<ProductDesc selectedProduct={selectedProduct} />
			</div>
		</ProductDetailWrapper>
	);
};
//Styled Component
const ProductDetailWrapper = styled.div`
	margin-top: 120px;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	> div {
		width: 80%;
	}
`;

const ProductBrand = styled.div`
	display: flex;
	margin-bottom: 10px;
`;

const BrandInfoCon = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	font-weight: 700;
`;

const ProductDetailInfoCon = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	margin-bottom: 20px;
`;

const DetailInfoConImg = styled.img`
	width: 300px;
	height: 300px;
`;

const DetailInfoCon = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: space-between;
	margin-left: 45px;
`;

const InfoConTextBox = styled.div`
	width: 100%;
`;

const TextBoxText = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	padding-bottom: 16px;
	border-top: 2px solid #000000;
	border-bottom: 1px solid #f4f4f4;
`;

const InfoTextBox = styled.div`
	display: flex;
	width: 100%;
	height: 100%;
	align-items: center;
	justify-content: space-between;
`;

const InfoTextBoxTitle = styled.h2`
	font-size: 18px;
	width: 80%;
	font-weight: 600;
	margin-top: 10px;
	margin-bottom: 5px;
	text-align: left;
`;

const InfoTextBoxHeart = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 10%;
	height: 100%;
`;

const InfoTextReviewCon = styled.div`
	display: flex;
	align-items: center;
`;

const ReviewConStars = styled.div`
	margin-right: 12px;
`;

const ReviewConText = styled.div`
	color: #5d5d5d;
	font-size: 11px;
	font-weight: 500;
	border-bottom: 0.5px solid #5d5d5d;
`;

const InfoTextPriceCon = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
`;

const PrevPrice = styled.div`
	font-size: 16px;
	font-weight: 500;
	color: #c4c4c4;
`;

const CurrentPriceCon = styled.div`
	display: flex;
`;

const DiscountPer = styled.div`
	font-size: 22px;
	color: #ff4800;
	font-weight: 600;
	margin-right: 6px;
`;

const CurrentPrice = styled.div`
	margin-left: 4px;
	color: rgb(0, 0, 0);
	font-size: 22px;
	font-weight: 600;
`;

const TextBoxShipping = styled.div`
	width: 100%;
	height: 40%;
	font-size: 13px;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: flex-start;
	padding: 16px 0;
	border-bottom: 1px solid #f4f4f4;
	margin-bottom: 20px;
`;

const ShippingTitle = styled.div`
	font-weight: 700;
`;

const ShippingInfo = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
`;

const DetailButtonCon = styled.div`
	display: flex;
	width: 100%;
	margin-top: 20px;
`;

const ButtonCon = styled.button`
	width: 100%;
	font-size: 14px;
`;

const ButtonConCart = styled(ButtonCon)`
	background-color: #fff;
	color: #000000;
	border: 1px solid #c4c4c4;
	margin-right: 5px;
	height: 50px;
`;

const ButtonConPurchase = styled(ButtonCon)`
	background-color: #000000;
	border: 1px solid #000000;
	color: #fff;

	&:hover {
		background-color: #ff4800;
		border: 1px solid #ff4800;
	}
`;

const Popup = styled.div`
	position: fixed;
	width: 30%;
	height: 20%;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: white;
	padding: 20px;
	border-radius: 8px;
	box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
	z-index: 999;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const PopupXButton = styled.div`
	position: absolute;
	right: 20px;
	top: 10px;
`;

const PopupButton = styled.div`
	width: 150px;
	height: 30px;
	border: 1px solid #c4c4c4;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 3px;
	margin-top: 20px;
`;

export default ProductDetail;
