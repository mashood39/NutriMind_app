const fetchUserDiagrams = require('../helpers/fetchUserDiagrams')

const fetchDiagrams = async (req, res) => {
    const accessToken = process.env.ACCESS_TOKEN; // Replace this with a token management system in production

    if (!accessToken) {
        return res.status(400).send('Access token is missing');
    }

    try {
        const diagrams = await fetchUserDiagrams(accessToken);
        res.json(diagrams);
    } catch (error) {
        res.status(500).send(error.message);
    }
}



module.exports = { fetchDiagrams }