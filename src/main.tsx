//import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './global.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();
import {
	LoginPage,
	MainPage,
	MyBagPage,
	MyPage,
	PaymentPage,
	SignUpPage,
	ProductDetail,
	ProductMarket,
} from './pages/index';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';

import ShippingPage from './pages/ShippingPage';
import PaymentComplete from './pages/PaymentComplete';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: '',
				element: <MainPage />,
			},
			{
				path: 'mybag',
				element: <MyBagPage />,
			},
			{
				path: 'my',
				element: <MyPage />,
				children: [
					{
						path: 'profile',
						element: <></>,
					},
					{
						path: 'purchase',
						element: <></>,
					},
					{
						path: 'sale',
						element: <></>,
					},
				],
			},
			{
				path: 'login',
				element: <LoginPage />,
			},
			{
				path: 'PaymentPage',
				element: <PaymentPage products={[]} />,
			},
			{
				path: 'product/:id', // 디테일 페이지 라우팅
				element: <ProductDetail />,
			},

			{ path: 'myproduct', element: <ProductMarket /> },

			{
				path: 'ShippingPage', // 디테일 페이지 라우팅
				element: <ShippingPage />,
			},
			{
				path: 'PaymentComplete',
				element: <PaymentComplete />,
			},

			{ path: 'signup', element: <SignUpPage /> },
			{
				path: 'category/:category',
				element: <MainPage />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<QueryClientProvider client={queryClient}>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</QueryClientProvider>
);
