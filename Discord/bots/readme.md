Route: /senddm
Description:
This route allows you to send private Direct Messages (DMs) to one or more users on Discord. You can send DMs to multiple users with corresponding messages.

HTTP Method: GET
Parameters:
userIds (Array): An array of Discord user IDs to whom you want to send DMs. Each user ID should be separated by a comma.
messages (Array): An array of messages corresponding to each user ID. Each message should be separated by a comma. The number of user IDs and messages must match.
Example Usage:
Request:
GET /senddm?userIds=12345,67890&messages=Hello,How are you?
Responses:

Success (HTTP Status 200):
{
  "success": true,
  "message": "DMs sent successfully!"
}
Failure (HTTP Status 400):
{
  "error": "Invalid number of user IDs and messages."
}
Failure (HTTP Status 500):
{
  "error": "Failed to send DMs.",
  "details": "Details of the error message."
}
Route: /sendpublic
Description:
This route allows you to send public messages in a specific Discord channel by mentioning one or more users. You can also include a button with a link in the message.

HTTP Method: GET
Parameters:
userIds (Array): An array of Discord user IDs to mention in the public message. Each user ID should be separated by a comma.
message (String): The message content that you want to send to the specified users.
linkUrl (String, optional): The URL you want to include in a button in the message.
Example Usage:
Request:
GET /sendpublic?userIds=12345,67890&message=Hello everyone!&linkUrl=https://example.com
Responses:
Success (HTTP Status 200):
{
  "success": true,
  "message": "Public message sent successfully!"
}
Failure (HTTP Status 400):
{
  "error": "Invalid user IDs or message."
}
Failure (HTTP Status 500):
{
  "error": "Failed to send public message.",
  "details": "Details of the error message."
}