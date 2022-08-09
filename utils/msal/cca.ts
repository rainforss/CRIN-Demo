import { ConfidentialClientApplication, Configuration } from "@azure/msal-node";
import { cachePluginFunc } from "./cachePlugin";
import { getcache, setcache, tokenKeyExist } from "../redisDB/redis";

let cachedCca: ConfidentialClientApplication | null = null;

if (!cachedCca) {
  cachedCca = null;
}

export const instantiateCca = async () => {
  try {
    //If there is a globally cached cca instance, return the instance. Otherwise, create new instance
    if (cachedCca) {
      return cachedCca;
    }
    const cachePlugin = await cachePluginFunc(
      tokenKeyExist,
      setcache,
      getcache
    );
    const clientConfig: Configuration = {
      auth: {
        clientId: process.env.CLIENT_ID!,
        authority: `https://login.microsoftonline.com/${process.env.TENANT_ID}/`,
        clientSecret: process.env.CLIENT_SECRET,
        knownAuthorities: [
          `https://login.microsoftonline.com/${process.env.TENANT_ID}/`,
        ],
      },
      cache: {
        cachePlugin,
      },
    };
    const confidentialClientApplication = new ConfidentialClientApplication(
      clientConfig
    );
    cachedCca = confidentialClientApplication;
    return cachedCca;
  } catch (error: any) {
    //Typical D365 query error is an object with key 'error'
    if (error.error.code) {
      throw new Error("D365 Error");
    }
    throw error;
  }
};

// const cacheLocation = process.cwd() + "/data/cache.json";

// const cachePlugin = cachePluginFunc(cacheLocation);

// const clientConfig: Configuration = {
//   auth: {
//     clientId: process.env.CLIENT_ID!,
//     authority: `https://login.microsoftonline.com/${process.env.TENANT_ID}/`,
//     clientSecret: process.env.CLIENT_SECRET,
//     knownAuthorities: [
//       `https://login.microsoftonline.com/${process.env.TENANT_ID}/`,
//     ],
//   },
//   Comment out for deployment
//   cache: {
//     cachePlugin,
//   },
// };

// const confidentialClientApplication = new msal.ConfidentialClientApplication(
//   clientConfig
// );

// export default confidentialClientApplication;
