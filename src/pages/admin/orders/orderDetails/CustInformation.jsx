const CustInformation = ({ details }) => {
	return (
		<main className="w-full rounded-xl border border-gray-200 space-y-4 h-auto p-2">
			<div className="bg-gray-100 flex items-center gap-2 rounded-xl p-3">
				<span className="bg-white rounded-full h-10 w-10"></span>
				<h1 className="text-xl">{details.name}</h1>
			</div>
			<div className="flex flex-col gap-3 text-sm">
				<div className="flex items-center justify-between">
					<p className="text-gray-600">Email</p>
					<span>{details.email}</span>
				</div>
				<div className="flex items-center justify-between">
					<p className="text-gray-600">Phone Number</p>
					<span>{details.phoneNumber}</span>
				</div>
				<div className="flex items-center justify-between">
					<p className="text-gray-600">Note</p>
					<span>-</span>
				</div>
			</div>
		</main>
	);
};

export default CustInformation;
