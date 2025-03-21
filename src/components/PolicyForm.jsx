import { useState, useEffect } from "react";
import axios from "axios";

const PolicyForm = ({ setPolicies, editingPolicy, setEditingPolicy }) => {
  const [policy, setPolicy] = useState({
    policyNumber: "",
    holderName: "",
    premium: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    if (editingPolicy) {
      setPolicy(editingPolicy);
    }
  }, [editingPolicy]);

  const handleChange = (e) => {
    setPolicy({ ...policy, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingPolicy) {
        await axios.put(`http://localhost:5000/api/policies/${editingPolicy._id}`, policy);
        setPolicies((prev) =>
          prev.map((p) => (p._id === editingPolicy._id ? policy : p))
        );
        setEditingPolicy(null);
      } else {
        const res = await axios.post("http://localhost:5000/api/policies", policy);
        setPolicies((prev) => [...prev, res.data]);
      }
      setPolicy({ policyNumber: "", holderName: "", premium: "", startDate: "", endDate: "" });
    } catch (error) {
      console.error("Error saving policy:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editingPolicy ? "Edit Policy" : "Add Policy"}</h2>
      <input type="text" name="policyNumber" placeholder="Policy Number" value={policy.policyNumber} onChange={handleChange} required />
      <input type="text" name="holderName" placeholder="Holder Name" value={policy.holderName} onChange={handleChange} required />
      <input type="number" name="premium" placeholder="Premium" value={policy.premium} onChange={handleChange} required />
      <input type="date" name="startDate" value={policy.startDate} onChange={handleChange} required />
      <input type="date" name="endDate" value={policy.endDate} onChange={handleChange} required />
      <button type="submit" className="primary">{editingPolicy ? "Update Policy" : "Add Policy"}</button>
    </form>
  );
};

export default PolicyForm;


