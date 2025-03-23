// Create an API to query Microsoft Dynamics for Customer Names
// and return the results as a JSON object

// Import the required libraries
const express = require("express");
const fetch = require("node-fetch");
const app = express();
const port = 3000;

const ACCESS_TOKEN = process.env.ACCESS_TOKEN; // Use environment variable for access token

// Define the API endpoint
app.get("/api/customers", async (req, res) => {
    // Get the query parameter from the request
    const query = req.query.query;
    
    // Create the URL to query Microsoft Dynamics
    const url = `https://api.powerplatform.microsoft.com/v1.0/contosocustomers?$filter=contains(name,'${query}')&$select=name`;
    
    // Create the request headers
     const headers = {
        "Authorization": `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
    };
    
    // Make the request to Microsoft Dynamics
    const response = await fetch(url, {
        method: "GET",
        headers: headers,
    });
    
    // Parse the response as JSON
    const data = await response.json();
    
    // Return the data as a JSON object
    res.json(data);
    });
