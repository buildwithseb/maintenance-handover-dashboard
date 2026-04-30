const express = require("express");

const adminControllers = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

const router = express.Router();


router.get("/machinery", adminControllers.getMachinery);

router.get("/telehut", adminControllers.getTelehut);

router.post("/machinery", isAuth, adminControllers.postAddMachinery);

router.post("/telehut", isAuth, adminControllers.postAddTelehut);

router.put("/machinery/:id", isAuth,adminControllers.updateMachinery);

router.put("/telehut/:id", isAuth, adminControllers.updateTelehut);

router.delete("/machinery/:id", isAuth, adminControllers.deleteMachinery);

router.delete("/telehut/:id", isAuth, adminControllers.deleteTelehut);


module.exports = router;