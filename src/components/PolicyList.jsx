import axios from "axios";

const PolicyList = ({ policies, setPolicies }) => {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/policies/${id}`);
      setPolicies(policies.filter(policy => policy._id !== id));
    } catch (error) {
      console.error("Error deleting policy:", error);
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-2">Policy List</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Policy Number</th>
            <th className="border px-4 py-2">Holder Name</th>
            <th className="border px-4 py-2">Premium</th>
            <th className="border px-4 py-2">Start Date</th>
            <th className="border px-4 py-2">End Date</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {policies.map((policy) => (
            <tr key={policy._id} className="text-center">
              <td className="border px-4 py-2">{policy.policyNumber}</td>
              <td className="border px-4 py-2">{policy.holderName}</td>
              <td className="border px-4 py-2">${policy.premium}</td>
              <td className="border px-4 py-2">{new Date(policy.startDate).toLocaleDateString()}</td>
              <td className="border px-4 py-2">{new Date(policy.endDate).toLocaleDateString()}</td>
              <td className="border px-4 py-2">
                <button onClick={() => handleDelete(policy._id)} className="bg-red-500 text-white px-3 py-1 rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PolicyList;
