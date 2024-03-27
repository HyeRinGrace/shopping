import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import ProductManage from '../components/ProductManage';
import { addToManage } from '../store/manageSlice';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ProductInterface } from '../models/product';

const ProductMarket: React.FC = () => {
	const dispatch = useDispatch();
	const [quantity, setQuantity] = useState(1);
	const [showDiscount, setShowDiscount] = useState(false);
	const [isNew, setIsNew] = useState(false);
	//할인기간
	const [saleStartDate, setSaleStartDate] = useState(null);
	const [saleEndDate, setSaleEndDate] = useState(null);
	const [idCounter, setIdCounter] = useState(1);

	const option = ['WOMEN', 'MEN', 'DIGITAL', 'BEAUTY', 'KIDS', 'INTERIOR'];
	const subOption = ['의류', '가방', '신발', '악세사리'];

	const [productInfo, setProductInfo] = useState({
		id: idCounter,
		title: '',
		categoryId: '',
		subCategoryId: '',
		price: 0,
		brandId: '',
		description: '',
		image: '',
		quantity: 1,
		showDiscount: false,
		discountRate: 0,
		delivaryPrice: 0,
		isNew: false,
		saleStartDate: null as Date | null,
		saleEndDate: null as Date | null,
	});
	console.log(productInfo.id);
	//할인기간 핸들러
	const handleSaleStartDateChange = (date: Date | null) => {
		setProductInfo({
			...productInfo,
			saleStartDate: date,
		});
	};

	const handleSaleEndDateChange = (date: Date | null) => {
		setProductInfo({
			...productInfo,
			saleEndDate: date,
		});
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const {
			id,
			categoryId,
			subCategoryId,
			title,
			price,
			brandId,
			description,
			image,
			quantity,
			showDiscount,
			discountRate,
			delivaryPrice,
			isNew,
			saleStartDate,
			saleEndDate,
		} = productInfo;

		const updatedProductInfo: ProductInterface = {
			id,
			categoryId,
			subCategoryId,
			title,
			price,
			brandId,
			description,
			image,
			quantity,
			showDiscount,
			discountRate,
			delivaryPrice,
			isNew,
			saleStartDate,
			saleEndDate,
			category: '',
			thumbnail: '',
			rating: 0,
			option: '',
			name: '',
		};
		dispatch(addToManage(updatedProductInfo)); //디스패치하고
		setIdCounter(idCounter + 1);
		//비워
		setProductInfo({
			id: idCounter + 1,
			categoryId: '',
			subCategoryId: '',
			title: '',
			price: 0,
			brandId: '',
			description: '',
			image: '',
			quantity: 1,
			showDiscount: false,
			discountRate: 0,
			delivaryPrice: 0,
			isNew: false,
			saleStartDate: null,
			saleEndDate: null,
		});
		setQuantity(1);
		setIsNew(false);
		setShowDiscount(false);
		setSaleStartDate(null);
		setSaleEndDate(null);
	};

	const fileInputRef = useRef<HTMLInputElement | null>(null);
	//할인 유무 핸들러
	const discountHandler = () => {
		setShowDiscount(!showDiscount);
	};
	//신상 유무 핸들러
	const newHandler = () => {
		setIsNew(!isNew);
		setProductInfo(prevProductInfo => ({
			...prevProductInfo,
			isNew: !prevProductInfo.isNew,
		}));
	};

	//이미지 임포트
	const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files && event.target.files[0];
		if (file) {
			const imageUrl = URL.createObjectURL(file);
			setProductInfo({ ...productInfo, image: imageUrl });
		}
	};

	const handleImageClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	const handleDecreaseQuantity = () => {
		setQuantity(prevQuantity => prevQuantity - 1);
		setProductInfo(prevProductInfo => ({
			...prevProductInfo,
			quantity: quantity - 1,
		}));
	};

	const handleIncreaseQuantity = () => {
		setQuantity(prevQuantity => prevQuantity + 1);
		setProductInfo(prevProductInfo => ({
			...prevProductInfo,
			quantity: quantity + 1,
		}));
	};
	console.log(saleStartDate, saleEndDate);
	return (
		<>
			<ProductMarketWrapper>
				<ProductMarketTitle>
					<div>상품등록</div>
				</ProductMarketTitle>

				<ProductAdd>
					<ProductAddInput>
						<Label htmlFor='imageUpload'>
							<img
								src='https://cdn-icons-png.flaticon.com/512/1829/1829371.png'
								alt='카메라사진'
								onClick={handleImageClick}
							/>
						</Label>
						<input
							id='imageUpload'
							type='file'
							accept='image/*'
							onChange={handleImageUpload}
							ref={fileInputRef}
							style={{ display: 'none' }}
						/>
						<ProductImagePreview>
							{productInfo ? <img src={productInfo.image} /> : ''}
						</ProductImagePreview>
					</ProductAddInput>

					<ProductAddInput>
						신상품 <input type='checkbox' checked={isNew} onChange={newHandler} />
					</ProductAddInput>
					<ProductDiscount>
						할인
						<input type='checkbox' checked={showDiscount} onChange={discountHandler} />
						{showDiscount ? (
							<ProductDiscountInput>
								<DisCountRate>
									<input
										value={productInfo.discountRate}
										onChange={e => {
											setProductInfo({ ...productInfo, discountRate: Number(e.target.value) });
										}}
									/>
									%
								</DisCountRate>
								<DatePicker
									selected={productInfo.saleStartDate}
									onChange={handleSaleStartDateChange}
									selectsStart
									startDate={productInfo.saleStartDate}
									endDate={productInfo.saleEndDate}
									placeholderText='시작일'
								/>
								<DatePicker
									selected={productInfo.saleEndDate}
									onChange={handleSaleEndDateChange}
									selectsEnd
									startDate={productInfo.saleStartDate}
									endDate={productInfo.saleEndDate}
									placeholderText='종료일'
								/>
							</ProductDiscountInput>
						) : (
							''
						)}
					</ProductDiscount>

					<ProductAddInput>
						<div>카테고리</div>
						<select
							value={productInfo.categoryId}
							onChange={e => {
								const categoryId = e.target.value;
								setProductInfo({ ...productInfo, categoryId: categoryId });
							}}
						>
							<option value=''>카테고리</option>
							{option.map(it => (
								<option value={it} key={it}>
									{it}
								</option>
							))}
						</select>

						<select
							value={productInfo.subCategoryId}
							onChange={e => {
								const subCategoryId = e.target.value;
								setProductInfo({ ...productInfo, subCategoryId: subCategoryId });
							}}
						>
							<option value=''>서브카테고리</option>
							{subOption.map(it => (
								<option value={it} key={it}>
									{it}
								</option>
							))}
						</select>
					</ProductAddInput>
					<ProductAddInput>
						<div>이름</div>
						<input
							value={productInfo.title}
							onChange={e => {
								setProductInfo({ ...productInfo, title: e.target.value });
							}}
							placeholder='상품 이름을 입력하세요'
						></input>
					</ProductAddInput>
					<ProductAddInput>
						<div>브랜드</div>
						<input
							value={productInfo.brandId}
							onChange={e => {
								setProductInfo({ ...productInfo, brandId: e.target.value });
							}}
							placeholder='상품의 브랜드를 입력하세요'
						></input>
					</ProductAddInput>

					<ProductAddInput>
						<div>가격</div>
						<input
							value={productInfo.price}
							onChange={e => {
								setProductInfo({ ...productInfo, price: Number(e.target.value) });
							}}
							placeholder='상품의 가격을 입력하세요'
						></input>
					</ProductAddInput>
					<ProductAddInput>
						<div>배송비</div>
						<input
							value={productInfo.delivaryPrice}
							onChange={e => {
								setProductInfo({ ...productInfo, delivaryPrice: Number(e.target.value) });
							}}
						/>
					</ProductAddInput>
					<ProductAddInput>
						<div>설명</div>
						<input
							value={productInfo.description}
							onChange={e => {
								setProductInfo({ ...productInfo, description: e.target.value });
							}}
							placeholder='상품의 설명을 입력하세요'
						></input>
					</ProductAddInput>
					<ProductAddInput>
						<ProductAddCount>
							<ProductAddButton onClick={handleDecreaseQuantity}>-</ProductAddButton>
							<Quantity>
								<input
									type='number'
									value={quantity.toString()}
									onChange={e => setQuantity(parseInt(e.target.value, 10) || 0)}
								/>
							</Quantity>
							<ProductAddButton onClick={handleIncreaseQuantity}>+</ProductAddButton>
						</ProductAddCount>
					</ProductAddInput>
					<form onSubmit={handleSubmit}>
						<ProductMarketSubmit>
							<button type='submit'>등록하기</button>
						</ProductMarketSubmit>
					</form>
				</ProductAdd>
			</ProductMarketWrapper>
			<ProductManage />
		</>
	);
};

