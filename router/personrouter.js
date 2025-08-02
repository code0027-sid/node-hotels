const express = require('express');
const router = express.Router();
const prof = require('../module/personschema');
const passport = require('passport');

router.use(express.json());

router.post('/signup', async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new prof(data);
    const response = await newPerson.save();
    console.log("Person saved to DB");
    res.status(201).json({ message: "Person created", data: response });
  } catch (error) {
    console.error("Error saving person:", error.message);
    res.status(400).json({ error: "Failed to create person", details: error.message });
  }
});

// Protected GET route
router.get('/person', passport.authenticate('local', { session: false }), async (req, res) => {
  try {
    const foundperson = await prof.findById(req.user.id, '-password');
    console.log("Protected data fetched for user:", req.user.username);
    res.status(200).json(foundperson);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Filter by profession
router.get('/person/:worktype', async (req, res) => {
  try {
    const worktype = req.params.worktype;
    if (worktype === "chief" || worktype === "manager") {
      const response = await prof.find({ profession: worktype });
      res.status(200).json(response);
    } else {
      res.status(400).json({ error: "Invalid worktype" });
    }
  } catch (error) {
    console.log("Could not find the user");
    res.status(500).json({ error: "The person not found in the database" });
  }
});

module.exports = router;
