import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface ProductCountProps {
	//카운트 증감소를 Props로 전달받기 위해 선언(김혜린)
	onQuantityChange: (quantity: number) => void;
}

const ProductCount: React.FC<ProductCountProps> = ({ onQuantityChange }) => {
	const [quantity, setQuantity] = useState(1);

	useEffect(() => {
		// 상태가 변경될 때마다 onQuantityChange를 호출하여 변경을 알림(김혜린추가)
		onQuantityChange(quantity);
	}, [quantity, onQuantityChange]);

	const increaseQuantity = () => {
		setQuantity(quantity + 1);
	};

	const decreaseQuantity = () => {
		if (quantity > 1) {
			setQuantity(quantity - 1);
		}
	};

	return (
		<ProductCountContainer>
			<QuantityButton onClick={decreaseQuantity}>-</QuantityButton>
			<Quantity>{quantity}</Quantity>
			<QuantityButton onClick={increaseQuantity}>+</QuantityButton>
		</ProductCountContainer>
	);
};

const ProductCountContainer = styled.div`
	display: flex;
	align-items: center;
	margin-top: 10px;
`;

const QuantityButton = styled.button`
	background-color: #f0f0f0;
	border: none;
	padding: 5px 10px;
	font-size: 16px;
	cursor: pointer;
`;

const Quantity = styled.span`
	width: 30px;
	text-align: center;
	font-size: 18px;
`;

export default ProductCount;
