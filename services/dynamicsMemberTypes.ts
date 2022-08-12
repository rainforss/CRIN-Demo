import axios from "axios";

export const dynamicsMemberTypes = (accessToken: string) => {
  return {
    getAllMemberTypes: async () => {
      try {
        const result = await axios.get(
          `${process.env.CLIENT_URL}/api/data/v9.1/GlobalOptionSetDefinitions(56996a0c-b7c4-ec11-a7b5-000d3af44a29)`,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        return result.data.Options;
      } catch (error: any) {
        console.log(error);
        throw error;
      }
    },
  };
};
