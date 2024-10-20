const axios = require('axios');

// Base URL for Microsoft Dynamics API
const BASE_URL = 'https://your-dynamics-instance.api.crm.dynamics.com/api/data/v9.1';

// Function to get access token
async function getAccessToken(clientId, clientSecret, tenantId) {
    const tokenUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('client_id', clientId);
    params.append('client_secret', clientSecret);
    params.append('scope', `${BASE_URL}/.default`);

    try {
        const response = await axios.post(tokenUrl, params);
        return response.data.access_token;
    } catch (error) {
        console.error('Error fetching access token:', error);
        throw error;
    }
}

// Function to collect user data
async function getUserData(accessToken) {
    const url = `${BASE_URL}/systemusers`;

    try {
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'OData-MaxVersion': '4.0',
                'OData-Version': '4.0',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        return response.data.value;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
}

// Export functions
module.exports = {
    getAccessToken,
    getUserData
};