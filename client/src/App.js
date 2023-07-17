  
import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [input1Data, setInput1Data] = useState('');
  const [input2Data, setInput2Data] = useState('');
  const [searchResult, setSearchResult] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });
      setLoggedIn(response.data.success);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  const handleClearCookies = () => {
    setInput1Data('');
    setInput2Data('');
    setSearchResult('');
  };

  const handleSubmitData = () => {
    setInput1Data(input1Data);
  };

  const handleSearchData = () => {
    const storedData = input1Data;
    if (input2Data === storedData) {
      setSearchResult(storedData);
    } else {
      setSearchResult('');
    }
  };

  if (!loggedIn) {
    return (
      <div>
        <h1>Login Page</h1>
        <form onSubmit={handleLogin}>
          <div>
            <label>Email:</label>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome to Page 2</h1>
      <div>
        <label>Input 1:</label>
        <input
          type="text"
          value={input1Data}
          onChange={(e) => setInput1Data(e.target.value)}
        />
        <button onClick={handleSubmitData}>Submit Data</button>
      </div>
      <div>
        <label>Input 2:</label>
        <input
          type="text"
          value={input2Data}
          onChange={(e) => setInput2Data(e.target.value)}
        />
        <button onClick={handleSearchData}>Search Data</button>
        {searchResult && <div>Search Result: {searchResult}</div>}
      </div>
      <div>
        <button onClick={handleClearCookies}>Clear All Cookies</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default App;
