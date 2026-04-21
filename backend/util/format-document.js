//--------- Counvert _id into id before sending data back to frontend ---------\\
function formatDocument(doc) {
    
    if (!doc) return null;

    const { _id, ...rest } = doc;
    return { id: _id.toString(), ...rest };

}

module.exports = formatDocument;