import { createContext, useContext, useState, useEffect } from "react";
import {
    addToCart,
    removeCartItem,
    getCart,
    updateCartQuantity,
    clearCart,
} from "@/features/cart/services/cartService";
import { getDiscountVoucher } from "@/features/voucher/services/voucherService";
import { toast } from "react-toastify";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const { user } = useAuth();
    const [voucher, setVoucher] = useState(null);
    const [voucherLoading, setVoucherLoading] = useState(false);
    const [voucherError, setVoucherError] = useState("");

    // Reset Voucher Helper
    const resetVoucher = () => {
        setVoucher(null);
        setVoucherError("");
    };

    // Fetch Cart Items
    const fetchCart = async () => {
        try {
            const res = await getCart();
            const items = res.data.items || [];
            setCart(items);
            return items;
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (!user) {
            setCart([]);
            return;
        }

        fetchCart();
    }, [user?._id]);

    // Handle Add Cart Items
    const handleAddToCart = async (product, size) => {
        if (!user) {
            return toast.warning("Please login to add products to cart");
        }
        if (!size) {
            return toast.error("Please Select a size");
        }
        if (size == 0) {
            return toast.error("Stock not available");
        }
        try {
            const res = await addToCart(product._id, 1, size);
            await fetchCart();
            resetVoucher();
            toast.success("Product added to cart");
        } catch (err) {
            console.log(err);
            toast.error("Failed to add product to cart");
        }
    };

    // Update Product Quantity
    const updateQty = async (productId, size, quantity) => {
        try {
            await updateCartQuantity(productId, size, quantity);
            await fetchCart();
            resetVoucher();
        } catch (err) {
            console.log(err);
        }
    };

    // Remove Cart Item
    const removeCartItems = async (productId, size) => {
        try {
            const res = await removeCartItem(productId, size);
            await fetchCart();
            resetVoucher();
        } catch (err) {
            console.log(err);
        }
    };

    // Clear Cart Items
    const handleClearCart = async () => {
        try {
            await clearCart();
            resetVoucher();
            setCart([]);
        } catch (err) {
            console.log(err);
        }
    };

    // Voucher discount apply
    const applyVoucher = async (code) => {
        if (!code?.trim()) {
            setVoucherError("Please enter a voucher code");
            return false;
        }

        try {
            setVoucherLoading(true);
            setVoucherError("");

            const res = await getDiscountVoucher({
                code: code.trim(),
            });

            setVoucher(res.data.data);

            return true;
        } catch (err) {
            console.log(err);

            setVoucher(null);

            const message =
                err.response?.data?.message || "Failed to apply voucher";

            setVoucherError(message);

            return false;
        } finally {
            setVoucherLoading(false);
        }
    };

    // remove voucher
    const removeVoucher = () => {
        setVoucher(null);
        setVoucherError("");
    };

    // Total Price
    const totalPrice = (cart || []).reduce(
        (acc, item) => acc + item.finalPrice * item.quantity,
        0,
    );
    const discountAmount = voucher?.discountAmount || 0;

    const finalTotal = voucher?.finalTotal ?? totalPrice;

    return (
        <CartContext.Provider
            value={{
                cart,
                setCart,
                fetchCart,

                handleAddToCart,
                updateQty,
                removeCartItems,
                handleClearCart,

                totalPrice,

                voucher,
                applyVoucher,
                removeVoucher,
                voucherLoading,
                voucherError,

                finalTotal,
                discountAmount,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
