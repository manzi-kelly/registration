import React from "react";

export default function InstructionsCard() {
  return (
    <section className="relative rounded-3xl border border-slate-200 bg-white p-8 shadow-xl transition-all duration-300 hover:shadow-2xl">
      {/* Decorative top gradient bar */}
      <div className="absolute -top-0.5 left-1/2 h-1 w-20 -translate-x-1/2 rounded-full bg-gradient-to-r from-slate-400 to-slate-600" />

      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Work With Us</h1>
          <p className="mt-2 text-slate-500">
            Please read and accept the collaboration instructions before registering.
          </p>
        </div>

        <div className="hidden rounded-full bg-slate-900 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-white shadow-md sm:block">
          Announcement
        </div>
      </div>

      <ul className="mt-6 space-y-3">
        {[
          "Use real and accurate information.",
          "Your data is used only for onboarding and communication.",
          "Follow program rules and respect deadlines.",
          "Ask questions using the form if anything is unclear.",
          "registrations free 10k.",
          "program starts on 22nd march 2026 on l5 while another level starts on 4th april 2026",
        ].map((item, idx) => (
          <li key={idx} className="flex items-start gap-3 text-slate-700">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600">
              <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 20 20">
                <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
              </svg>
            </span>
            <span className="text-sm sm:text-base">{item}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50/50 p-5 backdrop-blur-sm">
        <div className="flex gap-3">
          <div className="shrink-0">
            <svg
              className="h-5 w-5 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-sm text-slate-700">
            <span className="font-semibold">Tip:</span> If you face any issue, add a question in the last field—our team will respond.
          </p>
        </div>
      </div>
    </section>
  );
}