const ProductOrderTable = ({ items, totalPrice }) => {
	console.log(items);
	return (
		<main className="w-full h-auto border border-gray-200 rounded-xl">
			<table className=" w-full table-fixed border-separate border-spacing-0 border border-gray-200 rounded-xl">
				<thead>
					<tr className="bg-gray-200 p-2 text-sm font-semibold ">
						<th className="w-2/3 text-left p-2 rounded-tl-xl">
							PRODUCT
						</th>
						<th className="w-1/3 text-left rounded-tr-xl">
							TOTAL PRICE
						</th>
					</tr>
				</thead>
				<tbody className="w-full space-y-4 p-2">
					{Array.isArray(items) && items.length > 0 ? (
						items.map((i) => (
							<tr key={i._id}>
								<td className="flex p-2 items-center ">
									<img
										src={i.image}
										alt={"Product"}
										className="inline-block rounded-lg w-20 h-20 mr-2"
									/>
									<div className="flex flex-col ">
										<p className="font-bold text-sm">
											{i.name}
										</p>
										<div className="text-xs flex gap-2">
											<p>Size {i.size}</p>
											<p>Qty: {i.quantity}</p>
											<p>${i.pricePerUnit}</p>
										</div>
									</div>
								</td>{" "}
								<td className="text-sm">
									<span>${totalPrice}</span>
								</td>
							</tr>
						))
					) : (
						<h1>Product Not ready</h1>
					)}
				</tbody>
			</table>
		</main>
	);
};

export default ProductOrderTable;
