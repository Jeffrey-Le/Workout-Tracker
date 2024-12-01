const router = require("express").Router();
const authenticeToken = require("../middleware/authMiddleware");

const PlanController = require("../controllers/planController");

router.use(authenticeToken);

router.get("/:id", PlanController.getPlan);
router.get("/user/:id", PlanController.getPlanByUser);
router.get("/date", PlanController.getPlanByDate);
router.post("/add", PlanController.addPlan);
router.put("/update", PlanController.updatePlanByID);
router.delete("/delete/:id", PlanController.deletePlanByID);

module.exports = router;