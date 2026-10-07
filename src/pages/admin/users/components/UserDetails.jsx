import React from "react";

const UserDetails = ({ transactions, onClose }) => {
  return (
    <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50">
      <div className="mt-6 bg-white rounded-5 p-4 w-3/5 h-3/5 border">
        <button onClick={onClose}>X</button>
        <h3 className="text-lg font-semibold">Riwayat Transaksi</h3>
        <ul className="list-disc ml-5">
          {Array.isArray(transactions) && transactions.length > 0 ? (
            transactions.map((tx) => (
              <li key={tx._id}>
                {tx.products?.length || 0} produk — Total: $
                {typeof tx.totalPrice === "number"
                  ? tx.totalPrice.toLocaleString()
                  : "0"}{" "}
                —
                {tx.createdAt
                  ? new Date(tx.createdAt).toLocaleString()
                  : "Tanggal tidak tersedia"}
              </li>
            ))
          ) : (
            <p>User ini belum melakukan transaksi.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default UserDetails;
