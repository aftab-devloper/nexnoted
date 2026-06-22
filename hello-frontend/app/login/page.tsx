'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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

  const handleLogin = async () => {
    setError('');
    setMessage('');
    if (!email || !password) {
      setError('Email aur password bharo!');
      return;
    }
    const res = await fetch('http://localhost:3001/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('token', data.token);
      router.push('/notes');
    } else {
      setError('Email ya password galat hai!');
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

      {/* Login Card */}
      <div className="auth-wrapper">
        <div className="auth-card">
          <h1 className="auth-title">🔐 Welcome Back!</h1>

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
          <div style={{ marginBottom: '20px' }}>
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

          {/* Button */}
          <button
            className="btn btn-primary"
            onClick={handleLogin}
            style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
          >
            Login →
          </button>

          {error && <p className="msg-error" style={{ textAlign: 'center', marginTop: '12px' }}>{error}</p>}
          {message && <p className="msg-success" style={{ textAlign: 'center', marginTop: '12px' }}>{message}</p>}

          <p className="auth-footer" style={{ marginTop: '20px' }}>
            Account nahi hai?{' '}
            <a href="/register">Register karo</a>
          </p>
        </div>
      </div>
    </div>
  );
}