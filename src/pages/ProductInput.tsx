import React, { useState } from 'react';
import styled from 'styled-components';

interface Product {
    name: string;
    price: number;
    image: string;
    description: string;
}

interface ProductInputProps {
    onAddProduct: (product: Product) => void;
}

const ProductInput: React.FC<ProductInputProps> = ({ onAddProduct }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState<File | null>(null); // Use File type for image
    const [description, setDescription] = useState('');

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newProduct: Product = {
            name,
            price: parseFloat(price),
            image: image ? URL.createObjectURL(image) : '', // Convert File to URL
            description,
        };

        onAddProduct(newProduct);

        // Clear form inputs
        setName('');
        setPrice('');
        setImage(null);
        setDescription('');
    };

    return (
        <StyledFormWrapper>
            <h2 className='headername'>상품 등록하기</h2>
            <StyledProductForm onSubmit={handleSubmit}>
                <FormField>
                    <label htmlFor="name">상품명</label>
                    <StyledInput
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setName(e.target.value)}
                        required
                    />
                </FormField>
                <FormField>
                    <label htmlFor="price">가격</label>
                    <StyledInput
                        type="number"
                        id="price"
                        value={price}
                        onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setPrice(e.target.value)}
                        required
                    />
                </FormField>
                <FormField>
                    <label htmlFor="image">이미지 업로드</label>
                    <StyledInput
                        type="file"
                        id="image"
                        onChange={handleImageChange}
                        accept="image/*"
                        required
                    />
                </FormField>
                <FormField>
                    <label htmlFor="description">상품 설명</label>
                    <StyledTextArea
                        id="description"
                        value={description}
                        onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setDescription(e.target.value)}
                        required
                    />
                </FormField>
                <StyledSubmitButton type="submit">상품 추가하기</StyledSubmitButton>
            </StyledProductForm>
        </StyledFormWrapper>
    );
};

export default ProductInput;


const StyledFormWrapper = styled.div`
  width: 1000px;
  margin: 0 auto;
  margin-top : 150px;
  padding:50px;
  background-color: #fffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 2px solid #000000;
`;

const StyledProductForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  margin-top : 20px;

  label {
    margin-bottom: 8px;
    font-weight: bold;
  }
`;

const StyledInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const StyledTextArea = styled.textarea`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
`;

const StyledSubmitButton = styled.button`
  align-self: flex-start;
  padding: 10px 20px;
  background-color: #007aff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;
