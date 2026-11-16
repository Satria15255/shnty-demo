const svgProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true",
};

const createIcon = (children) =>
  function Icon({ className = "" }) {
    return (
      <svg {...svgProps} className={className}>
        {children}
      </svg>
    );
  };

export const ArrowLeftIcon = createIcon(
  <>
    <path d="M19 12H5" />
    <path d="m12 19-7-7 7-7" />
  </>,
);

export const ChevronRightIcon = createIcon(<path d="m9 6 6 6-6 6" />);

export const ChevronDownIcon = createIcon(<path d="m6 9 6 6 6-6" />);

export const IdCardIcon = createIcon(
  <>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <circle cx="9" cy="11" r="2" />
    <path d="M5.5 16c.6-1.4 1.8-2 3.5-2s2.9.6 3.5 2" />
    <path d="M15 10h3M15 14h3" />
  </>,
);

export const CheckCircleIcon = createIcon(
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="m8.5 12.5 2.5 2.5 4.5-5" />
  </>,
);

export const XCircleIcon = createIcon(
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="m9.5 9.5 5 5M14.5 9.5l-5 5" />
  </>,
);

export const CheckIcon = createIcon(<path d="m5 12 5 5L20 7" />);

export const MapPinIcon = createIcon(
  <>
    <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" />
    <circle cx="12" cy="10" r="2.5" />
  </>,
);

export const StarIcon = createIcon(
  <polygon points="12 3 14.6 8.8 21 9.6 16.2 14 17.6 20.4 12 17.2 6.4 20.4 7.8 14 3 9.6 9.4 8.8 12 3" />,
);

export const BuildingIcon = createIcon(
  <>
    <rect x="5" y="3" width="14" height="18" rx="1" />
    <path d="M9 8h2M13 8h2M9 12h2M13 12h2M10 21v-4h4v4" />
  </>,
);

export const LockIcon = createIcon(
  <>
    <rect x="5" y="11" width="14" height="9" rx="2" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
  </>,
);

export const ReceiptIcon = createIcon(
  <>
    <path d="M6 3h12v18l-3-2-3 2-3-2-3 2z" />
    <path d="M9 8h6M9 12h6" />
  </>,
);

export const ClockIcon = createIcon(
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </>,
);
