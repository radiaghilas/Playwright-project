const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// In-memory "DB"
let todos = [
  { id: 1, text: 'Préparer le plan de tests', done: false },
  { id: 2, text: 'Écrire les tests Playwright', done: false },
];

// Simple feature flag for regression demo
let FEATURE_FLAG_PERSIST_TODOS = false;

// Auth demo (very naive)
const USER = { email: 'qa@demo.com', password: 'radia123' };

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (email === USER.email && password === USER.password) {
    res.cookie('session', 'ok', { httpOnly: true });
    return res.json({ ok: true });
  }
  return res.status(401).json({ ok: false, error: 'INVALID_CREDENTIALS' });
});

// Todos API
app.get('/api/todos', (req, res) => {
  return res.json({ ok: true, todos });
});

app.post('/api/todos', (req, res) => {
  const { text } = req.body;
  if (!text || text.trim().length < 3) {
    return res.status(400).json({ ok: false, error: 'TEXT_TOO_SHORT' });
  }
  const nextId = Math.max(0, ...todos.map(t => t.id)) + 1;
  const item = { id: nextId, text, done: false };
  todos.push(item);
  if (FEATURE_FLAG_PERSIST_TODOS) {
    // (placeholder: persist to file if needed)
  }
  return res.json({ ok: true, todo: item });
});

app.put('/api/todos/:id/toggle', (req, res) => {
  const id = Number(req.params.id);
  const item = todos.find(t => t.id === id);
  if (!item) return res.status(404).json({ ok: false, error: 'NOT_FOUND' });
  item.done = !item.done;
  return res.json({ ok: true, todo: item });
});

app.delete('/api/todos/:id', (req, res) => {
  const id = Number(req.params.id);
  const before = todos.length;
  todos = todos.filter(t => t.id !== id);
  if (todos.length === before) return res.status(404).json({ ok: false, error: 'NOT_FOUND' });
  return res.json({ ok: true });
});

// Pages
app.get('/', (_req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/login', (_req, res) => res.sendFile(path.join(__dirname, 'public', 'login.html')));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
