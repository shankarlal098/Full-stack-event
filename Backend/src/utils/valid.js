const validator = require("validator");

const valid = (data) => {

    const mandatoryFields = [
        "firstName",
        "emailId",
        "password"
    ];

    const isAllowed = mandatoryFields.every(
        (field) => Object.keys(data).includes(field)
    );

    if (!isAllowed) {
        throw new Error("Missing Required Fields");
    }

    if (!validator.isEmail(data.emailId)) {
        throw new Error("Invalid Email");
    }


};

module.exports = valid;