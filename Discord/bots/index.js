require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 58420;
const {
  Client,
  GatewayIntentBits,
  MessageActionRow,
  MessageButton,
  ButtonStyle,
  ButtonBuilder,
  ActionRowBuilder
} = require('discord.js');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});
// Global function to send a DM to a user
async function discordDMPrivate(...args) {
  // Check if the number of arguments is greater than or equal to 2 and a multiple of 2
  console.log(`Number of arguments: ${args.length}`);
  for (let i = 0; i < args.length; i++) {
    console.log(`Argument ${i + 1}: ${args[i]}`);
  }

  if (args.length < 2 || args.length % 2 !== 0) {
    console.log('Invalid number of arguments. The number of arguments must be greater than or equal to 2 and a multiple of 2.');
    throw new Error('Invalid number of arguments. The number of arguments must be greater than or equal to 2 and a multiple of 2.');
  }

  // Iterate over the arguments in pairs
  for (let i = 0; i < args.length; i += 2) {
    const userId = args[i];
    const messageContent = args[i + 1];

    console.log(`Sending DM to user ${userId} with message: ${messageContent}`);

    // Send the message to the user
    const user = await client.users.fetch(userId);
    if (user) {
      user.send(messageContent)
        .then(() => {
          console.log(`Sent a DM to ${user.tag}`);
        })
        .catch((error) => {
          console.log(`Failed to send a DM to ${user.tag}: ${error}`);
        });
    } else {
      console.log('User not found.');
    }
  }
}


client.on('messageCreate', async (message) => {
  if (message.content.startsWith('!dm')) {
    // Split the message content on spaces, removing the !dm command
    const args = message.content.slice(4).split(' ');

    // Check if the number of arguments is greater than or equal to 2 and a multiple of 2
    if (args.length < 2 || args.length % 2 !== 0) {
      throw new Error('Invalid number of arguments. The number of arguments must be greater than or equal to 2 and a multiple of 2.');
    }

    // Call the discordDMPrivate() function with the user IDs and message content as arguments
    try {
      await discordDMPrivate(...args);
      message.channel.send('Sent DMs!');
    } catch (error) {
      message.channel.send(error.message);
    }
  }
});

client.on('messageCreate', async (message) => {
  if (message.content.startsWith('!sendPublic')) {
    // Extract the message content and user IDs using regular expressions
    const match = message.content.match(/^\!sendPublic\s*\[([^]+)\]\s*([\d\s]+)$/);

    console.log('Received message:', message.content);

    // Check if the message content and user IDs were provided
    if (!match) {
      console.log('Invalid command format.');
      message.channel.send('Usage: !sendPublic [message content] [user1] [user2] ...');
      return;
    }

    // Extract the message content and user IDs from the match
    const messageContent = match[1];
    const userIds = match[2].split(/\s+/).filter(Boolean);

    console.log('Message Content:', messageContent);
    console.log('User IDs:', userIds);

    // Check if the message content is empty
    if (!messageContent) {
      console.log('Message content is empty.');
      message.channel.send('Message content cannot be empty.');
      return;
    }

    // Fetch user data for all mentioned user IDs
    const usersData = [];
    for (const userId of userIds) {
      const user = await client.users.fetch(userId).catch((error) => {
        console.log(`Error fetching user with ID ${userId}:`, error);
        return null;
      });
      if (user) {
        usersData.push(user);
      }
    }

    // Check if all user IDs are valid
    if (usersData.length !== userIds.length) {
      console.log('Invalid user IDs found.');
      message.channel.send(`Invalid user ID(s) mentioned.`);
      return;
    }

    // Call the sendPublic() function with the cleaned message content and user IDs
    try {
      await sendPublic(messageContent, usersData);
      console.log('Message sent successfully.');
      message.channel.send('Sent message to public channel!');
    } catch (error) {
      console.error('Error sending message:', error.message);
      message.channel.send(error.message);
    }
  }
});

