import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../../firebaseConfig';

const LoginSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const { login } = useContext(AuthContext); // Get login function from context
  const navigate = useNavigate();

  const handleAuth = async () => {
    try {
      let userCredential;
      if (isSignup) {
        // Sign up
        userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        alert('Signup successful!');
      } else {
        // Log in
        userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        alert('Login successful!');
      }

      const userData = { email: userCredential.user.email }; // Use email or other user data
      login(userData); // Store user info in context
      navigate('/'); // Redirect to the questions page
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div style={{ textAlign: 'center', margin: '50px' }}>
      <h1 className="text-center mt-4">AI Fortune Teller🔥</h1>
      <h1>{isSignup ? 'Sign Up' : 'Log In'}</h1>
      <div>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ margin: '10px', padding: '10px', width: '300px' }}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ margin: '10px', padding: '10px', width: '300px' }}
        />
      </div>
      <button
        onClick={handleAuth}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007BFF',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginTop: '20px',
        }}
      >
        {isSignup ? 'Sign Up' : 'Log In'}
      </button>
      <div>
        <button
          onClick={() => setIsSignup(!isSignup)}
          style={{
            marginTop: '20px',
            color: '#007BFF',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          {isSignup
            ? 'Already have an account? Log In'
            : "Don't have an account? Sign Up"}
        </button>
      </div>
    </div>
  );
};

export default LoginSignup;
