import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { devices } from '../assets/styles/constants';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';

interface CategoryItem {
	value: number;
	name: string;
}

interface CategoryTypes {
	[key: string]: CategoryItem[];
}

const Sidebar = () => {
	const navigate = useNavigate();
	const { category } = useParams();
	const [categorySelected, setCategorySelected] = useState<string>('');
	const OPTIONS = [
		{ value: '', name: 'HOME' },
		{ value: 'women', name: 'WOMEN' },
		{ value: 'men', name: 'MEN' },
		{ value: 'digital', name: 'DIGITAL' },
		{ value: 'interior', name: 'INTERIOR' },
	];
	useEffect(() => {
		if (categorySelected !== category) {
			console.log(categorySelected, category, 'log');
			setCategorySelected(category || '');
		}
	});

	const types: CategoryTypes = {
		women: [
			{ value: 1, name: '의류' },
			{ value: 2, name: '가방' },
			{ value: 3, name: '신발' },
			{ value: 4, name: '악세사리' },
		],
		men: [
			{ value: 1, name: '의류' },
			{ value: 2, name: '가방' },
			{ value: 3, name: '신발' },
			{ value: 4, name: '악세사리' },
		],
		digital: [
			{ value: 1, name: '모바일•PC' },
			{ value: 2, name: '음향기기' },
			{ value: 3, name: '게임' },
			{ value: 4, name: '사진' },
		],
		interior: [
			{ value: 1, name: '가구' },
			{ value: 2, name: '조명' },
			{ value: 3, name: '홈데코' },
			{ value: 4, name: '아트디자인' },
		],
	};
	const categoryHandler = (value: any) => {
		navigate(`/category/${category}?code=${value}`);
	};

	const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setCategorySelected(event.target.value);
		console.log(event.target.value);
		if (event.target.value === '') {
			navigate(`/`);
		} else {
			navigate(`/category/${event.target.value}?code=1`);
		}
	};
	const selectedCategoryTypes = category !== undefined ? types[category] || [] : [];
	return (
		<>
			<SidebarTitle>
				<select value={categorySelected} onChange={handleCategoryChange}>
					{OPTIONS.map(option => (
						<option key={option.value} value={option.value}>
							{option.name}
						</option>
					))}
				</select>
			</SidebarTitle>

			{(category || categorySelected !== '') && (
				<SidebarContent>
					{selectedCategoryTypes.map((type: any, index: number) => (
						<Type key={`type-${index}`}>
							<button onClick={() => categoryHandler(type.value)}>{type.name}</button>
						</Type>
					))}
				</SidebarContent>
			)}
		</>
	);
};
export default Sidebar;

const SidebarTitle = styled.h2`
	select {
		display: none;
	}
	font-size: 1.5rem;
	text-align: left;
	margin-top: 10px;
	margin-bottom: 20px;
	border-bottom: 3px solid #000;
	padding-bottom: 20px;
	@media screen and (${devices.md}) {
		display: flex;
		justify-content: center;
		align-items: center;
		select {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 150px;
			text-align: center;
			font-size: 1rem;
		}
		border: none;
		padding-bottom: 0px;
	}
`;
const SidebarContent = styled.div`
	@media screen and (${devices.md}) {
		display: grid;
		padding: 1rem;
		grid-template-columns: 1fr 1fr 1fr;
		grid-template-rows: auto;
		grid-gap: 0.3rem; /* 칸 사이의 간격 설정 */
	}
`;
const Type = styled.div`
	button {
		width: 100%;
		margin-bottom: 1rem;
		text-align: left;
		font-weight: 500;
		font-size: 1.3rem;
		height: 2rem;
		line-height: 2rem;
		padding: 0 2rem 1rem 0;
		color: #5d5d5d;
		&:hover {
			background-color: rgba(155, 155, 155, 0.3);
		}
	}
	@media screen and (${devices.md}) {
		button {
			background-color: #ffffff;
			padding-left: 0.5rem;
			margin-bottom: 0;
			font-size: 0.5rem;
			font-weight: 600;
			height: 30px;
			line-height: 30px;
		}
	}
`;