app.get('/senddm', async (req, res) => {
  const {
    userIds,
    messages
  } = req.query;

  console.log('Received /senddm request:');
  console.log('userIds:', userIds);
  console.log('messages:', messages);

  if (!userIds || !messages) {
    console.log('Invalid request. Please provide user IDs and messages.');
    return res.status(400).json({
      error: 'Invalid request. Please provide user IDs and messages.'
    });
  }

  const userIdArray = userIds.split(',');
  const messageArray = messages.split(',');

  console.log('Parsed user IDs:', userIdArray);
  console.log('Parsed messages:', messageArray);

  if (userIdArray.length === 0 || messageArray.length === 0) {
    console.log('No valid user IDs or messages provided.');
    return res.status(400).json({
      error: 'No valid user IDs or messages provided.'
    });
  }

  try {
    // Combine user IDs and messages into alternating pairs
    const args = [];

    if (userIdArray.length === 1 && messageArray.length === 1) {
      // Single user ID and single message
      args.push(userIdArray[0]);
      args.push(messageArray[0]);
    } else {
      // Handle multiple user IDs and messages
      const maxLength = Math.max(userIdArray.length, messageArray.length);

      for (let i = 0; i < maxLength; i++) {
        args.push(userIdArray[i % userIdArray.length]);
        args.push(messageArray[i % messageArray.length]);
      }
    }

    await discordDMPrivate(...args);
    console.log('DMs sent successfully!');
    return res.status(200).json({
      success: true,
      message: 'DMs sent successfully!'
    });
  } catch (error) {
    console.error('Failed to send DMs:', error.message);
    return res.status(500).json({
      error: 'Failed to send DMs.',
      details: error.message
    });
  }
});

async function sendPublic(messageContent, usersData, linkUrl) {
  // Get the hard-coded channel
  const channel = client.channels.cache.get('1160207522272129086');

  // Check if the channel exists
  if (!channel) {
    throw new Error('Channel not found.');
  }

  if (linkUrl == null) {
    const mentions = usersData.map((user) => user.toString());
    const messageToSend = `${messageContent}\n\nCadet Joining:\n${mentions.join(' ')}`;

    await channel.send({
      content: messageToSend
    });
  } else {

    // Create a list of mentions for all users
    const mentions = usersData.map((user) => user.toString());

    // Create a button with a link
    const butts = new ButtonBuilder()
      .setLabel('Event Link')
      .setURL(linkUrl)
      .setStyle(ButtonStyle.Link);


    const row = new ActionRowBuilder()
      .addComponents(butts);


    // Send the message to the hard-coded channel with the button
    const messageToSend = `${messageContent}\n\nCadet Joining:\n${mentions.join(' ')}`;

    await channel.send({
      content: messageToSend,
      components: [row]
    });
  }
}

app.get('/sendpublic', async (req, res) => {
  const {
    userIds,
    message,
    linkUrl
  } = req.query;

  console.log('Received /sendpublic request:');
  console.log('userIds:', userIds);
  console.log('message:', message);
  console.log('linkUrl:', linkUrl);

  if (!userIds || !message) {
    console.log('Invalid request. Please provide user IDs and message.');
    return res.status(400).json({
      error: 'Invalid request. Please provide user IDs and message.'
    });
  }

  const userIdArray = userIds.split(',');

  console.log('Parsed user IDs:', userIdArray);

  if (userIdArray.length === 0) {
    console.log('No valid user IDs provided.');
    return res.status(400).json({
      error: 'No valid user IDs provided.'
    });
  }

  try {
    // Fetch user data for all mentioned user IDs
    const usersData = [];
    for (const userId of userIdArray) {
      const user = await client.users.fetch(userId).catch((error) => {
        console.log(`Error fetching user with ID ${userId}:`, error);
        return null;
      });
      if (user) {
        usersData.push(user);
      }
    }

    // Check if all user IDs are valid
    if (usersData.length !== userIdArray.length) {
      console.log('Invalid user IDs found.');
      return res.status(400).json({
        error: 'Invalid user ID(s) mentioned.'
      });
    }

    // Call the sendPublic() function with the cleaned message content, user IDs, and link URL
    await sendPublic(message, usersData, linkUrl);
    console.log('Public message sent successfully.');
    return res.status(200).json({
      success: true,
      message: 'Public message sent successfully!'
    });
  } catch (error) {
    console.error('Error sending public message:', error.message);
    return res.status(500).json({
      error: 'Failed to send public message.',
      details: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Express server is running on port ${PORT}`);
});

client.login(process.env.TOKEN);
console.log('Bot is running!');