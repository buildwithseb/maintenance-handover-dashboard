const { getDb } = require('../config/db');
const formatDocument = require('../util/format-document');

const { ObjectId } = require("mongodb");



exports.getMachinery = async (req, res, next) => {


    try {
        const db = getDb();
        const machinery = await db.collection("machinery").find().toArray();
        res.json(machinery.map(formatDocument));

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

exports.getTelehut = async (req, res, next) => {

    try {
        const db = getDb();
        const telehut = await db.collection("telehut").find().toArray();
        res.json(telehut.map(formatDocument));
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}


exports.postAddMachinery = async (req, res, next) => {
    try {
        const db = getDb();
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
}

exports.postAddTelehut = async (req, res, next) => {
    try {
        const db = getDb();
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
}



exports.updateMachinery = async (req, res, next) => {
    try {
        const db = getDb();
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
}

exports.updateTelehut = async (req, res, next) => {
    try {
        const db = getDb();
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
}




exports.deleteMachinery = async (req, res, next) => {
    try {
        const db = getDb();
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
}

exports.deleteTelehut = async (req, res, next) => {
    try {
        const db = getDb();
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
}

