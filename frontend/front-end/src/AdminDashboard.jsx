import React, { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/registrations", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(setData);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>School</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map(user => (
            <tr key={user.id} className="border-t">
              <td>{user.first_name} {user.last_name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.school}</td>
              <td>{new Date(user.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}