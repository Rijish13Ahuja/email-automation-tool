import { Worker } from 'bullmq';
import { fetchEmails, categorizeEmail, generateResponse, sendResponse } from '../utils/email';

const connection = {
  host: 'localhost',
  port: 6379,
};

const worker = new Worker('emailQueue', async job => {
  switch (job.name) {
    case 'fetchEmails':
      const emails = await fetchEmails(job.data.service, job.data.token);
      for (const email of emails) {
        const category = await categorizeEmail(email.content);
        const response = await generateResponse(category);
        await sendResponse(job.data.service, email, response);
      }
      break;
  }
}, { connection });

export { worker };
