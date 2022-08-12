import { WebApiConfig, retrieveMultiple } from "dataverse-webapi/lib/node";
import { DynamicsTheme } from "../types/dynamics-365/common/types";

export const dynamicsTechThemes = (accessToken: string) => {
  const config = new WebApiConfig("9.1", accessToken, process.env.CLIENT_URL);
  return {
    getAllTechThemes: async () => {
      const techThemes: any = await retrieveMultiple(
        config,
        "bsi_themes",
        `$orderby=bsi_name asc&$select=bsi_themeid,bsi_name`
      );

      if (techThemes.error) {
        throw new Error("D365 Error");
      }
      return techThemes.value as DynamicsTheme[];
    },
  };
};