export default ProductMarket;

const ProductMarketWrapper = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 100px;
	justify-content: center;
	align-items: center;
`;

const ProductMarketTitle = styled.div`
	width: 50%;
	margin-bottom: 20px;
	font-weight: 700;
	font-size: 20px;
	border-bottom: 2px solid rgb(0, 0, 0);
	display: flex;
	justify-content: flex-start;
`;
const ProductAdd = styled.div`
	width: 50%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;
`;

const ProductAddInput = styled.div`
	display: flex;
	margin-bottom: 10px;
	justify-content: center;
	align-items: center;
	> div {
		margin-right: 10px;
	}
	> input {
		border: none;
		border-bottom: 1px solid #f4f4f4;
	}
`;
const ProductDiscount = styled.div`
	height: 20px;
	display: flex;
	align-items: center;
	margin-bottom: 10px;
`;
const ProductDiscountInput = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	> div {
		margin-right: 10px;
	}
	> input {
		border: none;
		border-bottom: 1px solid #f4f4f4;
	}
`;

const DisCountRate = styled.div`
	display: flex;
	align-items: center;
	margin-left: 10px;
	margin-bottom: 0;

	> input {
		margin-left: 10px;
		width: 30px;
		border: none;
		border-bottom: 1px solid #f4f4f4;
		margin-bottom: 0;
	}
`;

const ProductImagePreview = styled.div`
	> img {
		width: 50px;
		object-fit: cover;
	}
`;
const Label = styled.label`
	cursor: pointer;
	margin-right: 10px;
	> img {
		width: 50px;
		object-fit: cover;
		cursor: pointer;
	}
`;

const ProductMarketSubmit = styled.div`
	display: flex;
	margin-top: 10px;

	justify-content: center;
	> button {
		width: 100px;
		height: 30px;
		font-size: 14px;
		background-color: #fff;
		color: #000000;
		border: 1px solid #c4c4c4;
	}
`;

const ProductAddCount = styled.div`
	display: flex;
	align-items: center;
`;

const ProductAddButton = styled.button`
	background-color: #f0f0f0;
	border: none;
	padding: 5px 10px;
	font-size: 16px;
	cursor: pointer;
`;

const Quantity = styled.span`
	display: flex;
	align-items: center;
	width: 30px;
	font-size: 18px;

	> input {
		text-align: center;
		width: 30px;
		border: none;
	}
	> input::-webkit-outer-spin-button,
	> input::-webkit-inner-spin-button {
		-webkit-appearance: none;
	}
`;
