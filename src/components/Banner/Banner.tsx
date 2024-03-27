import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
const Banner = () => {
	const slidesData = [
		'https://img.29cm.co.kr/item/202308/11ee3e606b4413b58a6919dc052253e6.jpg?width=500',
		'https://img.29cm.co.kr/item/202308/11ee3fd36e1da5c58a69d3ea4792e9e0.jpg?width=500',
		'https://img.29cm.co.kr/item/202308/11ee3f20aeff15a0acc50f775e2207a1.jpg?width=500',
		'https://img.29cm.co.kr/item/202308/11ee3032deb05461aa4fd73c160957f8.jpg?width=500',
		'https://img.29cm.co.kr/item/202308/11ee4001ed77a4e0acc51135522c429e.jpg?width=500',
	];
	return (
		<Swiper
			modules={[Autoplay, Pagination]}
			spaceBetween={50}
			slidesPerView={1}
			// onSlideChange={() => console.log('slide change')}
			pagination={{ clickable: true }}
			autoplay={{ delay: 3000 }}
		>
			{slidesData.map((slide, index) => (
				<SwiperSlide key={index}>
					<img src={`${slide}`} alt={`slide-${index}`} />
				</SwiperSlide>
			))}
		</Swiper>
	);
};
export default Banner;
