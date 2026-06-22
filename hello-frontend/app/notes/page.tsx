'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type Note = {
  id: number;
  title: string;
  content: string;
};

export default function Home() {
  const router = useRouter();
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [theme, setTheme] = useState('light');

  const getToken = () => localStorage.getItem('token');

  useEffect(() => {
    const token = getToken();
    if (!token) { router.push('/login'); return; }
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
    fetchNotes();
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const fetchNotes = async () => {
    const token = getToken();
    const res = await fetch('http://localhost:3001/notes', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.status === 401) { router.push('/login'); return; }
    const data = await res.json();
    setNotes(data);
  };

  const createNote = async () => {
    if (!title || !content) return;
    const token = getToken();
    await fetch('http://localhost:3001/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ title, content }),
    });
    setTitle('');
    setContent('');
    fetchNotes();
  };

  const deleteNote = async (id: number) => {
    const token = getToken();
    await fetch(`http://localhost:3001/notes/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchNotes();
  };

  const startEdit = (note: Note) => {
    setEditingId(note.id);
    setEditTitle(note.title);
    setEditContent(note.content);
  };

  const saveEdit = async (id: number) => {
    const token = getToken();
    await fetch(`http://localhost:3001/notes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ title: editTitle, content: editContent }),
    });
    setEditingId(null);
    fetchNotes();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <div>
      {/* NAVBAR */}
      <nav className="navbar">
        <span className="navbar-brand">📝 NexNotes</span>
        <div className="navbar-actions">
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
          <button className="btn btn-dark" onClick={handleLogout}>
            🚪 Logout
          </button>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div className="container">

        {/* ADD NOTE FORM */}
        <div className="card" style={{ marginBottom: '24px' }}>
          <h2 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: 'var(--text-primary)' }}>
            ✨ New Note
          </h2>
          <input
            className="input"
            placeholder="Note title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ marginBottom: '12px' }}
          />
          <textarea
            className="input"
            placeholder="Note content..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            style={{ marginBottom: '12px', resize: 'vertical' }}
          />
          <button className="btn btn-primary" onClick={createNote}>
            ➕ Add Note
          </button>
        </div>

        {/* NOTES COUNT */}
        <div style={{ marginBottom: '16px', color: 'var(--text-secondary)', fontSize: '14px' }}>
          {notes.length > 0 ? `📋 ${notes.length} note(s)` : ''}
        </div>

        {/* EMPTY STATE */}
        {notes.length === 0 && (
          <div className="empty-state">
            <div style={{ fontSize: '64px' }}>📝</div>
            <p>Koi note nahi hai — pehla note banao!</p>
          </div>
        )}

        {/* NOTES LIST */}
        {notes.map((note) => (
          <div key={note.id} className="note-card">
            {editingId === note.id ? (
              /* EDIT MODE */
              <div>
                <input
                  className="input"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  style={{ marginBottom: '10px' }}
                />
                <textarea
                  className="input"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  rows={3}
                  style={{ marginBottom: '12px', resize: 'vertical' }}
                />
                <div className="note-actions">
                  <button className="btn btn-success" onClick={() => saveEdit(note.id)}>
                    💾 Save
                  </button>
                  <button className="btn btn-gray" onClick={() => setEditingId(null)}>
                    ❌ Cancel
                  </button>
                </div>
              </div>
            ) : (
              /* VIEW MODE */
              <div>
                <h3 className="note-title">{note.title}</h3>
                <p className="note-content">{note.content}</p>
                <div className="note-actions">
                  <button className="btn btn-primary" onClick={() => startEdit(note)}>
                    ✏️ Edit
                  </button>
                  <button className="btn btn-danger" onClick={() => deleteNote(note.id)}>
                    🗑️ Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}