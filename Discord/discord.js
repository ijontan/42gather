const express = require('express');
const axios = require('axios');
const { Client } = require('discord.js');
require('dotenv').config();

const app = express();
const port = 3000;

// Replace these with your Discord OAuth2 credentials
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectUri = 'http://localhost:3000/callback'; // Update with your redirect URI

const discordClient = new Client({ intents: 123 });



// Define an endpoint to initiate the OAuth2 flow
app.get('/login', (req, res) => {
  const authUrl = process.env.AUTH_URL;

  res.redirect(authUrl);
});

// Define a callback endpoint to handle the OAuth2 callback
app.get('/callback', async (req, res) => {
  const code = req.query.code;

  if (!code) {
    return res.status(400).send('No authorization code received.');
  }

  // Exchange the authorization code for an access token
  const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
    method: 'POST',
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      code: code,
      grant_type: 'authorization_code',
      redirect_uri: redirectUri,
      scope: 'identify',
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  const tokenData = await tokenResponse.json();

  if (!tokenData.access_token) {
    return res.status(500).send('Failed to obtain access token.');
  }

  // Log the retrieved data
  console.log('Access Token Data:');
  console.log(tokenData);

  // Make a request to the Discord API with the access token
  const userResponse = await fetch('https://discordapp.com/api/users/@me', {
    headers: {
      Authorization: `Bearer ${tokenData.access_token}`,
    },
  });

  const userData = await userResponse.json();

  if (userResponse.status !== 200) {
    return res.status(userResponse.status).json(userData);
  }

  // Log the user data from the API response
  console.log('User Data:');
  console.log(userData);

  res.send('Authentication data logged. Check the console for details.');
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});