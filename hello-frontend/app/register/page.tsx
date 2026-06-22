'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const handleRegister = async () => {
    setError('');
    setMessage('');
    if (!name || !email || !password || !confirmPassword) {
      setError('Sab fields bharo!');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords match nahi karte!');
      return;
    }
    const res = await fetch('http://localhost:3001/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      const loginRes = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const loginData = await loginRes.json();
      localStorage.setItem('token', loginData.token);
      setMessage('Register ho gaye! Dashboard pe ja rahe hain...');
      setTimeout(() => router.push('/notes'), 1500);
    } else {
      setError(data.message || 'Kuch galat hua!');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {/* Navbar */}
      <nav className="navbar">
        <span className="navbar-brand">📝 NexNotes</span>
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </nav>

      {/* Register Card */}
      <div className="auth-wrapper">
        <div className="auth-card">
          <h1 className="auth-title">🚀 Create Account</h1>

          {/* Username */}
          <div style={{ marginBottom: '12px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '600', color: 'var(--text-secondary)' }}>
              Username
            </label>
            <input
              className="input"
              type="text"
              placeholder="Aftab Ali"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="off"
            />
          </div>

          {/* Email */}
          <div style={{ marginBottom: '12px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '600', color: 'var(--text-secondary)' }}>
              Email
            </label>
            <input
              className="input"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: '12px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '600', color: 'var(--text-secondary)' }}>
              Password
            </label>
            <div className="password-wrapper">
              <input
                className="input"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? '🙈' : '👁️'}
              </span>
            </div>
          </div>

          {/* Confirm Password */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '600', color: 'var(--text-secondary)' }}>
              Confirm Password
            </label>
            <div className="password-wrapper">
              <input
                className="input"
                type={showConfirm ? 'text' : 'password'}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <span className="eye-icon" onClick={() => setShowConfirm(!showConfirm)}>
                {showConfirm ? '🙈' : '👁️'}
              </span>
            </div>
          </div>

          {/* Button */}
          <button
            className="btn btn-primary"
            onClick={handleRegister}
            style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
          >
            Create Account →
          </button>

          {error && <p className="msg-error" style={{ textAlign: 'center', marginTop: '12px' }}>{error}</p>}
          {message && <p className="msg-success" style={{ textAlign: 'center', marginTop: '12px' }}>{message}</p>}

          <p className="auth-footer" style={{ marginTop: '20px' }}>
            Pehle se account hai?{' '}
            <a href="/login">Login karo</a>
          </p>
        </div>
      </div>
    </div>
  );
}