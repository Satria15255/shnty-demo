const ShippingDetails = ({ details }) => {
	return (
		<main className="w-full h-auto p-4 flex text-sm flex-col gap-4 border border-gray-200 rounded-xl">
			<div className="space-y-1">
				<p className="text-gray-500">CARIER & METHOD</p>
				<p className="text-black text-lg">Standard Delivery</p>
			</div>
			<div className="space-y-1">
				<p className="text-gray-500">TRACKING WAYBILL (RESI)</p>
				<p className="text-black text-lg">JNE-1348775</p>
			</div>
			<div className="space-y-1">
				<p className="text-gray-500">DESTINATION ADDRESS</p>
				<p className="text-black text-lg">{details.shippingAddress}</p>
			</div>
		</main>
	);
};

export default ShippingDetails;
