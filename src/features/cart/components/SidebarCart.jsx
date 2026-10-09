import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { TbBasketQuestion } from "react-icons/tb";
import { FaMinus } from "react-icons/fa";
import { LuMinus, LuPlus } from "react-icons/lu";

const SidebarCart = ({ closeSidebarCart }) => {
    const { cart, removeCartItems, updateQty, totalPrice } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    console.log("Carty isinya ", cart);

    const handleViewCart = () => {
        if (!user) {
            navigate("/login");
        } else {
            navigate("/my-cart");
        }
    };

    return (
        <main className="fixed bg-black/20 inset-0 w-full z-50 h-screen flex justify-end ">
            <div className="bg-white w-full md:w-1/2 lg:w-2/5 xl:w-1/4 flex flex-col overflow-y-auto items-center">
                {/* Tombol Close */}
                <header className="w-full flex justify-between p-5 border-b border-gray-400">
                    <button
                        onClick={closeSidebarCart}
                        className="top-4 left-4 text-2xl font-bold text-gray-600 hover:text-gray-900"
                    >
                        ×
                    </button>
                    <p className="text-md mt-3 lg:text-2xl font-semibold mb-4 md:mb-6">
                        Your cart
                    </p>
                </header>
                <div className="relative h-screen w-full flex flex-col justify-between">
                    {/* Tabel Cart */}
                    <section className="w-full  flex flex-col justify-start">
                        <div className="w-full p-1  bg-white lg:p-6 overflow-x-hidden overflow-y-auto lg:max-h-[62vh]">
                            {cart.length === 0 ? (
                                <div className="flex flex-col justify-center items-center gap-4 space-y-4">
                                    <p className="text-gray-300 text-8xl">
                                        <TbBasketQuestion />
                                    </p>
                                    <p className="text-center  text-2xl font-semibold font-ysabeau">
                                        Your cart is empty
                                    </p>
                                    <p className="text-sm text-gray-700 font-montserrat max-w-xs text-center ">
                                        You may check out all the available
                                        products and buy some in the shop
                                    </p>
                                    <button
                                        onClick={() => navigate("/products")}
                                        className="px-4 py-2 border border-gray-200 bg-[#0C0C0C] text-white hover:bg-white hover:text-[#0C0C0C] transition duration-200 font-semibold rounded-lg"
                                    >
                                        Continue Shopping
                                    </button>
                                </div>
                            ) : (
                                <table className="w-full border-collapse">
                                    <tbody>
                                        {cart.map((item) => {
                                            return (
                                                <tr
                                                    key={`${item.productId._id} - ${item.size}`}
                                                    className="border-b border-gray-300"
                                                >
                                                    {/* Produk */}
                                                    <td className="flex items-center py-2">
                                                        <img
                                                            src={
                                                                item?.productId
                                                                    .image
                                                            }
                                                            alt={
                                                                item.productId
                                                                    .name
                                                            }
                                                            className="w-25 h-25 md:w-20 md:h-20 lg:w-25 lg:h-25 object-cover rounded mr-1 md:mr-4"
                                                        />

                                                        <div className="flex flex-col justify-around gap-2  w-full h-full">
                                                            <div>
                                                                <p className="text-sm md:text-lg text-sm max-w-sm font-medium">
                                                                    {
                                                                        item
                                                                            .productId
                                                                            .name
                                                                    }
                                                                </p>
                                                            </div>
                                                            <div className="flex gap-8">
                                                                <p className="text-xs lg:text-sm text-gray-600 font-semibold">
                                                                    Size:{" "}
                                                                    {item.size}
                                                                </p>
                                                                <div className="flex gap-2 items-center">
                                                                    {item.discountPercent >
                                                                        0 && (
                                                                        <div className="flex gap-2">
                                                                            <p className="text-sm">
                                                                                $
                                                                                {
                                                                                    item.discountPercent
                                                                                }
                                                                                OFF
                                                                            </p>
                                                                            <p className="text-sm line-through">
                                                                                $
                                                                                {
                                                                                    item.price
                                                                                }
                                                                                .00{" "}
                                                                            </p>
                                                                        </div>
                                                                    )}
                                                                    <p className="text-yellow-500 text-sm text-lg font-semibold">
                                                                        $
                                                                        {
                                                                            item.finalPrice
                                                                        }
                                                                        .00
                                                                    </p>
                                                                </div>
                                                            </div>

                                                            <div className="flex justify-between ">
                                                                <div className="flex items-center justify-center rounded-sm border border-gray-200">
                                                                    <button
                                                                        className="text-xs lg:text-sm xl:text-lg text-gray-400 hover:text-[#0C0C0C] transition duration-100 px-2 py-1   rounded"
                                                                        onClick={() =>
                                                                            updateQty(
                                                                                item
                                                                                    .productId
                                                                                    ._id,
                                                                                item.size,
                                                                                item.quantity -
                                                                                    1,
                                                                            )
                                                                        }
                                                                    >
                                                                        <LuMinus />
                                                                    </button>
                                                                    <span className="text-xs lg:text-sm px-2 md:px-4">
                                                                        {
                                                                            item.quantity
                                                                        }
                                                                    </span>
                                                                    <button
                                                                        className="text-xs lg:text-sm px-2 text-gray-400 hover:text-[#0C0C0C] transition duration-100 py-1   rounded"
                                                                        onClick={() =>
                                                                            updateQty(
                                                                                item
                                                                                    .productId
                                                                                    ._id,
                                                                                item.size,
                                                                                item.quantity +
                                                                                    1,
                                                                            )
                                                                        }
                                                                    >
                                                                        <LuPlus />
                                                                    </button>
                                                                </div>
                                                                <button
                                                                    onClick={() =>
                                                                        removeCartItems(
                                                                            item
                                                                                .productId
                                                                                ._id,
                                                                            item.size,
                                                                        )
                                                                    }
                                                                    className="text-xs md:text-sm text-gray-500 hover:text-red-500 md:mt-1"
                                                                >
                                                                    Remove
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </section>
                    {/* Total Harga Keseluruhan & chekout */}
                    <div className="absolute z-50 bottom-0 w-full border-t border-gray-400 p-4 mt-4 flex flex-col gap-4 ">
                        <section className="flex justify-between">
                            <div className="flex flex-col">
                                <p className="text-[16px] md:text-lg font-semibold text-left">
                                    Sub Total
                                </p>
                                <p className="text-xs font-medium text-gray-700">
                                    Tax and shipping calculated at checkout
                                </p>
                            </div>
                            <div className="text-right">
                                {cart.length > 0 && (
                                    <h2 className="text-[16px] md:text-xl font-semibold text-right">
                                        <span className="text-yellow-500">
                                            ${totalPrice.toFixed(2)}
                                        </span>
                                    </h2>
                                )}
                            </div>
                        </section>
                        <div className="flex gap-2 pb-6">
                            <div className="w-1/2">
                                {cart.length === 0 ? (
                                    <button className="text-lg flex justify-center items-center mt-3 w-full h-12  bg-gray-200 text-white rounded-md">
                                        Chek Out Now
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => {
                                            navigate("/checkout", {
                                                state: {
                                                    checkoutItems: cart.map(
                                                        (item) => ({
                                                            id: item.productId
                                                                ._id,
                                                            name: item.productId
                                                                .name,
                                                            image: item
                                                                .productId
                                                                .image,
                                                            size: item.size,
                                                            quantity:
                                                                item.quantity,
                                                            finalPrice:
                                                                item.finalPrice,
                                                            discountPercent:
                                                                item.discountPercent,
                                                        }),
                                                    ),
                                                },
                                            });

                                            closeShoppingCart();
                                        }}
                                        className="text-lg flex justify-center items-center mt-3 w-full h-12 border bg-black text-white border-black  hover:text-black hover:bg-white transition duration-300 rounded-md"
                                    >
                                        Chek Out Now
                                    </button>
                                )}
                            </div>
                            <div className="w-1/2">
                                <button
                                    onClick={() => {
                                        handleViewCart();
                                        closeSidebarCart();
                                    }}
                                    className="text-lg flex justify-center items-center mt-3 w-full h-12 border bg-white text-[#0C0C0C] border-black  hover:text-white hover:bg-[#0C0C0C] transition duration-300 rounded-md"
                                >
                                    View Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default SidebarCart;
