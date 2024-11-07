import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [count, setCount] = useState(0);
  const [array, setArray] = useState([]);

  const fetchAPI = async () => {
    const response = await axios.get('http://127.0.0.1:8080/api/users');
    console.log(response.data.users);
    setArray(response.data.users);
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <ul>
          {array.map((user, index) => (
            <li key={index}>{user}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
