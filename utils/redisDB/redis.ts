import Redis from "ioredis";

declare global {
  // eslint-disable-next-line
  var client: Redis;
}

if (!global.client) {
  global.client = new Redis(process.env.REDIS_URL!);
}

export default global.client;

// const client = new Redis(process.env.REDIS_URL!);

// export default client;

// const connect = async () => {
//   if (client.isOpen) {
//     console.log("Already connected to Redis");
//     return;
//   }

//   await client.connect();
//   console.log("Connected successfully.");
// };

// export const disconnect = async () => {
//   if (!client.isOpen) {
//     return;
//   }
//   console.log("Already disconnected");
//   await client.disconnect();
//   console.log("Disconnected.");
// };

export const tokenKeyExist = async () => {
  const exists = await global.client.exists("cachedCRINToken");
  return exists;
};

export const getcache = async () => {
  const cache = await global.client.get("cachedCRINToken");
  return cache;
};

export const setcache = async (token: string) => {
  await global.client.set("cachedCRINToken", token);
};
