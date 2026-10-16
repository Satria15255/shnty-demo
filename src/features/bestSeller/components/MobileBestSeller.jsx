import ProductCard from "@/features/products/components/ProductCard";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const MobileBestSeller = ({ products, navigate }) => {
	return (
		<div className="w-100 lg:w-auto h-auto pb-4 px-2 overflow-hidden">
			<Swiper
				modules={[Pagination, Autoplay]}
				slidesPerView={2}
				slidesPerGroup={2}
				autoplay={{ delay: 4000 }}
				spaceBetween={8}
				pagination={{
					el: ".swiper-pagination",
					clickable: true,
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

export default MobileBestSeller;
