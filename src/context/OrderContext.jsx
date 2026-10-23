import { createContext, useContext, useState, useEffect } from "react";
import { getMyOrders } from "@/features/orders/services/orderService";
import { useAuth } from "./AuthContext";

const OrdersContext = createContext();

export const OrderProvider = ({ children }) => {
	const [order, setOrder] = useState([]);
	const fetchOrder = async () => {
		try {
			const res = await getMyOrders();
			const item = res.data || [];
			setOrder(item);
			return item;
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		fetchOrder();
	}, []);
	console.log(order);

	return (
		<OrdersContext.Provider
			value={{
				order,
			}}
		>
			{children}
		</OrdersContext.Provider>
	);
};

export const useOrder = () => useContext(OrdersContext);
