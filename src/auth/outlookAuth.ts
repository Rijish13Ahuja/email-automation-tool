import { ConfidentialClientApplication } from "@azure/msal-node";
import { ClientSecretCredential } from "@azure/identity";
import { TokenCredentialAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials";
import dotenv from "dotenv";

dotenv.config();

console.log("OUTLOOK_CLIENT_ID:", process.env.OUTLOOK_CLIENT_ID);
console.log("TENANT_ID:", process.env.TENANT_ID);
console.log("OUTLOOK_CLIENT_SECRET:", process.env.OUTLOOK_CLIENT_SECRET);

const config = {
  auth: {
    clientId: process.env.OUTLOOK_CLIENT_ID || "",
    authority: `https://login.microsoftonline.com/${process.env.TENANT_ID}`,
    clientSecret: process.env.OUTLOOK_CLIENT_SECRET || "",
  },
};

const pca = new ConfidentialClientApplication(config);

export const getOutlookAuthUrl = async (): Promise<string> => {
  const authCodeUrlParameters = {
    scopes: ["https://graph.microsoft.com/.default"],
    redirectUri: process.env.OUTLOOK_REDIRECT_URI || "",
  };

  return pca.getAuthCodeUrl(authCodeUrlParameters);
};

export const getOutlookToken = async (code: string) => {
  const tokenRequest = {
    code: code,
    scopes: ["https://graph.microsoft.com/.default"],
    redirectUri: process.env.OUTLOOK_REDIRECT_URI || "",
  };

  const response = await pca.acquireTokenByCode(tokenRequest);
  return response?.accessToken;
};

export const getOutlookService = () => {
  const credential = new ClientSecretCredential(
    process.env.TENANT_ID || "",
    process.env.OUTLOOK_CLIENT_ID || "",
    process.env.OUTLOOK_CLIENT_SECRET || ""
  );

  return new TokenCredentialAuthenticationProvider(credential, {
    scopes: ["https://graph.microsoft.com/.default"],
  });
};
