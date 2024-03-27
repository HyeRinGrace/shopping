import Product from './Product';
import styled from 'styled-components';
import { devices } from '../../assets/styles/constants';
import { ProductInterface } from '../../models/product';

const ProductList = ({ products }: any) => {
	return (
		<Grid>
			{products?.map((product: ProductInterface, index: number) => (
				<Product product={product} key={`product-${index}`} />
			))}
		</Grid>
	);
};

const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
	grid-template-rows: auto;
	grid-gap: 20px; /* 칸 사이의 간격 설정 */
	margin-top: 130px;
	margin-right: 3rem;
	@media screen and (${devices.md}) {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: 0px; /* 칸 사이의 간격 설정 */
		margin-top: 0px;
		margin-right: 0;
	}
`;

export default ProductList;
