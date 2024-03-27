import React, { useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

interface Product {
    name: string;
    price: number;
    image: string;
    description: string;
    quantity: number;
}

interface PaymentPageProps {
    products: Product[];
}

const PaymentPage: React.FC<PaymentPageProps> = ({ products }) => {
    const navigate = useNavigate();
    const [address, setAddress] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const totalPrice = products.reduce((total, product) => total + product.price * product.quantity, 0);

    const handlePayment = () => {
        // 결제완료 페이지로 넘어가는식으로 해야함

        navigate('/confirmation');
    }

    const handleAddressSearch = () => {
        // 주소찾는거 넣어야함
    }


    //input 영역에 데이터를 불러와서 주문자의 정보를 뿌려줘야함
    return (
        <PaymentPageContainer>
            <Title>결제</Title>
            <InputContainer>
                <Label>이름 :</Label>
                <TextInput
                    type="text"
                    placeholder="이름을 입력하세요"
                    value={name}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                />
            </InputContainer>
            <InputContainer>
                <Label>핸드폰 번호 : </Label>
                <TextInput
                    type="text"
                    placeholder="핸드폰 번호를 입력하세요"
                    value={phone}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
                />
            </InputContainer>
            <InputContainer>
                <Label>주소 : </Label>
                <TextInput
                    type="text"
                    placeholder="주소를 입력하세요"
                    value={address}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)}
                />
                <Button onClick={handleAddressSearch}>주소 찾기</Button>
            </InputContainer>
            <TotalPrice>총 가격: ${totalPrice.toFixed(2)}</TotalPrice>
            {products.map((product, index) => (
                <ProductCard key={index}>
                    <ProductImage src={product.image} alt={product.name} />
                    <ProductDetails>
                        <ProductName>{product.name}</ProductName>
                        <ProductDescription>{product.description}</ProductDescription>
                        <ProductPrice>${(product.price * product.quantity).toFixed(2)}</ProductPrice>
                    </ProductDetails>
                </ProductCard>
            ))}
            <PaymentButton onClick={handlePayment}>결제 완료</PaymentButton>
        </PaymentPageContainer>
    );
}

export default PaymentPage;



const TextInput = styled.input`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;
`;

const Button = styled.button`
    padding: 10px;
    margin-top: 10px;
    background-color: #333;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;


const TotalPrice = styled.p`
    font-size: 1.5em;
    font-weight: bold;
    color: #333;
    margin-bottom: 20px;
`;

const ProductCard = styled.div`
    width: 80%;
    border: 2px solid #5D737E;
    border-radius: 10px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
    padding: 20px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    background-color: #F7F7F7;
`;

const ProductImage = styled.img`
    width: 100px;
    height: 100px;
    object-fit: cover;
    margin-right: 16px;
`;

const ProductDetails = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const ProductName = styled.h3`
    margin: 0;
`;

const ProductDescription = styled.p`
    margin: 8px 0;
`;

const ProductPrice = styled.p`
    margin: 0;
`;

const PaymentButton = styled.button`
    padding: 10px 20px;
    background-color: #333;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1.2em;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const PaymentPageContainer = styled.div`
    margin-top: 50px;
    padding: 20px;
`;

const Title = styled.h1`
    text-align: left;
`;

const InputContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`;

const Label = styled.label`
    width: 120px;
    text-align: right;
    margin-right: 10px;
`;