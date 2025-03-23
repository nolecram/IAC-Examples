const axios = require('axios');

const GITHUB_API_URL = 'https://your-github-enterprise-server/api/v3';
const TOKEN = process.env.GITHUB_TOKEN; // Use environment variable for token

async function getGitHubEnterpriseStats() {
    try {
        // Set up the headers for the API requests, including the authorization token
        const headers = {
            'Authorization': `token ${TOKEN}`,
            'Accept': 'application/vnd.github.v3+json'
        };

        // Get the number of users
        // Make a GET request to the /users endpoint
        const usersResponse = await axios.get(`${GITHUB_API_URL}/users`, { headers });
        // Extract the number of users from the response data
        const numberOfUsers = usersResponse.data.length;

        // Get the number of licenses
        // Make a GET request to the /enterprise/settings/license endpoint
        const licensesResponse = await axios.get(`${GITHUB_API_URL}/enterprise/settings/license`, { headers });
        // Extract the number of licenses from the response data
        const numberOfLicenses = licensesResponse.data.seats;

        // Get the number of active committers
        // Make a GET request to the /enterprise/stats/commits endpoint
        const activeCommittersResponse = await axios.get(`${GITHUB_API_URL}/enterprise/stats/commits`, { headers });
        // Extract the number of active committers from the response data
        const numberOfActiveCommitters = activeCommittersResponse.data.active_committers;

        // Log the results to the console
        console.log(`Number of Users: ${numberOfUsers}`);
        console.log(`Number of Licenses: ${numberOfLicenses}`);
        console.log(`Number of Active Committers: ${numberOfActiveCommitters}`);
    } catch (error) {
        // Log any errors that occur during the API requests
        console.error('Error fetching GitHub Enterprise stats:', error);
    }
}

// Call the function to get and log the GitHub Enterprise stats
getGitHubEnterpriseStats();