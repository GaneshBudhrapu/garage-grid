"use client";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function CustomerSearch({
  value,
  onChange,
}: Props) {
  return (
    <input
      type="text"
      placeholder="Search by name, phone or bike number..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full max-w-md border rounded-lg p-3"
    />
  );
}