import { useNavigate } from "react-router-dom";
import actionImage from "@/assets/heroSection/action.webp";
import AnimatedElement from "@/components/animation/AnimatedElement";

const CallAction = () => {
    const navigate = useNavigate();
    return (
        <main className="md:p-3 md:p-6 xl:p-2 w-full min-h-100 overflow-hidden ">
            <div className="relative h-100 overflow-hidden group">
                <AnimatedElement
                    variant="fadeIn"
                    duration={1}
                    style={{
                        backgroundImage: `url(/homeSection/callAction.jpg)`,
                    }}
                    className="absolute w-full min-h-100 h-full bg-cover bg-center transition-transform duration-500 "
                ></AnimatedElement>

                {/* Content */}
                <AnimatedElement
                    variant="slideRight"
                    delay={0.4}
                    duration={1}
                    className="relative z-10 gap-2 md:gap-4 lg:gap-5 flex flex-col  justify-center h-full md:h-full p-2 md:p-7  lg:ml-8 font-sans"
                >
                    <p className="text-xl md:text-5xl lg:text-5xl font-montserrat">
                        DESIGNED FOR <br /> EVERY SEASON
                    </p>
                    <p className="text-[9px] md:text-sm lg:text-md max-w-xs leading-tight lg:max-w-sm flex font-ysabeau">
                        COMFORT MEET MODERN AESTHETIC
                    </p>
                    <div>
                        <button
                            onClick={() => navigate("/products")}
                            className="bg-[#0C0C0C] text-white text-[8px] md:text-sm py-1 md:h-12 px-4 md:px-8 font-ysabeau border border-[#0C0C0C] hover:bg-transparent hover:border border-[#0C0C0C] hover:text-[#0C0C0C] transition duration-200"
                        >
                            Shop Now
                        </button>
                    </div>
                </AnimatedElement>
            </div>
        </main>
    );
};

export default CallAction;
