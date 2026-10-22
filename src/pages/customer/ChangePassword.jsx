import { useAuth } from "@/context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { changePassword } from "@/features/auth/services/authService";
import { toast } from "react-toastify";

const ChangePassword = () => {
    const { user, setUser } = useAuth();
    const [updateForm, setUpdateForm] = useState({
        currentPassword: "",
        newPassword: "",
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUpdateForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleForm = async (e) => {
        e.preventDefault();
        try {
            if (!updateForm.currentPassword || !updateForm.newPassword) {
                return toast.error("Please fill in all fields");
            }

            const inputForm = {
                currentPassword: updateForm.currentPassword,
                newPassword: updateForm.newPassword,
            };

            const res = await changePassword(inputForm);
            navigate("/");
            toast.success("Password Changed!");
        } catch (error) {
            toast.error("Failed to Change Password");
            console.error("Error changing password:", error);
        }
    };
    return (
        <section className="flex flex-col gap-10  h-auto lg:h-full pt-12 md:p-8">
            {/* Form*/}
            <div className="md:border border-gray-200 md:shadow-2xl rounded-xl p-5">
                <form
                    onSubmit={handleForm}
                    className="gap-14 flex flex-col gap-7 font-ysabeau w-full px-4 text-sm lg:text-md "
                >
                    <div className="w-full flex flex-col">
                        <p className="text-lg">Current Password</p>
                        <p className="text-sm text-gray-600">
                            Enter your current password.
                        </p>
                        <input
                            type="text"
                            name="currentPassword"
                            value={updateForm.currentPassword}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-3 rounded-xl"
                        />
                    </div>
                    <div className="w-full flex flex-col ">
                        <p className="text-lg">New Password</p>
                        <p className="text-sm text-gray-600">
                            Create a new password to secure your account.
                        </p>
                        <input
                            type="text"
                            name="newPassword"
                            value={updateForm.newPassword}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-3 rounded-xl"
                        />
                    </div>
                </form>
                <div className="w-full flex justify-end mt-10 px-5">
                    <button
                        onClick={handleForm}
                        className="bg-black w-1/2 text-sm font-ysabeau lg:w-1/5 text-white border border-gray-300 hover:bg-white hover:text-black transition durationn-300 px-4 py-3 rounded-xl mt-4"
                    >
                        Change Password
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ChangePassword;
