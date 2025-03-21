import { useState } from "react";
import axios from "axios";

const PolicyForm = ({ setPolicies }) => {
  const [policy, setPolicy] = useState({ policyNumber: "", holderName: "", premium: "", startDate: "", endDate: "" });

  const handleChange = (e) => {
    setPolicy({ ...policy, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:5000/api/policies", policy);
    setPolicies(prev => [...prev, res.data]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="policyNumber" placeholder="Policy Number" onChange={handleChange} required />
      <input type="text" name="holderName" placeholder="Holder Name" onChange={handleChange} required />
      <input type="number" name="premium" placeholder="Premium" onChange={handleChange} required />
      <button type="submit">Add Policy</button>
    </form>
  );
};

export default PolicyForm;
