import React from "react";

export default function Field({
  label,
  required,
  error,
  children,
}) {
  return (
    <div>
      <label className="text-sm font-medium text-slate-700">
        {label} {required ? <span className="text-red-500">*</span> : null}
      </label>

      <div className="mt-1">{children}</div>

      {error ? (
        <p className="mt-1 text-xs text-red-600">{error}</p>
      ) : null}
    </div>
  );
}