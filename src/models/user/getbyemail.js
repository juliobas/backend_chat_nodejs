const db = require("../../database/db");

const getByEmail = (email) => {
    const query = "SELECT * FROM users WHERE email = ?";
    return new Promise((resolve, reject) => {
        db.get(query, [email], (err, row) => {
            if (err) {
                return reject(err);
            }
            return resolve(row);
        });
    });
};

module.exports = getByEmail;