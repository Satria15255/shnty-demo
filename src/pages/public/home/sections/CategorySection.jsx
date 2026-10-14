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
        desc: "Effortless elegance meets contemporary style in every detail.",
        collection: "Man",
    },
    {
        image: "/collection/woman.png",
        title: "Woman Collection",
        desc: "Effortless elegance meets contemporary style in every detail.",
        collection: "Woman",
    },
    {
        image: "/collection/accessories.png",
        title: "Accessories Collection",
        desc: "The finishing touches that elevate your look and define your style.",
        collection: "Accessories",
    },
    {
        image: "/collection/unisex.png",
        title: "Unisex Collection",
        desc: "Versatile everyday pieces that transcend boundaries and express individuality.",
        collection: "Unisex",
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

            <section className="  grid grid-cols-1 md:grid-cols-2  gap-2  lg:mt-4">
                {collection.map((c) => (
                    <article className="w-full flex bg-gray-100 rounded-sm">
                        <div className=" h-60 w-1/2">
                            <img
                                src={c.image}
                                alt={c.title}
                                loading="lazy"
                                decoding="async"
                                width="432"
                                height="756"
                                className="  w-full h-full object-center object-cover  rounded-l-sm"
                            />
                        </div>
                        <div className="flex w-1/2 flex-col justify-around items-start p-6">
                            <p className="text-sm lg:text-lg font-semibold">
                                {c.title}
                            </p>
                            <p className="text-xs lg:text-sm text-gray-500 max-w-sm">
                                {c.desc}
                            </p>
                            <button
                                onClick={() =>
                                    navigate(
                                        `/products?category=${c.collection}`,
                                    )
                                }
                                className=" cursor-pointer  text-gray-600 hover:text-[#0C0C0C] hover:underline transition duration-200 text-xs lg:text-sm font-semibold"
                            >
                                SHOP NOW
                            </button>
                        </div>
                    </article>
                ))}
            </section>
        </main>
    );
};

export default CategoryCollection;
