const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Configuration for Azure AD and Dynamics instance
const clientId = 'YOUR_CLIENT_ID';
const clientSecret = 'YOUR_CLIENT_SECRET';
const tenantId = 'YOUR_TENANT_ID';
const resource = 'https://your-dynamics-instance.api.crm.dynamics.com';
const authority = `https://login.microsoftonline.com/${tenantId}/oauth2/token`;

/**
 * Function to get access token from Azure AD
 * @returns {Promise<string>} - A promise that resolves to the access token
 */
async function getAccessToken() {
    try {
        const response = await axios.post(authority, null, {
            params: {
                grant_type: 'client_credentials',
                client_id: clientId,
                client_secret: clientSecret,
                resource: resource
            }
        });
        return response.data.access_token;
    } catch (error) {
        throw new Error('Failed to fetch access token');
    }
}

/**
 * Route to get list of users from Microsoft Dynamics
 */
app.get('/users', async (req, res) => {
    try {
        const token = await getAccessToken();
        const response = await axios.get(`${resource}/api/data/v9.1/systemusers`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        res.json(response.data.value);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app; // Export the app for testing