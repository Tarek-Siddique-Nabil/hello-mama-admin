import React, { useContext, useState } from "react";
import { AuthContext } from "../../Hooks/useFirebase";

const Signup = () => {
  const { createUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await createUser(email, password, role);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <input
          type="text"
          placeholder="Role"
          value={role}
          onChange={(event) => setRole(event.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Signup;
