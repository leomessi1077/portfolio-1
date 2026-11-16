const express = require('express');
const router = express.Router();
const Visitor = require('../models/Visitor');

router.post('/visit', async (req, res) => {
  try {
    await req.app.locals.connectToDatabase();
    let visitor = await Visitor.findOne();
    if (!visitor) {
      visitor = new Visitor({ count: 1 });
    } else {
      visitor.count += 1;
      visitor.lastUpdated = new Date();
    }
    await visitor.save();
    res.json({ count: visitor.count });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/visitors', async (req, res) => {
  try {
    await req.app.locals.connectToDatabase();
    const visitor = await Visitor.findOne();
    res.json({ count: visitor ? visitor.count : 0 });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
