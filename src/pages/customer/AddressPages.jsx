import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";
import {
    addUserAddress,
    updateUserAddress,
    deleteUserAddress,
    setDefaultAddress,
} from "@/features/auth/services/authService";

const AddressPages = () => {
    const { user, setUser } = useAuth();

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingAddressId, setEditingAddressId] = useState(null);

    const [addressForm, setAddressForm] = useState({
        label: "",
        country: "",
        city: "",
        specificAddress: "",
    });

    const addresses = user?.address || [];

    const handleChange = (e) => {
        const { name, value } = e.target;

        setAddressForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const resetForm = () => {
        setAddressForm({
            label: "",
            country: "",
            city: "",
            specificAddress: "",
        });

        setEditingAddressId(null);
        setIsFormOpen(false);
    };

    const handleAddAddress = () => {
        setEditingAddressId(null);

        setAddressForm({
            label: "",
            country: "",
            city: "",
            specificAddress: "",
        });

        setIsFormOpen(true);
    };

    const handleEditAddress = (address) => {
        setEditingAddressId(address._id);

        setAddressForm({
            label: address.label || "",
            country: address.country || "",
            city: address.city || "",
            specificAddress: address.specificAddress || "",
        });

        setIsFormOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editingAddressId) {
                const res = await updateUserAddress(
                    editingAddressId,
                    addressForm,
                );

                setUser((prev) => ({
                    ...prev,
                    address: prev.address.map((address) =>
                        address._id === editingAddressId
                            ? res.data.address
                            : address,
                    ),
                }));

                toast.success("Address updated!");
            } else {
                const res = await addUserAddress(addressForm);

                setUser((prev) => ({
                    ...prev,
                    address: res.data.address,
                }));

                toast.success("Address added!");
            }

            resetForm();
        } catch (error) {
            console.error(error);
            toast.error("Failed to save address");
        }
    };

    const handleDeleteAddress = async (addressId) => {
        try {
            await deleteUserAddress(addressId);

            setUser((prev) => ({
                ...prev,
                address: prev.address.filter(
                    (address) => address._id !== addressId,
                ),
            }));

            toast.success("Address deleted!");
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete address");
        }
    };

    const handleSetDefault = async (addressId) => {
        try {
            await setDefaultAddress(addressId);

            setUser((prev) => ({
                ...prev,
                address: prev.address.map((address) => ({
                    ...address,
                    isDefault: address._id === addressId,
                })),
            }));

            toast.success("Default address updated!");
        } catch (error) {
            console.error(error);
            toast.error("Failed to update default address");
        }
    };

    return (
        <section className="bg-[#FAFAFA] p-5 min-h-full">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-semibold">My Addresses</h1>

                    <p className="text-sm text-gray-500 mt-1">
                        Manage your delivery addresses.
                    </p>
                </div>

                <button
                    onClick={handleAddAddress}
                    className="bg-black text-white px-5 py-2.5 rounded-lg"
                >
                    + Add Address
                </button>
            </div>

            <div className="space-y-4">
                {addresses.length > 0 ? (
                    addresses.map((address) => (
                        <div
                            key={address._id}
                            className="bg-white border border-gray-200 rounded-2xl p-6"
                        >
                            <div className="flex justify-between gap-6">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h2 className="font-semibold">
                                            {address.label || "Address"}
                                        </h2>

                                        {address.isDefault && (
                                            <span className="bg-black text-white text-xs px-2 py-1 rounded-full">
                                                Default
                                            </span>
                                        )}
                                    </div>

                                    <p className="text-gray-600 mt-3">
                                        {address.specificAddress}
                                    </p>

                                    <p className="text-gray-600">
                                        {address.city}, {address.country}
                                    </p>
                                </div>

                                <div className="flex flex-col items-end gap-3">
                                    <button
                                        onClick={() =>
                                            handleEditAddress(address)
                                        }
                                        className="text-sm font-medium"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() =>
                                            handleDeleteAddress(address._id)
                                        }
                                        className="text-sm text-red-600"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>

                            {!address.isDefault && (
                                <button
                                    onClick={() =>
                                        handleSetDefault(address._id)
                                    }
                                    className="mt-5 text-sm underline"
                                >
                                    Set as Default
                                </button>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center">
                        <p className="text-gray-500">
                            You haven't added any addresses yet.
                        </p>

                        <button
                            onClick={handleAddAddress}
                            className="mt-4 bg-black text-white px-5 py-2.5 rounded-lg"
                        >
                            Add Your First Address
                        </button>
                    </div>
                )}
            </div>

            {isFormOpen && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
                    <form
                        onSubmit={handleSubmit}
                        className="bg-white w-full max-w-lg rounded-2xl p-6"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold">
                                {editingAddressId
                                    ? "Edit Address"
                                    : "Add Address"}
                            </h2>

                            <button type="button" onClick={resetForm}>
                                ✕
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm mb-2">
                                    Label
                                </label>

                                <input
                                    type="text"
                                    name="label"
                                    value={addressForm.label}
                                    onChange={handleChange}
                                    placeholder="Home, Office..."
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-black"
                                />
                            </div>

                            <div>
                                <label className="block text-sm mb-2">
                                    Country
                                </label>

                                <input
                                    type="text"
                                    name="country"
                                    value={addressForm.country}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-black"
                                />
                            </div>

                            <div>
                                <label className="block text-sm mb-2">
                                    City
                                </label>

                                <input
                                    type="text"
                                    name="city"
                                    value={addressForm.city}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-black"
                                />
                            </div>

                            <div>
                                <label className="block text-sm mb-2">
                                    Specific Address
                                </label>

                                <textarea
                                    name="specificAddress"
                                    value={addressForm.specificAddress}
                                    onChange={handleChange}
                                    rows="4"
                                    placeholder="Street, building, house number..."
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-black resize-none"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 mt-7">
                            <button
                                type="button"
                                onClick={resetForm}
                                className="border border-gray-300 px-5 py-2.5 rounded-lg"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="bg-black text-white border border-black px-5 py-2.5 rounded-lg"
                            >
                                {editingAddressId
                                    ? "Save Changes"
                                    : "Add Address"}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </section>
    );
};

export default AddressPages;
