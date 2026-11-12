const CostSummary = ({ details }) => {
	return (
		<main className="w-full h-auto p-2 border border-gray-200 rounded-xl">
			<section className="text-sm space-y-4 p-4">
				<div className="flex w-full justify-between">
					<p className="text-gray-500">Items Subtotal</p>
					<span>{details.totalPrice}</span>
				</div>
				<div className="flex w-full justify-between">
					<p className="text-gray-500">
						Estimated Shipping:
						<span className="text-white bg-gray-900 p-1 rounded-sm">
							{" "}
							{details.shippingMethod}
						</span>
					</p>
					<span>$10.00</span>
				</div>
				<div className="flex w-full justify-between">
					<p className="text-gray-500">
						Promotional Voucher: {details.voucherCode}
					</p>
					<span>{details.discountAmount}</span>
				</div>
			</section>
			<section className="flex items-center justify-between border-t border-graay-700">
				<div className="space-y-1 py-2">
					<h1 className="text-2xl font-bold">Total Payment:</h1>
					<p className="text-sm">
						Includes applicable service charges & taxes
					</p>
				</div>
				<p className="text-2xl font-bold">${details.finalPrice}</p>
			</section>
		</main>
	);
};

export default CostSummary;
