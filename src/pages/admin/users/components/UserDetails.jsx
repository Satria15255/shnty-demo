import React from "react";
import { getCustDetail } from "../services/adminUserService";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
const UserDetails = () => {
  const { id } = useParams();
  const [isCustomer, setIsCustomer] = useState({});
  const navigate = useNavigate();
  const fetchCust = async () => {
    try {
      const res = await getCustDetail(id);
      setIsCustomer(res.data);
    } catch (error) {
      console.log(eror);
    }
  };

  useEffect(() => {
    fetchCust();
  }, [id]);
  console.log(isCustomer);

  return (
    <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50">
      <div className="mt-6 bg-white rounded-5 p-4 w-3/5 h-3/5 border">
        <button onClick={() => navigate("/admin/user")}>X</button>
        <h3 className="text-lg font-semibold">Riwayat Transaksi</h3>
        <ul className="list-disc ml-5">
          {/* {Array.isArray(transactions) && transactions.length > 0 ? (
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
          )}*/}
        </ul>
      </div>
    </div>
  );
};

export default UserDetails;
