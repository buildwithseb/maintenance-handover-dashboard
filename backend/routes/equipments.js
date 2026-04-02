const express = require("express");

const router = express.Router();

const crypto = require("crypto");

const machineryList =
    [
        {
            id: crypto.randomUUID(),
            name: "LH517/01",
            type: "loader",
            status: "available",
            remoteCapable: true,
            notes: "Notes goes here"
        }, {
            id: crypto.randomUUID(),
            name: "LH517/012",
            type: "loader",
            status: "available",
            remoteCapable: true,
            notes: "Notes goes hereeeee"
        }];

const telehutList = [];
const remoteLevelList = [];
const generalNoteList = [];


router.get("/machinery", (req, res, next) => {

    try {
        const data = machineryList;
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

router.get("/telehut", (req, res, next) => {

    try {
        const data = telehutList;
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

router.get("/remote-level", (req, res, next) => {


    try {
        const data = remoteLevelList;
        res.status(200).json(data);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

router.get("/general-note", (req, res, next) => {

    try {
        const data = generalNoteList
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

router.post("/general-note", (req, res, next) => {
    try {
        const newGeneralNote = req.body;
        if (!newGeneralNote.text || !newGeneralNote.createdAt) {
            return res.status(400).json({ message: "Note bad input" })
        }
        newGeneralNote.id = crypto.randomUUID();
        generalNoteList.push(newGeneralNote)
        res.status(201).json(newGeneralNote);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});


router.post("/machinery", (req, res, next) => {
    try {
        const newMachinery = req.body;
        if (!newMachinery.name ||
            !newMachinery.type ||
            !newMachinery.status ||
            typeof newMachinery.remoteCapable !== "boolean") {
            return res.status(400).json({ message: "Machinery bad input" })
        }
        newMachinery.id = crypto.randomUUID();
        machineryList.push(newMachinery);
        res.status(201).json(newMachinery);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});


router.post("/telehut", (req, res, next) => {
    try {
        const newTelehut = req.body;
        if (!newTelehut.name || !newTelehut.location || !newTelehut.status) {
            return res.status(400).json({ message: "Telehut bad input" })
        }
        newTelehut.id = crypto.randomUUID();
        telehutList.push(newTelehut);
        res.status(201).json(newTelehut);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});


router.post("/remote-level", (req, res, next) => {
    try {
        const newRemoteLevel = req.body;
        if (!newRemoteLevel.location || !newRemoteLevel.status) {
            return res.status(400).json({ message: "Remote level bad input" })
        }
        newRemoteLevel.id = crypto.randomUUID();
        remoteLevelList.push(newRemoteLevel)
        res.status(201).json(newRemoteLevel);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});


router.put("/general-note/:id", (req, res, next) => {
    try {
        const generalNote = generalNoteList.find(n => n.id.toString() === req.params.id);
        if (!generalNote) {
            return res.status(404).json({ message: "Note not found" });
        }
        generalNote.text = req.body.text ?? generalNote.text;
        generalNote.createdAt = req.body.createdAt ?? generalNote.createdAt;

        res.json(generalNote);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});


router.put("/machinery/:id", (req, res, next) => {
    try {
        const machinery = machineryList.find(m => m.id.toString() === req.params.id);
        if (!machinery) {
            return res.status(404).json({ message: "Machinery not found" });
        };
        machinery.name = req.body.name ?? machinery.name;
        machinery.type = req.body.type ?? machinery.type;
        machinery.status = req.body.status ?? machinery.status;
        machinery.remoteCapable = req.body.remoteCapable ?? machinery.remoteCapable;
        machinery.notes = req.body.notes ?? machinery.notes;

        res.json(machinery);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});


router.put("/telehut/:id", (req, res, next) => {
    try {
        const telehut = telehutList.find(tel => tel.id.toString() === req.params.id);
        if (!telehut) {
            return res.status(404).json({ message: "Telehut not found" })
        };

        telehut.name = req.body.name ?? telehut.name;
        telehut.location = req.body.location ?? telehut.location;
        telehut.status = req.body.status ?? telehut.status;

        res.json(telehut)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});


router.put("/remote-level/:id", (req, res, next) => {
    try {
        const remoteLevel = remoteLevelList.find(lev => lev.id.toString() === req.params.id);
        if (!remoteLevel) {
            return res.status(404).json({ message: "Remote level not found" })
        }
        remoteLevel.location = req.body.location ?? remoteLevel.location;
        remoteLevel.status = req.body.status ?? remoteLevel.status;
        remoteLevel.notes = req.body.notes ?? remoteLevel.notes;
        
        res.json(remoteLevel);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});


router.delete("/general-note/:id", (req, res, next) => {
    try {
        const index = generalNoteList.findIndex(note => note.id.toString() === req.params.id);
        if (index === -1) {
            return res.status(404).json({ message: "General note not found" })
        }
        generalNoteList.splice(index, 1);
        res.json(req.params.id);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});


router.delete("/machinery/:id", (req, res, next) => {
    try {
        const index = machineryList.findIndex(ma => ma.id.toString() === req.params.id);
        if (index === -1) {
            return res.status(404).json({ message: "Machinery not found" })
        }
        machineryList.splice(index, 1);
        res.json(req.params.id);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});


router.delete("/telehut/:id", (req, res, next) => {
    try {
        const index = telehutList.findIndex(tel => tel.id.toString() === req.params.id);
        if (index === -1) {
            return res.status(404).json({ message: "Telehut not found" })
        }
        telehutList.splice(index, 1);
        res.json(req.params.id);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});


router.delete("/remote-level/:id", (req, res, next) => {
    try {
        const index = remoteLevelList.findIndex(lev => lev.id.toString() === req.params.id);
        if (index === -1) {
            return res.status(404).json({ message: "Remote level not found" })
        }
        remoteLevelList.splice(index, 1);
        res.json(req.params.id);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});


module.exports = router;