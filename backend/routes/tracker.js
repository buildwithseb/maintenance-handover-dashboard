const express = require("express");

const trackerControllers = require('../controllers/tracker');

const router = express.Router();


router.get("/general-note", trackerControllers.getGeneralNote);

router.get("/remote-level", trackerControllers.getRemoteLevel);

router.post("/general-note", trackerControllers.postAddGeneralNote);

router.post("/remote-level", trackerControllers.postAddRemoteLevel);

router.put("/general-note/:id", trackerControllers.updateGeneralNote);

router.put("/remote-level/:id", trackerControllers.updateRemoteLevel);

router.delete("/general-note/:id", trackerControllers.deleteGeneralNote);

router.delete("/remote-level/:id", trackerControllers.deleteRemoteLevel);


module.exports = router;