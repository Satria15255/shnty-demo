const Subs = () => {
	return (
		<main className="min-h-120 flex items-center justify-center">
			<div className="flex flex-col items-center gap-4">
				<h1 className="text-6xl">Join Us!</h1>
				<p className="text-sm text-center max-w-2xl">
					Receive news on the latest releases and exclusive offers
					directly in your email, and get early access to new
					collections and member-only promotions.
				</p>

				<form className="w-4/5">
					<input
						type="text"
						placeholder="Our Email..."
						className="w-full border border-gray-300 px-2  py-2"
					/>
				</form>
				<button className="py-3 px-8  bg-[#0C0C0C] text-white">
					Subscribe
				</button>
			</div>
		</main>
	);
};

export default Subs;
