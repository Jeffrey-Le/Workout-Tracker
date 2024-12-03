const router = require('express').Router();
const authenticeToken = require("../middleware/authMiddleware");

const bmiHistoryController = require('../controllers/bmiHistoryController');

router.use(authenticeToken);

router.delete("/delete/:id", bmiHistoryController.deleteBMIEntryByID);
router.put("/update", bmiHistoryController.updateBmiEntryByID);
router.post("/add", bmiHistoryController.addBMIEntry);
router.get("/graph", bmiHistoryController.getBmiGraph);
router.get("/:id", bmiHistoryController.getBmiEntry);
router.get("/user/:id", bmiHistoryController.getBmiEntriesByUser);
router.get("/date", bmiHistoryController.getBmiEntriesByDate);

module.exports = router;