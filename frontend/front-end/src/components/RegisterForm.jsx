import React from "react";
import Field from "./Field";
import { registerUser } from "../api/client";

const INITIAL = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  school: "",
  question: "",
  acceptedTerms: false,
};

export default function RegisterForm() {
  const [form, setForm] = React.useState(INITIAL);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState("");
  const [error, setError] = React.useState("");
  const [fieldErrors, setFieldErrors] = React.useState({});

  function setField(name, value) {
    setForm((p) => ({ ...p, [name]: value }));
  }

  function validate(values) {
    const e = {};
    if (!values.firstName.trim()) e.firstName = "First name is required.";
    if (!values.lastName.trim()) e.lastName = "Surname is required.";
    if (!values.email.trim()) e.email = "Email is required.";
    if (!values.phone.trim()) e.phone = "Phone is required.";
    if (!values.school.trim()) e.school = "School is required.";
    if (values.acceptedTerms !== true) e.acceptedTerms = "You must accept the terms.";
    return e;
  }

  async function onSubmit(ev) {
    ev.preventDefault();
    setSuccess("");
    setError("");

    const e = validate(form);
    setFieldErrors(e);
    if (Object.keys(e).length) return;

    setLoading(true);
    try {
      const payload = {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim().toLowerCase(),
        phone: form.phone.trim(),
        school: form.school.trim(),
        question: form.question.trim() ? form.question.trim() : null,
        acceptedTerms: true,
      };

      const data = await registerUser(payload);
      setSuccess(`Registration saved successfully. ID: ${data.id}`);
      setForm(INITIAL);
      setFieldErrors({});
    } catch (err) {
      setError(err?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl transition-all duration-300 hover:shadow-2xl">
      <h2 className="text-2xl font-semibold text-slate-900">Create Account</h2>
      <p className="mt-2 text-sm text-slate-500">
        Please fill in the form below to register. 
        <code className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-xs">
         
        </code>
      </p>

      {error && (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50/80 p-4 text-sm text-red-700 backdrop-blur-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50/80 p-4 text-sm text-emerald-700 backdrop-blur-sm">
          {success}
        </div>
      )}

      <form onSubmit={onSubmit} className="mt-8 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="First Name" required error={fieldErrors.firstName}>
            <input
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 outline-none transition-all duration-200 placeholder:text-slate-400 hover:bg-white focus:border-slate-300 focus:bg-white focus:ring-2 focus:ring-slate-200/80"
              value={form.firstName}
              onChange={(e) => setField("firstName", e.target.value)}
              placeholder="e.g. Manzi"
            />
          </Field>

          <Field label="Surname" required error={fieldErrors.lastName}>
            <input
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 outline-none transition-all duration-200 placeholder:text-slate-400 hover:bg-white focus:border-slate-300 focus:bg-white focus:ring-2 focus:ring-slate-200/80"
              value={form.lastName}
              onChange={(e) => setField("lastName", e.target.value)}
              placeholder="e.g. Kelly"
            />
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Email" required error={fieldErrors.email}>
            <input
              type="email"
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 outline-none transition-all duration-200 placeholder:text-slate-400 hover:bg-white focus:border-slate-300 focus:bg-white focus:ring-2 focus:ring-slate-200/80"
              value={form.email}
              onChange={(e) => setField("email", e.target.value)}
              placeholder="name@example.com"
            />
          </Field>

          <Field label="Phone Number" required error={fieldErrors.phone}>
            <input
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 outline-none transition-all duration-200 placeholder:text-slate-400 hover:bg-white focus:border-slate-300 focus:bg-white focus:ring-2 focus:ring-slate-200/80"
              value={form.phone}
              onChange={(e) => setField("phone", e.target.value)}
              placeholder="+2507xxxxxxx"
            />
          </Field>
        </div>

        <Field label="School" required error={fieldErrors.school}>
          <input
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 outline-none transition-all duration-200 placeholder:text-slate-400 hover:bg-white focus:border-slate-300 focus:bg-white focus:ring-2 focus:ring-slate-200/80"
            value={form.school}
            onChange={(e) => setField("school", e.target.value)}
            placeholder="e.g. AUCA"
          />
        </Field>

        <Field label="Do you have any question you would like to ask us?">
          <textarea
            rows={4}
            className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 outline-none transition-all duration-200 placeholder:text-slate-400 hover:bg-white focus:border-slate-300 focus:bg-white focus:ring-2 focus:ring-slate-200/80"
            value={form.question}
            onChange={(e) => setField("question", e.target.value)}
            placeholder="Type your question here..."
          />
        </Field>

        {/* Custom‑styled checkbox */}
        <div className="space-y-2">
          <label className="flex cursor-pointer items-start gap-4 rounded-xl border border-slate-200 bg-slate-50/50 p-4 transition-colors hover:bg-slate-50">
            <input
              type="checkbox"
              checked={form.acceptedTerms}
              onChange={(e) => setField("acceptedTerms", e.target.checked)}
              className="peer hidden"
            />
            <span
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-all ${
                form.acceptedTerms
                  ? "border-slate-900 bg-slate-900 text-white"
                  : "border-slate-300 bg-white"
              }`}
            >
              {form.acceptedTerms && (
                <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 20 20">
                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                </svg>
              )}
            </span>
            <span className="text-sm text-slate-600">
              I agree to the collaboration instructions and terms
              <span className="ml-1 text-red-500">*</span>
            </span>
          </label>

          {fieldErrors.acceptedTerms && (
            <p className="text-xs text-red-500">{fieldErrors.acceptedTerms}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-gradient-to-r from-slate-800 to-slate-900 px-6 py-3.5 font-medium text-white transition-all duration-200 hover:from-slate-900 hover:to-slate-950 hover:shadow-lg focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-60 disabled:hover:shadow-none"
        >
          {loading ? "Submitting..." : "Create Account"}
        </button>
      </form>
    </section>
  );
}