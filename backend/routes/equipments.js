const express = require("express");
const { ObjectId } = require("mongodb");

const router = express.Router();

const { getDB } = require("../config/db");


//--------- Counvert _id into id before sending data back to frontend ---------\\
function formatDocument(doc) {
    if (!doc) return null;

    const { _id, ...rest } = doc;
    return { id: _id.toString(), ...rest };

}

//------------------------------------------------------------------------------\\


router.get("/general-note", async (req, res, next) => {

    try {
        const db = getDB();
        const generalNote = await db.collection("general-note").find().toArray();
        res.json(generalNote.map(formatDocument));

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});


router.get("/machinery", async (req, res, next) => {


    try {
        const db = getDB();
        const machinery = await db.collection("machinery").find().toArray();
        res.json(machinery.map(formatDocument));

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

router.get("/telehut", async (req, res, next) => {

    try {
        const db = getDB();
        const telehut = await db.collection("telehut").find().toArray();
        res.json(telehut.map(formatDocument));
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

router.get("/remote-level", async (req, res, next) => {


    try {
        const db = getDB();
        const remoteLevel = await db.collection("remote-level").find().toArray();
        res.json(remoteLevel.map(formatDocument));

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});



router.post("/general-note", async (req, res, next) => {
    try {
        const db = getDB();
        const newGeneralNote = req.body;

        if (!newGeneralNote.text || !newGeneralNote.createdAt) {
            return res.status(400).json({ message: "Note bad input" })
        }

        const result = await db.collection("general-note").insertOne(newGeneralNote);
        const savedGeneralNote = await db.collection("general-note").findOne({
            _id: result.insertedId
        });
        res.status(201).json(formatDocument(savedGeneralNote));

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});


router.post("/machinery", async (req, res, next) => {
    try {
        const db = getDB();
        const newMachinery = req.body;

        if (
            !newMachinery.name ||
            !newMachinery.type ||
            !newMachinery.status ||
            typeof newMachinery.remoteCapable !== "boolean") {
            return res.status(400).json({ message: "Machinery bad input" })
        }

        const result = await db.collection("machinery").insertOne(newMachinery);
        const savedMachinery = await db.collection("machinery").findOne({
            _id: result.insertedId
        });
        res.status(201).json(formatDocument(savedMachinery));

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});


router.post("/telehut", async (req, res, next) => {
    try {
        const db = getDB();
        const newTelehut = req.body;

        if (!newTelehut.name || !newTelehut.location || !newTelehut.status) {
            return res.status(400).json({ message: "Telehut bad input" })
        }

        const result = await db.collection("telehut").insertOne(newTelehut);
        const savedTelehut = await db.collection("telehut").findOne(
            { _id: result.insertedId }
        );

        res.status(201).json(formatDocument(savedTelehut));
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});


router.post("/remote-level", async (req, res, next) => {
    try {
        const db = getDB();
        const newRemoteLevel = req.body;

        if (!newRemoteLevel.location || !newRemoteLevel.status) {
            return res.status(400).json({ message: "Remote level bad input" })
        }
        const result = await db.collection("remote-level").insertOne(newRemoteLevel);
        const savedRemoteLevel = await db.collection("remote-level").findOne({
            _id: result.insertedId
        })
        res.status(201).json(formatDocument(savedRemoteLevel));

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});


router.put("/general-note/:id", async (req, res, next) => {
    try {
        const db = getDB();
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid id" })
        }

        const result = await db.collection("general-note").updateOne(
            { _id: new ObjectId(id) }, {
            $set: {
                text: req.body.text,
                createdAt: req.body.createdAt
            }
        });
        const updated = await db.collection("general-note").findOne({
            _id: new ObjectId(id)
        })
        if (!updated) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.json(formatDocument(updated));

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});


router.put("/machinery/:id", async (req, res, next) => {
    try {
        const db = getDB();
        const { id } = req.params;


        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid id" })
        }

        const result = await db.collection("machinery").updateOne(
            { _id: new ObjectId(id) },
            {
                $set: {
                    name: req.body.name,
                    type: req.body.type,
                    status: req.body.status,
                    remoteCapable: req.body.remoteCapable,
                    notes: req.body.notes
                }
            }
        );

        const updated = await db.collection("machinery").findOne({
            _id: new ObjectId(id)
        });

        if (!updated) {
            return res.status(404).json({ message: "Machinery not found" });
        }

        res.json(formatDocument(updated));

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});


router.put("/telehut/:id", async (req, res, next) => {
    try {
        const db = getDB();
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid id" })
        };

        const result = await db.collection("telehut").updateOne({
            _id: new ObjectId(id)
        }, {
            $set: {
                name: req.body.name,
                location: req.body.location,
                status: req.body.status
            }
        })

        const updated = await db.collection("telehut").findOne({
            _id: new ObjectId(id)
        })

        if (!updated) {
            return res.status(404).json({ message: "Telehut not found" });
        }
        res.json(formatDocument(updated));

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});


router.put("/remote-level/:id", async (req, res, next) => {
    try {
        const db = getDB();
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid id" })
        }

        const result = await db.collection("remote-level").updateOne({
            _id: new ObjectId(id)
        }, {
            $set: {
                location: req.body.location,
                status: req.body.status,
                notes: req.body.notes
            }
        });

        const updated = await db.collection("remote-level").findOne({
            _id: new ObjectId(id)
        })
        res.json(formatDocument(updated));

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});


router.delete("/general-note/:id", async (req, res, next) => {

    try {
        const db = getDB();
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid id" })
        }

        const result = await db.collection("general-note").deleteOne({
            _id: new ObjectId(id)
        });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "General note not found" });
        }
        res.json(id);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});


router.delete("/machinery/:id", async (req, res, next) => {
    try {
        const db = getDB();
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid id" })
        }
        const result = await db.collection("machinery").deleteOne({
            _id: new ObjectId(id)
        });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Machinery not found" });
        }

        res.json(id);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});


router.delete("/telehut/:id", async (req, res, next) => {
    try {
        const db = getDB();
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid id" })
        }

        const result = await db.collection("telehut").deleteOne({
            _id: new ObjectId(id)
        });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Telehut not found" });
        }
        res.json(id);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});


router.delete("/remote-level/:id", async (req, res, next) => {
    try {
        const db = getDB();
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid id" })
        }

        const result = await db.collection("remote-level").deleteOne({
            _id: new ObjectId(id)
        });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Remote level not found" });
        }
        res.json(id);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});


module.exports = router;