import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const ShippingPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [isDirectPaymentSelected, setDirectPaymentSelected] = useState(false);
    const [paymentError, setPaymentError] = useState('');
    const navigate = useNavigate();
    const products = useSelector((state: RootState) => state.cart.products);

    // 각 상품의 총액을 계산
    const calculateTotalPrice = (products: any[]) => {
        return products.reduce((acc, product) => acc + (product.price * product.quantity), 0);
    }

    const handleSaveShippingInfo = () => {
        if (!isValidEmail(email)) {
            setEmailError('이메일값을 필수로 입력하셔야 합니다.');
            return;
        }
        if (!isDirectPaymentSelected) {
            setPaymentError('결제수단을 선택해 주세요.');
            return;
        }

        const formData = {
            name: document.querySelector<HTMLInputElement>("input[name='name']")?.value,
            address: document.querySelector<HTMLInputElement>("input[name='address']")?.value,
            city: document.querySelector<HTMLInputElement>("input[name='city']")?.value,
            phone: document.querySelector<HTMLInputElement>("input[name='phone']")?.value,
            email: email,
            shippingRequest: document.querySelector<HTMLSelectElement>("select[name='shippingRequest']")?.value,
        }
        try {
            navigate('/PaymentComplete', { state: { formData } });
        } catch (error) {
            console.error("Error navigating:", error);
        }
    }

    const isValidEmail = (email: string) => {
        // Regular expression for email validation
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return regex.test(email);
    }

    return (
        <ShippingContainer>
            <Title>ORDER</Title>
            <ContentContainer>
                <ShippingFormSection>
                    <ShippingForm>
                        <h2>Billing details</h2>
                        <StyledLabel>
                            이름:
                            <StyledInput type="text" name="name" placeholder="주소를 입력하세요" />
                        </StyledLabel>
                        <StyledLabel>
                            주소:
                            <StyledInput type="text" name="address" placeholder="주소를 입력하세요" />
                        </StyledLabel>
                        <StyledLabel>
                            도시:
                            <StyledInput type="text" name="city" placeholder="도시를 입력하세요" />
                        </StyledLabel>
                        <StyledLabel>
                            핸드폰:
                            <StyledInput type="tel" name="phone" placeholder="핸드폰 번호를 입력하세요" />
                        </StyledLabel>
                        <StyledLabel>
                            이메일:
                            <StyledInput
                                type="email"
                                name="email"
                                placeholder="이메일을 입력하세요"
                                value={email}
                                onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setEmail(e.target.value)}
                            />
                        </StyledLabel>
                        <ErrorContainer>
                            {emailError && <ErrorPopup>{emailError}</ErrorPopup>}
                        </ErrorContainer>
                        <StyledLabel>
                            배송 요청사항:
                            <StyledSelect name="shippingRequest">
                                <option value="none">선택하세요</option>
                                <option value="문 앞에 두고 가세요">문 앞에 두고 가세요</option>
                                <option value="벨 누르고 기다려주세요">벨 누르고 기다려주세요</option>
                                <option value="벨 누르지 말고 문 앞에 두고 가세요">벨 누르지 말고 문 앞에 두고 가세요</option>
                            </StyledSelect>
                        </StyledLabel>
                    </ShippingForm>
                </ShippingFormSection>
                <CartSection>
                    <CartContainer>
                        <h2>Cart List</h2>
                        {products.map((product, index) => (
                            <CartItem key={index}>
                                <ProductImage
                                    src='https://img.29cm.co.kr/next-product/2023/05/03/03eafb89a29045bd818b3600b2bcae18_20230503165832.jpg?width=700'
                                    alt={product.title}
                                />
                                <span>{product.title}</span>
                                <div>
                                    <span> 가격: ${product.price} </span>
                                    <span> 수량: {product.quantity}</span>
                                    <span> 합계: ${product.price * product.quantity}</span>
                                </div>
                            </CartItem>
                        ))}
                        <TotalPrice>총 금액: ${calculateTotalPrice(products)}</TotalPrice>
                        <SaveButton onClick={handleSaveShippingInfo}>CHECK OUT</SaveButton>
                    </CartContainer>
                </CartSection>
            </ContentContainer>
            <PaySection>
                <h2>결제수단</h2>
                <DirectPaymentButton
                    selected={isDirectPaymentSelected}
                    onClick={() => setDirectPaymentSelected(!isDirectPaymentSelected)}>
                    무통장입금
                </DirectPaymentButton>
                <ErrorPopup>{paymentError}</ErrorPopup>
            </PaySection>
        </ShippingContainer>
    );
}

const ProductImage = styled.img`
    width: 50px;
    height: 50px;
    object-fit: cover;
    margin-right: 2px;
`;


const ContentContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    gap: 50px; 
`;

const CartSection = styled.div`
    flex: 1;
    max-width: 40%; 
`;

const ShippingFormSection = styled.div`
    flex: 1;
    max-width: 90%; 
`;


const ShippingForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;


const TotalPrice = styled.div`
    font-size: 1.5em;
    font-weight: bold;
    margin: 20px 0;
    color: #333;
`;


const CartItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    background-color: #fff;
    font-size: 1.1em;
    border: 1px solid #e0e0e0; 
    border-radius: 10px; 
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); // 그림자 추가
    margin-bottom: 15px; // 다른 아이템들과의 간격 추가
    transition: box-shadow 0.3s ease, transform 0.3s ease;

    &:hover {
        box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.15); // 호버 시 그림자 강조
        transform: translateY(-3px); // 호버 시 약간 위로 이동
    }

    & > span {
        font-weight: bold;
    }

    & > div {
        display: flex;
        align-items: center;
        gap: 10px;
    }
`;

// 새로운 CartContainer 추가
const CartContainer = styled.div`
    border: 1px solid #e0e0e0; 
    border-radius: 15px; 
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); 
    padding: 30px;
    background-color: white; 

    h2 {
        margin-bottom: 20px;
    }
`;

// styled-components 스타일링
const ShippingContainer = styled.div`
    padding: 90px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const Title = styled.h1`
    padding-top: 50px;
    font-size: 2em;
    margin-bottom: 20px;
    color: #333;
    border-bottom: 2px solid #333;
    padding-bottom: 10px;
    text-align: center;
    
`;


const StyledLabel = styled.label`
    display: flex;
    font-size: 1em;
    margin-bottom: 10px;
    align-items: flex-start;
    justify-content: space-between;
`;

const StyledInput = styled.input`
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    width: 92%;
`;

const StyledSelect = styled.select`
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    width: 85%;
    font-size: 1em;
`;

const SaveButton = styled.button`
    padding: 10px 20px;
    background-color: #333;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1.2em;
    align-self: center;
`;

const PaySection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 760px;
    gap: 50px; 
    border: 1px solid #e0e0e0; 
    border-radius: 15px; 
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); 
    padding: 15px;
    margin-top: 50px;  // 상단 여백을 auto로 설정하여 하단으로 이동
    background-color: white; 
`;

const ErrorPopup = styled.div`
    color: red;
    padding: 5px 10px;
    border-radius: 5px;
    margin: 10px 0;
`;

const ErrorContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 0.8em;
    margin-top: px;  // 위쪽 여백 조정
    align-items: flex-start;  // 왼쪽 정렬
`;

//무통장 입금 버튼
const DirectPaymentButton = styled.button<{ selected: boolean }>`
  display: block; // changed from flex to block for full width
  text-align: left; // added to align the text left
  padding: 10px 20px;
  background-color: ${(props: { selected: any; }) => props.selected ? '#333' : '#ccc'};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.2em;
  margin-top: 10px;
`;


export default ShippingPage;