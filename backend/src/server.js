require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Research Opportunity Portal API is running' });
});

app.get('/api/opportunities', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM opportunities');
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch opportunities' });
  }
});

app.get('/api/opportunities/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM opportunities WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Opportunity not found' });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch opportunity' });
  }
});

app.post('/api/opportunities', async (req, res) => {
  try {
    const { title, description, research_area, faculty_name, department, required_skills, positions, deadline, status } = req.body;

    if (!title || !description || !research_area || !faculty_name || !department || !required_skills || !positions || !deadline) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    if (!Number.isInteger(Number(positions)) || Number(positions) < 1) {
      return res.status(400).json({ error: 'Positions must be a positive whole number' });
    }
    if (!['Open', 'Closed'].includes(status || 'Open')) {
      return res.status(400).json({ error: 'Status must be Open or Closed' });
    }

    const [result] = await pool.query(
      'INSERT INTO opportunities (title, description, research_area, faculty_name, department, required_skills, positions, deadline, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [title, description, research_area, faculty_name, department, required_skills, positions, deadline, status || 'Open']
    );
    res.status(201).json({ id: result.insertId, message: 'Opportunity created' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create opportunity' });
  }
});

app.put('/api/opportunities/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM opportunities WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Opportunity not found' });
    }
    const o = { ...rows[0], ...req.body };

    if (!o.title || !o.description || !o.research_area || !o.faculty_name || !o.department || !o.required_skills || !o.deadline) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    if (!Number.isInteger(Number(o.positions)) || Number(o.positions) < 1) {
      return res.status(400).json({ error: 'Positions must be a positive whole number' });
    }
    if (!['Open', 'Closed'].includes(o.status)) {
      return res.status(400).json({ error: 'Status must be Open or Closed' });
    }

    await pool.query(
      'UPDATE opportunities SET title=?, description=?, research_area=?, faculty_name=?, department=?, required_skills=?, positions=?, deadline=?, status=? WHERE id=?',
      [o.title, o.description, o.research_area, o.faculty_name, o.department, o.required_skills, o.positions, o.deadline, o.status, req.params.id]
    );
    res.status(200).json({ message: 'Opportunity updated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update opportunity' });
  }
});

app.delete('/api/opportunities/:id', async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM opportunities WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Opportunity not found' });
    }
    res.status(200).json({ message: 'Opportunity deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete opportunity' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});