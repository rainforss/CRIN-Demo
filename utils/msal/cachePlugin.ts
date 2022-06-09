import { TokenCacheContext } from "@azure/msal-node";

export async function cachePluginFunc(
  tokenExists: () => Promise<number>,
  setToken: (token: string) => Promise<void>,
  getToken: () => Promise<string | null>
) {
  const doesTokenExist = await tokenExists();
  const beforeCacheAccess = (cacheContext: TokenCacheContext) => {
    return new Promise<void>((resolve, reject) => {
      if (doesTokenExist === 1) {
        getToken()
          .then((data) => {
            cacheContext.tokenCache.deserialize(data || "");
            resolve();
          })
          .catch((err) => reject(err));
      } else {
        setToken(cacheContext.tokenCache.serialize()).catch((err) =>
          reject(err)
        );
      }
    });
  };

  const afterCacheAccess = (cacheContext: TokenCacheContext) => {
    return new Promise<void>((resolve, reject) => {
      if (cacheContext.cacheHasChanged) {
        setToken(cacheContext.tokenCache.serialize())
          .then(() => resolve())
          .catch((err) => reject(err));
      } else {
        resolve();
      }
    });
  };

  return {
    beforeCacheAccess,
    afterCacheAccess,
  };
}
