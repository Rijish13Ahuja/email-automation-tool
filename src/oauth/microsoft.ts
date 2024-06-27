// src/oauth/microsoft.ts
import { ConfidentialClientApplication } from '@azure/msal-node';

const msalConfig = {
  auth: {
    clientId: process.env.MICROSOFT_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${process.env.MICROSOFT_TENANT_ID}`,
    clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
  },
};

const pca = new ConfidentialClientApplication(msalConfig);

export function getMicrosoftAuthUrl() {
  const authCodeUrlParameters = {
    scopes: ["https://graph.microsoft.com/.default"],
    redirectUri: process.env.MICROSOFT_REDIRECT_URL,
  };

  return pca.getAuthCodeUrl(authCodeUrlParameters);
}

export async function getMicrosoftToken(code: string) {
  const tokenRequest = {
    code,
    scopes: ["https://graph.microsoft.com/.default"],
    redirectUri: process.env.MICROSOFT_REDIRECT_URL,
  };

  const response = await pca.acquireTokenByCode(tokenRequest);
  return response.accessToken;
}
