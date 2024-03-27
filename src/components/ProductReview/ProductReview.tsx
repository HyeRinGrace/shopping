import React, { useEffect, useState } from 'react';
import ReviewCon from './ReviewCon';
import styled from 'styled-components';

interface Review {
	id: number;
	postId: number;
	name: string;
	email: string;
	body: string;
}

const ProductReview: React.FC = () => {
	const [reviews, setReviews] = useState<Review[]>([]);

	useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/comments')
			.then(res => res.json())
			.then(data => setReviews(data.slice(0, 20)));
	}, []);

	return (
		<ProductReviewContainer className='product-review'>
			<ProductReviewInfo className='product-review-info'>
				<h2 className='review_title'>리뷰</h2>
				<ReviewCount>({reviews.length})</ReviewCount>
			</ProductReviewInfo>
			<ReviewCard className='reviewCard'>
				<ReviewCon reviews={reviews} />
			</ReviewCard>
		</ProductReviewContainer>
	);
};

const ProductReviewContainer = styled.div`
	width: 100%;
`;

const ProductReviewInfo = styled.div`
	border-bottom: 4px solid rgb(0, 0, 0);
	width: 100%;
	display: flex;
	justify-content: flex-start;
	align-items: center;
`;

const ReviewCard = styled.div`
	border-bottom: 2px solid #f4f4f4;
`;

const ReviewCount = styled.p`
	font-size: 24px;
	font-weight: 700;
`;

export default ProductReview;
