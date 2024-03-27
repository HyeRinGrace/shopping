import React, { useState } from 'react';
import styled from 'styled-components';

// interface ProductOptionProps {
// 	onOptionChange: (option: string) => void;
// }

const ProductOption = ({ optionList }: { optionList: { category: string; name: string }[] }) => {
	const option = optionList[0];
	const [optionSelected, setOptionSelected] = useState<string>('');

	const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setOptionSelected(event.target.value);
	};

	return (
		<ProductOptionContainer>
			<ProductOptionSelect value={optionSelected} onChange={handleOptionChange}>
				<option value=''>{option.category} 선택</option>
				<option value='mall1'>{option.name}</option>
			</ProductOptionSelect>
		</ProductOptionContainer>
	);
};

const ProductOptionContainer = styled.div`
	display: flex;
	margin-top: 20px;
`;

const ProductOptionSelect = styled.select`
	background-color: #fff;
	border: 1px solid #c4c4c4;
	color: #000;
	padding: 8px 12px;
	font-size: 14px;
	outline: none;
	cursor: pointer;
`;

export default ProductOption;
