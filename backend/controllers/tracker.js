const { getDb } = require('../config/db');
const formatDocument = require('../util/format-document');

const { ObjectId } = require("mongodb");

exports.getGeneralNote = async (req, res, next) => {

    try {
        const db = getDb();
        const generalNote = await db.collection("general-note").find().toArray();
        res.json(generalNote.map(formatDocument));

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

exports.postAddGeneralNote = async (req, res, next) => {

    try {
        const db = getDb();
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
}

exports.updateGeneralNote = async (req, res, next) => {
    try {
        const db = getDb();
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
}

exports.deleteGeneralNote = async (req, res, next) => {

    try {
        const db = getDb();
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
}





exports.getRemoteLevel = async (req, res, next) => {


    try {
        const db = getDb();
        const remoteLevel = await db.collection("remote-level").find().toArray();
        res.json(remoteLevel.map(formatDocument));

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}


exports.postAddRemoteLevel = async (req, res, next) => {
    try {
        const db = getDb();
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
}

exports.updateRemoteLevel = async (req, res, next) => {
    try {
        const db = getDb();
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
}

exports.deleteRemoteLevel = async (req, res, next) => {
    try {
        const db = getDb();
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
}