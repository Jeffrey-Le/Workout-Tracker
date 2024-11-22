const router = require('express').Router();

const bmiHistoryController = require('../controllers/bmiHistoryController');

router.get("/:id", bmiHistoryController.getBmiEntry);
router.get("/user/:id", bmiHistoryController.getBmiEntriesByUser);
router.get("/date", bmiHistoryController.getBmiEntriesByDate);
router.post("/add", bmiHistoryController.addBMIEntry);
router.put("/update", bmiHistoryController.updateBmiEntryByID);
router.delete("/delete/:id", bmiHistoryController.deleteBMIEntryByID);

module.exports = router;