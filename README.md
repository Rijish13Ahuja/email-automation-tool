# Email Automation Tool

## Description

The Email Automation Tool is a Node.js application designed to automate email processing tasks using Google and Outlook APIs. It integrates OAuth for authentication, processes incoming emails, categorizes them using AI, and sends automated replies based on the email content. The tool utilizes BullMQ for efficient task scheduling to manage email processing tasks asynchronously.

## Features

- **OAuth Integration:** Supports authentication with Google and Outlook APIs using OAuth.
- **Email Processing:** Processes incoming emails to categorize and generate automated replies.
- **AI Integration:** Utilizes OpenAI for natural language processing to categorize and respond to emails.
- **Task Scheduling:** Implements BullMQ for task queue management, ensuring efficient email processing.
- **REST API:** Provides endpoints for authentication, email processing, and status monitoring.

## Technologies Used

- Node.js
- Express.js
- Google APIs (gmail-auth-library)
- Microsoft Graph API (@microsoft/microsoft-graph-client)
- OpenAI API
- BullMQ (task scheduling)
- Axios (HTTP requests)
- dotenv (environment variables)
- @azure/msal-node (Microsoft Authentication Library for Node.js)


