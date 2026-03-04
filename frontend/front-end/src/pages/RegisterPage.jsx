import React from "react";
import InstructionsCard from "../components/InstructionsCard";
import RegisterForm from "../components/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-6 lg:grid-cols-2">
        <InstructionsCard />
        <RegisterForm />
      </div>

      <footer className="mt-10 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Autiva
      </footer>
    </main>
  );
}