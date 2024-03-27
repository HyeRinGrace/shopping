import React from 'react';
import styled from 'styled-components';

interface Review {
	id: number;
	postId: number;
	name: string;
	email: string;
	body: string;
}

interface ReviewConProps {
	reviews: Review[];
}

const ReviewCon: React.FC<ReviewConProps> = ({ reviews }) => {
	return (
		<ReviewConContainer>
			{reviews.length > 0 &&
				reviews.map(review => (
					<ReviewItem key={review.id} className='reviewCon_item'>
						<ReviewEmail>{review.email}</ReviewEmail>
						<ReviewOption>옵션 : [색상]산토리니 베이지</ReviewOption>
						<ReviewReviewBox>
							<ReviewReview>{review.body}</ReviewReview>
							<ReviewImage>
								<img
									src='https://img.29cm.co.kr/next-product/2023/08/21/fd5037e86ec24907a2b14e8b2176657e_20230821233017.jpg?width=120'
									alt='Review'
								/>
							</ReviewImage>
						</ReviewReviewBox>
					</ReviewItem>
				))}
		</ReviewConContainer>
	);
};
const ReviewConContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	width: 100%;
`;

const ReviewItem = styled.div`
	margin-top: 20px;
	display: flex;
	flex-direction: column;
`;

const ReviewEmail = styled.div`
	display: flex;
	justify-content: flex-start;
	font-size: 12px;
	margin-top: 15px;
`;

const ReviewOption = styled.div`
	display: flex;
	justify-content: flex-start;
	font-size: 12px;
	color: rgb(160, 160, 160);
	margin-bottom: 6px;
`;

const ReviewReviewBox = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
`;

const ReviewReview = styled.div`
	width: 70%;
	overflow: hidden;
	font-size: 14px;
	word-break: break-all;
	text-overflow: clip;
	text-align: left;
`;

const ReviewImage = styled.div`
	width: 20%;
`;

export default ReviewCon;
