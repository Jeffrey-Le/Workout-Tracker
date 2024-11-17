const router = require("express").Router();

const ReminderController = require("../controllers/reminderController");

router.get("/:id", ReminderController.getReminder);
router.get("/user:id", ReminderController.getReminderByUser);
router.get("/date", ReminderController.getReminderByDate);
router.post("/add", ReminderController.addReminder);
router.put("/update", ReminderController.updateReminderByID);
router.delete("/delete/:id", ReminderController.deleteReminderByID);

module.exports = router;