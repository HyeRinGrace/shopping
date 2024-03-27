import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { devices } from '../../assets/styles/constants';

interface ProductCardProps {
	isSale?: boolean;
	'data-is-sale'?: string | boolean;
}
const Product = ({ product }: any) => {
	const now: Date = new Date();
	const nowMilliseconds: number = now.getTime();
	const endDate: Date = new Date(product.saleEndDate);
	const endMilliseconds: number = endDate.getTime();

	const isSale: boolean = endMilliseconds - nowMilliseconds > 0 ? true : false;

	return (
		<ProductCard data-is-sale={isSale}>
			<Link to={`/product/${product.id}`}>
				<ProductImage data-is-sale={isSale}>
					{/* <img src={product.imageUrl} alt={product.name} /> */}
					<div>
						<img
							src={
								'https://img.29cm.co.kr/item/202308/11ee35923504abf7aa4f312e96f92cf3.jpg?width=400'
							}
							alt={product.name}
						/>
					</div>
					{!isSale && (
						<div className='sale-text'>
							<p>판매 기간이 종료되었습니다.</p>
						</div>
					)}
				</ProductImage>
				<ProductTitle>
					{/* <p>{product.category}</p> */}
					<h5>{product.name}</h5>
					<strong>{product.name}</strong>
				</ProductTitle>
				<ProductInfo>
					{product.discountRate > 0 && <Discount>{`${product.discountRate}%`}</Discount>}
					{product.discountRate > 0 && (
						<DiscountedPrice>
							{`${Math.round(product.price * (1 - product.discountRate / 100))}`}
						</DiscountedPrice>
					)}
					{!product.discountRate && <Price>{product.price}</Price>}
				</ProductInfo>
				<ProductInfo2>
					<ul>
						{/* <li color='#1d1d1d'>쿠폰</li> */}
						{product.isNew && <li color='#1d1d1d'>신상품</li>}
					</ul>
				</ProductInfo2>
			</Link>
		</ProductCard>
	);
};

const ProductCard = styled.div<ProductCardProps>`
	display: flex;
	flex-direction: column;
	margin-bottom: 1rem;
	text-align: left;
	font-size: 16px;
	font-family: campton, 'Apple SD Gothic Neo', NanumBarunGothic, 나눔바른고딕, 'Malgun Gothic',
		'맑은 고딕', dotum, sans-serif;
	background-color: ${props => (props['data-is-sale'] ? '' : 'rgba(157, 158, 157, 0.7)')};
	pointer-events: ${props => (props['data-is-sale'] ? '' : 'none')};
	opacity: ${props => (props['data-is-sale'] ? 1 : 0.6)};
`;

const ProductTitle = styled.div`
	margin-bottom: 0.8rem;
	h5 {
		margin-top: 0.5rem;
		text-decoration: underline;
		margin-bottom: 0.5rem;
	}
	strong {
		color: rgb(157, 158, 157);
		line-height: 1;
		font-weight: normal;
		line-height: 1.4;
	}
	@media screen and (${devices.md}) {
		h5 {
			text-decoration: underline;
		}
		strong {
			color: rgb(157, 158, 157);
			line-height: 1;
			font-weight: normal;
		}
	}
`;

const ProductInfo = styled.div`
	div {
		display: flex;
		justify-content: space-between;
	}
`;
const Discount = styled.span`
	margin-right: 0.5rem; /* 여백을 조정할 수 있는 값으로 변경하세요 */
	color: var(--ruler-scale-color-red-500);
	font-weight: bold;
`;

const DiscountedPrice = styled.strong`
	color: var(--ruler-scale-color-red-500);
`;
const Price = styled.div`
	font-weight: bold;
`;
const ProductInfo2 = styled.div`
	ul {
		list-style: none;
		padding: 0.2rem;
		display: flex; /* 리스트 아이템을 가로로 정렬하기 위해 flex로 설정 */
		flex-wrap: wrap; /* 리스트 아이템이 가로로 넘칠 경우 줄 바꿈 처리 */
	}

	li {
		color: #1d1d1d;
		font-size: 70%;
		border: 1px solid #ccc;
		padding: 0.2rem; /* 리스트 아이템 내부 패딩 추가 */
		margin-right: 0.5rem; /* 리스트 아이템 간격 설정 */
		margin-bottom: 0.5rem; /* 아래 여백 설정 */
	}
`;
const ProductImage = styled.div<ProductCardProps>`
	overflow: hidden;
	position: relative;
	padding-top: 100%;
	background-color: rgba(244, 244, 244, 0.5);
	img {
		width: 100%;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		z-index: ${props => (props['data-is-sale'] ? '' : '-50')};
	}
	.sale-text {
		text-align: center;
		position: absolute;
		font-weight: bold;
		width: 100%;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
`;
export default Product;
