import { useEffect, useState } from "react";
import axios from "axios";
import PolicyList from "../components/PolicyList";
import PolicyForm from "../components/PolicyForm";

const Dashboard = () => {
  const [policies, setPolicies] = useState([]);
  const [editingPolicy, setEditingPolicy] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/policies")
      .then(res => setPolicies(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="container">
      <h1>Insurance Policies</h1>
      <PolicyForm setPolicies={setPolicies} editingPolicy={editingPolicy} setEditingPolicy={setEditingPolicy} />
      <PolicyList policies={policies} setPolicies={setPolicies} setEditingPolicy={setEditingPolicy} />
    </div>
  );
};

export default Dashboard;
