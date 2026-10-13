import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register } from "@/features/auth/services/authService";
import background from "@/assets/heroSection/hero12.webp";
import { IoIosArrowBack } from "react-icons/io";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register({ name, email, password });

            toast.success("Register success, please Login");
            navigate("/login");
        } catch (err) {
            alert(err.response?.data?.message || "Register Failed");
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-cover bg-center">
            <div className="inset-0  flex h-screen">
                <div className="w-full md:w-1/2 lg:w-2/5 h-screen flex flex-col justify-around bg-white rounded-xl p-1 md:p-4 ">
                    <div className="w-full flex justify-start p-4 ">
                        <button
                            onClick={() => navigate("/")}
                            className="p-2 rounded-full shadow-xl border border-gray-100"
                        >
                            <IoIosArrowBack />
                        </button>
                    </div>
                    <div className="flex flex-col gap-2 items-center justify-around h-full md:h-4/5 pb-4 pt-6 px-7">
                        <div className="flex flex-col gap-2">
                            <p className="text-lg md:text-2xl xl:text-4xl text-center font-bold mb-2 md:mb-4">
                                Get Started Now!
                            </p>
                            <p className="text-sm text-gray-700 lorem21 max-w-sm text-center">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Corrupti tempore itaque
                                facere.
                            </p>
                        </div>
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-2 px-3 flex flex-col justify-center w-full"
                        >
                            <label className="font-semibold">Full Name</label>
                            <input
                                type="text"
                                placeholder="Name"
                                value={name}
                                className="w-full text-sm md:text-lg rounded-lg p-2 border border-gray-300"
                                onChange={(e) => setName(e.target.value)}
                            />
                            <label className="pt-4 font-semibold">Email</label>

                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                className="w-full text-sm md:text-lg rounded-lg p-2 border border-gray-300"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <label className="pt-4 font-semibold">
                                Password
                            </label>

                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                className="w-full text-sm md:text-lg rounded-lg p-2 border  border-gray-300"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="text-sm md:text-lg border mt-4 border-gray-300 bg-gray-900 text-white hover:bg-white hover:text-black transition duration-100 px-4 py-2 rounded-2xl"
                            >
                                Register
                            </button>
                        </form>
                        <div className="flex items-center justify-center mt-2 md:mt-4 ">
                            <p className="text-center text-xs md:text-sm text-gray-500">
                                Already have an account?
                            </p>
                            <p
                                onClick={() => {
                                    navigate("/login");
                                }}
                                className="text-gray-900 text-center hover:underline  text-xs md:text-sm"
                            >
                                Login
                            </p>
                        </div>
                    </div>
                </div>
                <div className="w-3/5 h-screen ">
                    <img
                        src="/homeSection/discover2.jpg"
                        alt=""
                        className="w-full h-full object-center object-cover"
                    />
                </div>
            </div>
        </div>
    );
};

export default Register;
