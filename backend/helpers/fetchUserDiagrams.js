const axios = require('axios')

async function fetchUserDiagrams(accessToken) {
    try {
        const response = await axios.get('https://coggle.it/api/1/diagrams', {
            headers: {
                Authorization: `Bearer ${accessToken}`, // Include the access token
            },
        });

        const diagrams = response.data;
        return diagrams;
    } catch (error) {
        console.error('Error fetching diagrams:', error.message);
        throw new Error('Failed to fetch diagrams');
    }
}

module.exports = fetchUserDiagrams;