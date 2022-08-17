import { WebApiConfig, retrieveMultiple } from "dataverse-webapi/lib/node";
import { DynamicsSector } from "../types/dynamics-365/common/types";

export const dynamicsOrganizationSector = (accessToken: string) => {
  const config = new WebApiConfig("9.1", accessToken, process.env.CLIENT_URL);
  return {
    getAllOrganizationSectors: async () => {
      const techThemes: any = await retrieveMultiple(
        config,
        "bsi_organizationsectors",
        `$orderby=bsi_name asc&$select=bsi_organizationsectorid,bsi_name`
      );

      if (techThemes.error) {
        throw new Error("D365 Error");
      }
      return techThemes.value as DynamicsSector[];
    },
  };
};
