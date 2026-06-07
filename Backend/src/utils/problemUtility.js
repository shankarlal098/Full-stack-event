// utils/problemUtility.js

const axios = require("axios");


// LANGUAGE IDS
const getLanguageById = (lang) => {

    const languages = {
        "c++": 54,
        "java": 62,
        "javascript": 63
    };

    return languages[lang.toLowerCase()];
};


const SubmitBatch = async (submission) => {

    const options = {
        method: "POST",

        url: "YOUR_JUDGE0_SUBMIT_URL",

        params: {
            base64_encoded: "false"
        },

        headers: {
            "x-rapidapi-key": "YOUR_API_KEY",
            "x-rapidapi-host": "YOUR_API_HOST",
            "Content-Type": "application/json"
        },

        data: {
            submissions: submission
        }
    };

    try {

        const response = await axios.request(options);

        return response.data;

    }
    catch (error) {

        console.error(error);

        throw error;
    }
};


// WAIT FUNCTION
const waiting = (timer) => {

    return new Promise((resolve) => {

        setTimeout(resolve, timer);

    });

};


const SubmitToken = async (tokens) => {

    const options = {

        method: "GET",

        url: "YOUR_JUDGE0_RESULT_URL",

        params: {
            tokens: tokens.join(","),
            base64_encoded: "false",
            fields: "*"
        },

        headers: {
            "x-rapidapi-key": "YOUR_API_KEY",
            "x-rapidapi-host": "YOUR_API_HOST"
        }
    };

    // MAX 10 RETRIES
    for (let i = 0; i < 10; i++) {

        try {

            const response = await axios.request(options);

            const result = response.data;

            const isResultObtained = result.submissions.every(
                (r) => r.status.id > 2
            );

            if (isResultObtained) {

                return result.submissions;

            }

            await waiting(1000);

        }
        catch (error) {

            console.error(error);

            throw error;
        }
    }

    throw new Error("Execution timeout");
};


module.exports = {
    getLanguageById,
    SubmitBatch,
    SubmitToken
};

