import { createClient } from '../oauth/microsoft';

const fetchOutlookEmails = async (accessToken: string) => {
  const client = createClient(accessToken);

  const res = await client.api('/me/messages').filter('isRead eq false').get();
  return res.value;
};

export { fetchOutlookEmails };
