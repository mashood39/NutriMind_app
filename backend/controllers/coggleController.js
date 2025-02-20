// const fetchUserDiagrams = require('../helpers/fetchUserDiagrams')
const axios = require('axios')

const fetchDiagrams = async (req, res) => {
    const accessToken = process.env.ACCESS_TOKEN; // Replace this with a token management system in production

    if (!accessToken) {
        return res.status(400).send('Access token is missing');
    }

    try {
        // const diagrams = await fetchUserDiagrams(accessToken);
        const response = await axios.get('https://coggle.it/api/1/diagrams', {
            headers: {
                Authorization: `Bearer ${accessToken}`, // Include the access token
            },
        });
        const diagrams = response.data;
        res.json(diagrams);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = { fetchDiagrams }