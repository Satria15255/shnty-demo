import { useState } from "react";
import { useNavigate } from "react-router-dom";
import basketballCollection from "@/assets/category/basketball.webp";
import runningCollection from "@/assets/category/running.webp";
import sneakersCollection from "@/assets/category/sneakers.webp";
import casualCollection from "@/assets/category/casual.webp";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const collection = [
    {
        image: "/collection/man.png",
        title: "Man Collection",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti tempore itaque facere.",
    },
    {
        image: "/collection/woman.png",
        title: "Woman Collection",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti tempore itaque facere.",
    },
    {
        image: "/collection/accessories.png",
        title: "Accessories Collection",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti tempore itaque facere.",
    },
    {
        image: "/collection/unisex.png",
        title: "Unisex Collection",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti tempore itaque facere.",
    },
];

const CategoryCollection = () => {
    const navigate = useNavigate();

    return (
        <main className="h-auto py-12 px-2  w-full flex flex-col  ">
            {/* Headline */}
            <header className="text-center py-2">
                <h2 className="text-lg lg:text-3xl font-semibold">
                    Featured Collection
                </h2>
                <p className="text-sm lg:text-lg text-gray-500">
                    Lorem ipsum dolor sit amet consectetur.
                </p>
            </header>

            {/*Desktop Ver*/}
            <section className="  grid grid-cols-2  gap-2  lg:mt-4">
                {collection.map((c) => (
                    <article className="w-full flex bg-gray-100 rounded-xl">
                        <div className=" h-40 w-40">
                            <img
                                src={c.image}
                                alt={c.title}
                                loading="lazy"
                                decoding="async"
                                width="432"
                                height="756"
                                className="hover:scale-110 w-full h-full object-center object-cover transition duration-300 rounded-l-xl"
                            />
                        </div>
                        <div className="flex flex-col justify-around items-start p-6">
                            <p className="text-sm lg:text-lg font-semibold">
                                {c.title}
                            </p>
                            <p className="text-xs lg:text-sm text-gray-500 max-w-sm">
                                {c.desc}
                            </p>
                            <button
                                onClick={() => navigate("/products")}
                                className="underline cursor-pointer  text-gray-600 hover:text-[#0C0C0C] transition duration-200 text-xs lg:text-sm font-semibold"
                            >
                                SHOP NOW
                            </button>
                        </div>
                    </article>
                ))}
            </section>

            {/* Mobile Ver */}
            <section className="md:hidden h-auto py-12 px-4 w-full overflow-hidden">
                <Swiper
                    modules={[Pagination, Autoplay]}
                    slidesPerView={1}
                    slidesPerGroup={1}
                    autoplay={{ delay: 3000 }}
                    pagination={{
                        el: ".swiper-pagination",
                        clickable: true,
                    }}
                    className="h-full"
                >
                    {collection.map((c, index) => (
                        <SwiperSlide key={index}>
                            <article
                                onClick={() => navigate("/products")}
                                className="w-85"
                            >
                                <div className="overflow-hidden">
                                    <img
                                        src={c.image}
                                        alt={c.title}
                                        loading="lazy"
                                        decoding="async"
                                        width="432"
                                        height="756"
                                        className="hover:scale-110 transition duration-300"
                                    />
                                </div>

                                <div className="flex flex-col items-start gap-5 mt-6">
                                    <p className="text-lg font-semibold">
                                        {c.title}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {c.desc}
                                    </p>
                                    <button className="underline pb-7 text-sm font-semibold cursor-pointer">
                                        SHOP NOW
                                    </button>
                                </div>
                            </article>
                        </SwiperSlide>
                    ))}

                    {/* Navigation & Pagination */}
                    <div className="swiper-button-prev"></div>
                    <div className="swiper-button-next"></div>
                    <div className="swiper-pagination"></div>
                </Swiper>
            </section>
        </main>
    );
};

export default CategoryCollection;
