import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import './App.css';
import './components/ProductReview/ProductReview.css';
import ScrollToTop from './components/ScrollToTop';

function App() {
	return (
		<>
			<Header />
			<main>
				<ScrollToTop />
				<Outlet />
			</main>
		</>
	);
}

export default App;
// test