import axios from "axios";

const PolicyList = ({ policies, setPolicies, setEditingPolicy }) => {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/policies/${id}`);
      setPolicies(policies.filter((policy) => policy._id !== id));
    } catch (error) {
      console.error("Error deleting policy:", error);
    }
  };

  return (
    <div>
      <h2>Policy List</h2>
      <table>
        <thead>
          <tr>
            <th>Policy Number</th>
            <th>Holder Name</th>
            <th>Premium</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {policies.map((policy) => (
            <tr key={policy._id}>
              <td>{policy.policyNumber}</td>
              <td>{policy.holderName}</td>
              <td>${policy.premium}</td>
              <td>{new Date(policy.startDate).toLocaleDateString()}</td>
              <td>{new Date(policy.endDate).toLocaleDateString()}</td>
              <td>
                <button onClick={() => setEditingPolicy(policy)} className="primary">Edit</button>
                <button onClick={() => handleDelete(policy._id)} className="danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PolicyList;

