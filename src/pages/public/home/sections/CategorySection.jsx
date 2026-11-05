import { useState } from "react";
import { useNavigate } from "react-router-dom";
import basketballCollection from "@/assets/category/basketball.webp";
import runningCollection from "@/assets/category/running.webp";
import sneakersCollection from "@/assets/category/sneakers.webp";
import casualCollection from "@/assets/category/casual.webp";
import AnimatedElement from "@/components/animation/AnimatedElement";
import { IoIosArrowForward } from "react-icons/io";
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
        <main className="h-auto py-12 px-2  w-full flex flex-col items-center">
            {/* Headline */}
            <AnimatedElement
                variant="slideUp"
                duration={1}
                className="text-center py-2"
            >
                <h2 className="text-lg lg:text-3xl font-semibold">
                    Featured Collection
                </h2>
                <p className="text-sm lg:text-sm text-gray-500">
                    Explore styles that reflect your unique identity.
                </p>
            </AnimatedElement>

            <section className="  grid grid-cols-1 md:grid-cols-4  gap-2  lg:mt-4 2xl:max-w-4/5">
                {collection.map((c) => (
                    <article className="w-full relative flex flex-col bg-gray-100 rounded-sm">
                        <AnimatedElement
                            variant="slideUp"
                            duration={1}
                            className=" h-120 w-full"
                        >
                            <img
                                src={c.image}
                                alt={c.title}
                                loading="lazy"
                                decoding="async"
                                width="432"
                                height="756"
                                className=" w-full h-full  flex justify-center object-center object-cover  rounded-l-sm"
                            />
                        </AnimatedElement>
                        <AnimatedElement
                            variant="slideUp"
                            delay={0.4}
                            duration={1}
                            onClick={() =>
                                navigate(`/products?category=${c.collection}`)
                            }
                            className="flex absolute  bottom-4 bg-white w-4/5 flex-col justify-around items-start p-4"
                        >
                            <p className="text-sm flex w-full justify-between items-center font-semibold">
                                {c.title} <IoIosArrowForward />
                            </p>
                        </AnimatedElement>
                    </article>
                ))}
            </section>
        </main>
    );
};

export default CategoryCollection;
