const db = require("../../database/db");

const getById = (email) => {
    const query = "SELECT * FROM users WHERE id = ?";
    return new Promise((resolve, reject) => {
        db.get(query, [email], (err, row) => {
            if (err) {
                return reject(err);
            }
            return resolve(row);
        });
    });
};

module.exports = getById;