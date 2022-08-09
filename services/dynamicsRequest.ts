import axios from "axios";
import { DynamicsRequest } from "../types/dynamics-365/customized/types";

export const dynamicsRequest = (accessToken: string) => {
  return {
    createRequest: async (request: DynamicsRequest) => {
      const result = await axios.post(
        `${process.env.CLIENT_URL}/api/data/v9.1/bsi_requests?$select=bsi_name,bsi_requestid,bsi_title`,
        request,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            Prefer: "return=representation",
            Accept: "application/json",
          },
        }
      );
      return result.data;
    },
    uploadFileToRequest: async (
      requestId: string,
      fileData: Buffer,
      fileName: string
    ) => {
      const result = await axios.patch(
        `${process.env.CLIENT_URL}/api/data/v9.1/bsi_requests(${requestId})/bsi_attachment`,
        fileData,
        {
          headers: {
            "Content-Type": "application/octet-stream",
            "x-ms-file-name": fileName,
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return result.data;
    },
  };
};
