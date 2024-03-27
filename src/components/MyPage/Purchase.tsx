import { useState, useEffect } from 'react';
import moment from 'moment';

import styled from 'styled-components';
import axiosClient from '../../util/axiosInstance';

interface OrderItem {
	brandName: string;
	count: number;
	deliveryPrice: number;
	optionCategory: string;
	optionName: string;
	orderDate: string;
	price: number;
	productName: string;
}

interface OrderList {
	orderList: OrderItem[];
}

const Purchase = () => {
	const [purchaseData, setPurchaseData] = useState<OrderList | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	useEffect(() => {
		const fetchPurchase = async () => {
			setIsLoading(true);

			try {
				const res = await axiosClient({
					method: 'get',
					url: `/api/v1/user/order`,
				});

				setPurchaseData(res.data.data);

				setIsLoading(false);
			} catch (err) {
				console.log('주문내역 조회에 오류가 발생했습니다.');
				setIsError(true);
			}
		};

		fetchPurchase();
	}, []);

	if (isLoading) return <>Loading</>;

	if (!purchaseData || isError) return <p>유저정보를 불러올 수 없습니다.</p>;

	if (purchaseData.orderList.length === 0)
		return <NoPurchaseList>주문내역이 없습니다.</NoPurchaseList>;

	return (
		<PurchaseWrapper>
			<h3>주문배송조회</h3>
			<PurchaseTable>
				<PurchaseHeader>
					<div>상품정보</div>
					<div>배송비</div>
					<div>진행상태</div>
				</PurchaseHeader>
				{purchaseData.orderList.map((item: OrderItem) => {
					return (
						<>
							<div>
								<span>주문일자 {moment(item.orderDate).format('YYYY-MM-DD')}</span>
							</div>
							<PurchaseBody>
								<li>
									<div>
										<img
											width={80}
											height={80}
											src='https://images.unsplash.com/photo-1579353977828-2a4eab540b9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FtcGxlfGVufDB8fDB8fHww&w=1000&q=80'
											alt=''
										/>
										<div>
											<span>{item.brandName}</span>
											<span>{item.productName}</span>
											<span>
												옵션 : {item.optionCategory}/{item.optionName}
											</span>
											<span>
												{item.price}원 / 수량 {item.count}개
											</span>
										</div>
									</div>
									<div>{item.deliveryPrice === 0 ? '무료배송' : item.deliveryPrice + '원'}</div>
									<div>주문확인</div>
								</li>
								<li></li>
							</PurchaseBody>
						</>
					);
				})}
			</PurchaseTable>
		</PurchaseWrapper>
	);
};

const NoPurchaseList = styled.p`
	margin-top: 50px;
`;

const PurchaseWrapper = styled.div`
	h3 {
		font-size: 22px;
		color: #000000;
		line-height: 1.5;
		font-weight: 500;
		text-align: left;
		margin-bottom: 20px;
	}
`;

const PurchaseTable = styled.div``;

const PurchaseHeader = styled.div`
	display: flex;
	border-top: 4px solid black;

	> div {
		padding: 20px;
		font-size: 18px;
		font-weight: 700;
		text-align: center;
	}

	> div:nth-child(1) {
		flex: 1;
	}
	> div:nth-child(2) {
		width: 230px;
	}
	> div:nth-child(3) {
		width: 150px;
	}
	& ~ div {
		border-top: 2px solid black;
		padding: 16px 0px;
		border-bottom: 1px solid rgb(228, 228, 228);
		text-align: left;
	}
`;

const PurchaseBody = styled.ul`
	li {
		display: flex;
		padding: 40px 0;
		align-items: center;
		border-bottom: 1px solid rgb(228, 228, 228);

		> div:nth-child(1) {
			flex: 1;
			display: flex;
			align-items: center;

			img {
				width: 80px;
				height: 80px;
			}

			div {
				display: flex;
				flex-direction: column;
				padding: 0 20px;
				text-align: left;

				span {
					&:nth-child(1) {
						font-size: 16px;
						font-weight: bold;
					}
					&:nth-child(2) {
						margin-top: 10px;
						font-size: 12px;
					}
					&:nth-child(3) {
						margin-top: 10px;
						font-size: 13px;
					}
				}
			}
		}
		> div:nth-child(2) {
			width: 230px;
		}
		> div:nth-child(3) {
			width: 150px;
		}
	}
`;

export default Purchase;
