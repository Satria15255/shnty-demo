import ProductCard from "@/features/products/components/ProductCard";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const ProductsSwiper = ({ products, navigate }) => {
	console.log("Dari swiper", products);
	return (
		<div className="w-full lg:w-auto h-auto pb-4 px-2 overflow-hidden">
			<Swiper
				modules={[Pagination, Autoplay]}
				slidesPerView={1}
				slidesPerGroup={1}
				autoplay={{ delay: 4000 }}
				spaceBetween={8}
				pagination={{
					el: ".swiper-pagination",
					clickable: true,
				}}
				breakpoints={{
					1280: {
						slidesPerView: 2,
						slidesPerGroup: 2,
					},
				}}
			>
				{products.map((product) => (
					<SwiperSlide key={product._id} className="pb-6 p-2">
						<ProductCard
							product={product}
							productDetails={() =>
								navigate(`/product/${product._id}`)
							}
						/>
					</SwiperSlide>
				))}
				<div className="swiper-pagination" />
			</Swiper>
		</div>
	);
};

export default ProductsSwiper;
