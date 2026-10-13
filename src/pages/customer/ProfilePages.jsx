import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { updateProfile } from "@/features/auth/services/authService";
import { toast } from "react-toastify";
import { MdCheckCircleOutline } from "react-icons/md";
import { PiUserCircle } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const ProfilePages = () => {
    const { user, setUser } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [updateForm, setUpdateForm] = useState({
        name: "",
        email: "",
        phoneNumber: "",
    });
    const navigate = useNavigate();
    const defaultAddress = user?.address?.find((address) => address.isDefault);

    useEffect(() => {
        if (user) {
            setUpdateForm({
                name: user.name || "",
                email: user.email || "",
                phoneNumber: user.phoneNumber || "",
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdateForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleCancel = (e) => {
        setUpdateForm({
            name: user?.name || "",
            email: user?.email || "",
            phoneNumber: user?.phoneNumber || "",
        });

        setIsEditing(false);
    };

    const handleUpdateForm = async (e) => {
        e.preventDefault();
        try {
            const inputForm = {
                name: updateForm.name,
                phoneNumber: updateForm.phoneNumber,
            };

            const res = await updateProfile(inputForm);
            setUser(res.data.user);
            toast.success("Profile updated!");
        } catch (error) {
            toast.error("Failed Update Profile");
            console.error("Error updating profile:", error);
        }
    };
    return (
        <section className="flex flex-col bg-[#FAFAFA] gap-8 p-5 h-full">
            {/* Profile Header */}
            <header className="flex items-center gap-4 bg-white border border-gray-200 rounded-2xl p-6">
                <div className="text-6xl">
                    <PiUserCircle />
                </div>

                <div>
                    <h1 className="text-2xl font-montserrat font-semibold">
                        {user?.name}
                    </h1>

                    <p className="text-sm text-gray-500">{user?.email}</p>

                    <div className="mt-2 inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
                        <MdCheckCircleOutline size={15} />
                        Verified Account
                    </div>
                </div>
            </header>

            {/* Personal Information */}
            <section className="bg-white border border-gray-200 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-xl font-montserrat font-semibold">
                            Personal Information
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            Manage your personal account information.
                        </p>
                    </div>

                    {!isEditing && (
                        <button
                            type="button"
                            onClick={() => setIsEditing(true)}
                            className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 transition"
                        >
                            Edit
                        </button>
                    )}
                </div>

                {!isEditing ? (
                    /* ================= VIEW MODE ================= */
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <p className="text-sm text-gray-500">Full Name</p>

                            <p className="mt-1 font-medium">
                                {user?.name || "-"}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                Phone Number
                            </p>

                            <p className="mt-1 font-medium">
                                {user?.phoneNumber || "Not provided"}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                Email Address
                            </p>

                            <div className="flex items-center gap-2 mt-1">
                                <p className="font-medium">{user?.email}</p>

                                <MdCheckCircleOutline
                                    className="text-green-600"
                                    size={17}
                                />
                            </div>
                        </div>
                    </div>
                ) : (
                    /* ================= EDIT MODE ================= */
                    <form
                        onSubmit={handleUpdateForm}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                        {/* Name */}
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium mb-2"
                            >
                                Full Name
                            </label>

                            <input
                                id="name"
                                type="text"
                                name="name"
                                value={updateForm.name}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-black"
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label
                                htmlFor="phoneNumber"
                                className="block text-sm font-medium mb-2"
                            >
                                Phone Number
                            </label>

                            <input
                                id="phoneNumber"
                                type="text"
                                name="phoneNumber"
                                value={updateForm.phoneNumber}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-black"
                            />
                        </div>

                        {/* Email */}
                        <div className="md:col-span-2">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium mb-2"
                            >
                                Email Address
                            </label>

                            <input
                                id="email"
                                type="email"
                                value={updateForm.email}
                                readOnly
                                className="w-full border border-gray-200 bg-gray-100 text-gray-500 rounded-lg px-4 py-3 cursor-not-allowed"
                            />

                            <p className="text-xs text-gray-500 mt-2">
                                Your email address cannot be changed.
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="md:col-span-2 flex justify-end gap-3 mt-3">
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="border border-gray-300 px-5 py-2.5 rounded-lg hover:bg-gray-50 transition"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="bg-black text-white px-5 py-2.5 rounded-lg border border-black hover:bg-white hover:text-black transition"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                )}
            </section>

            <section className="bg-white border border-gray-200 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-5">
                    <div>
                        <h2 className="text-xl font-semibold">
                            Default Address
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            Address used as your primary delivery destination.
                        </p>
                    </div>

                    <button
                        onClick={() => navigate("/dashboard?tab=addresses")}
                        className="border border-gray-300 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 transition"
                    >
                        Manage Addresses
                    </button>
                </div>

                {defaultAddress ? (
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <p className="font-medium">
                                {defaultAddress.label}
                            </p>

                            <span className="text-xs bg-black text-white px-2 py-1 rounded-full">
                                Default
                            </span>
                        </div>

                        <p className="text-gray-600">
                            {defaultAddress.specificAddress}
                        </p>

                        <p className="text-gray-600">
                            {defaultAddress.city}, {defaultAddress.country}
                        </p>
                    </div>
                ) : (
                    <div>
                        <p className="text-gray-500">
                            No default address has been added.
                        </p>

                        <button
                            onClick={() => navigate("/dashboard?tab=addresses")}
                            className="mt-3 text-sm font-medium underline"
                        >
                            Add an address
                        </button>
                    </div>
                )}
            </section>
        </section>
    );
};

export default ProfilePages;
