import { useEffect, useState } from "react";
import api from "../../api/axios";
import Navbar from "../../components/common/Navbar";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  // Load profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/users/me");

        setName(res.data.name);
        setEmail(res.data.email);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Update only name
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put("/users/me", { name });
      alert("Profile updated successfully!");
    } catch (err) {
      alert("Update failed");
    }
  };

  if (loading) return <p className="p-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-xl mx-auto mt-10 bg-white p-8 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-6">My Profile</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* NAME */}
          <div>
            <label className="block text-sm mb-1">
              Name
            </label>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border p-3 rounded-lg"
              required
            />
          </div>

          {/* EMAIL (READ ONLY) */}
          <div>
            <label className="block text-sm mb-1">
              Email
            </label>

            <input
              value={email}
              disabled
              className="w-full border p-3 rounded-lg bg-gray-100"
            />
          </div>

          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
  