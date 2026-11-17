import { Card, SectionHeader } from "./shared";
import { CheckCircleIcon, IdCardIcon } from "./Icon";
import { formatDate } from "@/utils/FormatedDate";

function InfoTile({ label, children }) {
  return (
    <div className="min-w-0 rounded-xl bg-indigo-50/60 p-4">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </p>
      <div className="mt-2 text-xs font-medium leading-relaxed text-slate-800">
        {children}
      </div>
    </div>
  );
}

const CustomerProfile = ({ customer }) => {
  console.log(customer);
  const {
    name,
    email,
    phone,
    createdAt,
    updatedAt,
    isActive = true,
  } = customer;

  const status = isActive
    ? { label: "Active Account", className: "bg-emerald-50 text-emerald-700" }
    : { label: "Inactive Account", className: "bg-slate-100 text-slate-600" };

  return (
    <Card>
      <SectionHeader
        icon={IdCardIcon}
        title="Customer Profile"
        subtitle="Account Identity • Registered Member"
        divider
        action={
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold ${status.className}`}
          >
            <CheckCircleIcon className="h-3.5 w-3.5" />
            {status.label}
          </span>
        }
      />

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <InfoTile label="Username">
          <span className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-900">
            {name}
            <CheckCircleIcon className="h-3.5 w-3.5 text-slate-500" />
          </span>
        </InfoTile>

        <InfoTile label="Email">
          <p className="truncate" title={email}>
            {email}
          </p>
        </InfoTile>

        <InfoTile label="Phone Number">{phone || "-"}</InfoTile>
        <InfoTile label="Terdaftar">{formatDate(createdAt)}</InfoTile>
        <InfoTile label="Last Login">{formatDate(updatedAt)}</InfoTile>
      </div>
    </Card>
  );
};

export default CustomerProfile;
