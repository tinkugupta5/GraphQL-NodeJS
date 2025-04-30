import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";

const GET_DATA = gql`
  query GetData($userId: ID!) {
    getTodos {
      id
      title
      completed
      user {
        id
        name
      }
    }
    getAllUsers {
      id
      name
    }
    getUser(id: $userId) {
      id
      name
      email
      phone
      website
    }
  }
`;

function App() {
  const [selectedUserId, setSelectedUserId] = useState("1");

  const { data, loading, error } = useQuery(GET_DATA, {
    variables: { userId: selectedUserId },
  });

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error.message}</h1>;

  return (
    <div className="App" style={{ padding: "20px" }}>
      <h2>Todos with Users</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Title</th>
            <th>User</th>
          </tr>
        </thead>
        <tbody>
          {data.getTodos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.title}</td>
              <td>{todo.user?.name}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 style={{ marginTop: "30px" }}>All Users</h2>
      <select
        onChange={(e) => setSelectedUserId(e.target.value)}
        value={selectedUserId}
      >
        {data.getAllUsers.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>

      <h2 style={{ marginTop: "20px" }}>Selected User Details</h2>
      {data.getUser ? (
        <div>
          <p><strong>Name:</strong> {data.getUser.name}</p>
          <p><strong>Email:</strong> {data.getUser.email}</p>
          <p><strong>Phone:</strong> {data.getUser.phone}</p>
          <p><strong>Website:</strong> {data.getUser.website}</p>
        </div>
      ) : (
        <p>No user selected</p>
      )}
    </div>
  );
}

export default App;
