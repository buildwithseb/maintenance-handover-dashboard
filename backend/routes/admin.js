const express = require("express");

const adminControllers = require('../controllers/admin');

const router = express.Router();


router.get("/machinery", adminControllers.getMachinery);

router.get("/telehut", adminControllers.getTelehut);

router.post("/machinery", adminControllers.postAddMachinery);

router.post("/telehut", adminControllers.postAddTelehut);

router.put("/machinery/:id", adminControllers.updateMachinery);

router.put("/telehut/:id", adminControllers.updateTelehut);

router.delete("/machinery/:id", adminControllers.deleteMachinery);

router.delete("/telehut/:id", adminControllers.deleteTelehut);


module.exports = router;