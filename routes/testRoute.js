// api/routes/testRoute.js
const express = require('express');
const router = express.Router();
const pool = require('../config/database');

router.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
