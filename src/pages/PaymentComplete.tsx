import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

type FormData = {
    name: string;
    address: string;
    city: string;
    phone: string;
    email: string;
    shippingRequest: string;
};

const PaymentComplete: React.FC = () => {
    const location = useLocation();
    const formData: FormData | undefined = location.state?.formData;

    const [virtualAccount, setVirtualAccount] = useState('');
    const [paymentDate, setPaymentDate] = useState(new Date());
    
    const generateVirtualAccount = () => {
        const accountNumber = Array.from({ length: 12 }, () => Math.floor(Math.random() * 10)).join('');
        setVirtualAccount(accountNumber);
    };

     // 컴포넌트가 마운트될 때 가상 계좌 번호 생성
     useEffect(() => {
        generateVirtualAccount();
        setPaymentDate(new Date());
    }, []); // 빈 종속성 배열을 사용하여 컴포넌트 마운트 시에만 함수가 호출되도록 함


    return (
        <Container>
            <Title>COMPELETE ORDER</Title>
            {formData && (
                <InfoCard>
                    <Table>
                        <tbody>
                            <TableRow>
                                <TableHeader>이름:</TableHeader>
                                <TableData>{formData.name}</TableData>
                            </TableRow>
                            <TableRow>
                                <TableHeader>주소:</TableHeader>
                                <TableData>{formData.address}</TableData>
                            </TableRow>
                            <TableRow>
                                <TableHeader>도시:</TableHeader>
                                <TableData>{formData.city}</TableData>
                            </TableRow>
                            <TableRow>
                                <TableHeader>핸드폰 번호:</TableHeader>
                                <TableData>{formData.phone}</TableData>
                            </TableRow>
                            <TableRow>
                                <TableHeader>Email:</TableHeader>
                                <TableData>{formData.email}</TableData>
                            </TableRow>
                            <TableRow>
                                <TableHeader>배송 요청사항:</TableHeader>
                                <TableData>{formData.shippingRequest}</TableData>
                            </TableRow>
                            <TableRow>
                                <TableHeader>결제 일시:</TableHeader>
                                <TableData>{`${paymentDate.getFullYear()}-${paymentDate.getMonth() + 1}-${paymentDate.getDate()}`}</TableData>
                            </TableRow>
                            <TableRow>
                                <TableHeader>가상 계좌 번호:</TableHeader>
                                <TableData>{virtualAccount}</TableData>
                            </TableRow>
                        </tbody>
                    </Table>
                </InfoCard>
            )}
        </Container>
    );
}

const Container = styled.div`

    max-width: 1000px;
    margin: 200px auto 50px;
    padding: 20px;
    background-color: #f7f7f7;
    border-radius: 5px;
`;


const InfoCard = styled.div`
    background: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
`;



const Title = styled.h1`
    padding-top: 50px;
    font-size: 2em;
    margin-bottom: 20px;
    color: #333;
    border-bottom: 2px solid #333;
    padding-bottom: 10px;
`;


const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

const TableRow = styled.tr`
    &:nth-child(odd) {
        background-color: #f2f2f2;
    }
`;

const TableHeader = styled.th`
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
    width: 25%;
`;

const TableData = styled.td`
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
    
`;



export default PaymentComplete;