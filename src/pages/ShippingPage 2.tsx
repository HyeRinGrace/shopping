import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';


const ShippingPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const navigate = useNavigate();
    const products = useSelector((state: RootState) => state.cart.products);

    // 각 상품의 총액을 계산
    const calculateTotalPrice = (products: any[]) => {
        return products.reduce((acc, product) => acc + (product.price * product.quantity), 0);
    }

    const handleSaveShippingInfo = () => {
        if (!isValidEmail(email)) {
            setEmailError('Please enter a valid email address.');
            return;
        }
        setEmailError('');

        // TODO: 배송지 정보 저장 로직
        navigate('/pay');
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
                                onChange={(e) => setEmail(e.target.value)}
                                {...emailError && <ErrorPopup>{emailError}</ErrorPopup>}
                            />
                        </StyledLabel>
                        <StyledLabel>
                            배송 요청사항:
                            <StyledSelect name="shippingRequest">
                                <option value="none">선택하세요</option>
                                <option value="frontDoor">문 앞에 두고 가세요</option>
                                <option value="ringBell">벨 누르고 기다려주세요</option>
                                <option value="noRingBell">벨 누르지 말고 문 앞에 두고 가세요</option>
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
                                    src={product.thumbnail}
                                    alt={product.title}
                                />
                                <span>{product.title}</span>
                                <div>
                                    <span> 가격: ${product.price} </span>
                                    <span> 수량: {product.quantity}</span>  {/* 상품 가격 x 수량 */}
                                    <span> 합계: ${product.price * product.quantity}</span>  {/* 상품의 총액 */}
                                </div>
                            </CartItem>
                        ))}
                        <TotalPrice>총 금액: ${calculateTotalPrice(products)}</TotalPrice>  {/* 전체 항목의 총 금액 */}
                        <SaveButton onClick={handleSaveShippingInfo}>CHECK OUT</SaveButton>
                    </CartContainer>
                </CartSection>
            </ContentContainer>
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
    align-items: center;
`;

const Title = styled.h1`
    padding-top: 50px;
    font-size: 2em;
    margin-bottom: 20px;
    color: #333;
    border-bottom: 2px solid #333;
    padding-bottom: 10px;
`;


const StyledLabel = styled.label`
    display: flex;
    font-size: 1.1em;
    margin-bottom: 10px;
    align-items: center;
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

const ErrorPopup = styled.div`
    background-color: #f8d7da;
    color: #721c24;
    padding: 10px 20px;
    border: 1px solid #f5c6cb;
    border-radius: 5px;
    margin: 10px 0;
`;

export default ShippingPage;