import React from "react";
import { fetchRegistrations } from "../api/admin";

export default function AdminDashboard({ onLogout }) {
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  const token = localStorage.getItem("adminToken");

  React.useEffect(() => {
    let mounted = true;

    async function load() {
      setError("");
      setLoading(true);
      try {
        const data = await fetchRegistrations(token);
        if (mounted) setRows(data);
      } catch (err) {
        if (mounted) setError(err?.message || "Failed to load.");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => (mounted = false);
  }, [token]);

  function logout() {
    localStorage.removeItem("adminToken");
    onLogout?.();
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900">Admin Panel</h1>
            <p className="text-sm text-slate-600">Registrations overview</p>
          </div>
          <button
            onClick={logout}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">
        {loading ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-6">Loading...</div>
        ) : error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
            {error}
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div className="flex items-center justify-between p-4">
              <p className="text-sm text-slate-600">
                Total: <span className="font-semibold text-slate-900">{rows.length}</span>
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Phone</th>
                    <th className="px-4 py-3">School</th>
                    <th className="px-4 py-3">Question</th>
                    <th className="px-4 py-3">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((u) => (
                    <tr key={u.id} className="border-t border-slate-100">
                      <td className="px-4 py-3 font-medium text-slate-900">
                        {u.first_name} {u.last_name}
                      </td>
                      <td className="px-4 py-3">{u.email}</td>
                      <td className="px-4 py-3">{u.phone}</td>
                      <td className="px-4 py-3">{u.school}</td>
                      <td className="px-4 py-3 max-w-[280px] truncate" title={u.question || ""}>
                        {u.question || "-"}
                      </td>
                      <td className="px-4 py-3">
                        {u.created_at ? new Date(u.created_at).toLocaleString() : "-"}
                      </td>
                    </tr>
                  ))}
                  {rows.length === 0 ? (
                    <tr>
                      <td className="px-4 py-6 text-slate-500" colSpan={6}>
                        No registrations yet.
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}