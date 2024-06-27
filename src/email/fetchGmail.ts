import { google } from 'googleapis';
import { oauth2Client } from '../oauth/google';

const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

const fetchGmailEmails = async () => {
  const res = await gmail.users.messages.list({
    userId: 'me',
    q: 'is:unread'
  });

  const messages = res.data.messages || [];
  const emails = [];

  for (const message of messages) {
    const msg = await gmail.users.messages.get({
      userId: 'me',
      id: message.id!
    });

    emails.push(msg.data);
  }

  return emails;
};

export { fetchGmailEmails };
