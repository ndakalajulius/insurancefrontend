import { useEffect, useState } from "react";
import axios from "axios";
import PolicyList from "../components/PolicyList";
import PolicyForm from "../components/PolicyForm";

const Dashboard = () => {
  const [policies, setPolicies] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/policies")
      .then(res => setPolicies(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Insurance Policies</h1>
      <PolicyForm setPolicies={setPolicies} />
      <PolicyList policies={policies} />
    </div>
  );
};

export default Dashboard;
