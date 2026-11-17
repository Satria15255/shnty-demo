import { Card, SectionHeader } from "./Shared";
import {
  BuildingIcon,
  CheckIcon,
  IdCardIcon,
  LockIcon,
  MapPinIcon,
  StarIcon,
} from "./Icon";

function AddressCard({ address }) {
  const isPrimary = address.isDefault == true;

  return (
    <article
      className={`flex flex-col gap-3 rounded-xl bg-indigo-50/50 p-4 ${
        isPrimary ? "border-l-4 border-amber-200" : ""
      }`}
    >
      {/* badge + tag */}
      <div className="flex items-center justify-between gap-3">
        <span
          className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[10px] font-semibold ${
            isPrimary
              ? "bg-amber-100 text-amber-800"
              : "bg-slate-200/70 text-slate-700"
          }`}
        >
          {isPrimary ? (
            <div className="flex items-center gap-2">
              <StarIcon className="h-3 w-3 fill-current" />
              <p>Default Address</p>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <BuildingIcon className="h-3 w-3" />
              <p>Secondary Address</p>
            </div>
          )}
          {address.default}
        </span>
        <span
          className={
            isPrimary
              ? "text-[10px] font-bold uppercase tracking-wider text-slate-600"
              : "text-[11px] text-slate-600"
          }
        >
          {address.tag}
        </span>
      </div>

      {/* alamat */}
      <p className="text-[13px] font-semibold leading-relaxed text-slate-800">
        {address.specificAddress} {address.city} {address.country}
      </p>

      {/* penerima (alamat utama) */}

      <p className="flex items-center gap-1.5 text-xs text-slate-600">
        <IdCardIcon className="h-3.5 w-3.5 shrink-0" />
        <span>
          Recipient:{" "}
          <span className="font-bold text-slate-800">{address.fullName}</span>
          {address.phone && <> • {address.phone}</>}
        </span>
      </p>

      {/* detail (alamat kantor) */}

      {/* footer: terkunci */}
      {address.isDefault == true ? (
        <div className="mt-auto pt-1">
          <span className="inline-flex items-center gap-2 rounded-full bg-slate-200/60 px-3 py-1.5 text-[11px] text-slate-600">
            <LockIcon className="h-3 w-3 shrink-0" />
            Address on orders is locked upon placement and permanent.
          </span>
        </div>
      ) : (
        <div className="mt-auto flex items-center justify-between pt-1 text-[11px] font-semibold text-slate-700">
          <span>Available for new checkouts</span>
          <CheckIcon className="h-3.5 w-3.5 text-emerald-600" />
        </div>
      )}
    </article>
  );
}

const SavedAddresses = ({ addresses = [] }) => {
  console.log(addresses);
  return (
    <Card>
      <SectionHeader
        icon={MapPinIcon}
        iconWrapClassName="bg-slate-100 text-slate-700"
        title="Saved Addresses"
        subtitle="Fulfillment & Delivery Locations"
        action={
          <span className="text-[11px] text-slate-500">
            {addresses.length} Total Recorded
          </span>
        }
      />

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
        {addresses.map((address) => (
          <AddressCard key={address.id} address={address} />
        ))}
      </div>
    </Card>
  );
};

export default SavedAddresses;
