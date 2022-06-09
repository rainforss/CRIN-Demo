import {
  WebApiConfig,
  retrieveMultiple,
  createWithReturnData,
} from "dataverse-webapi/lib/node";
import { User } from "../types/authentication";
import { Contact, Member } from "../types/dynamics-365/common/types";

export const dynamicsContact = (accessToken: string) => {
  const config = new WebApiConfig("9.1", accessToken, process.env.CLIENT_URL);
  return {
    getByUsername: async (username: string) => {
      const contact = await retrieveMultiple(
        config,
        "contacts",
        `$filter=statecode eq 0 and bsi_username eq '${username}'&$select=fullname,emailaddress1,bsi_password,bsi_username`
      );

      return contact.value as Contact[];
    },

    getByUsernameOrEmail: async (username: string, email: string) => {
      const contact = await retrieveMultiple(
        config,
        "contacts",
        `$filter=statecode eq 0 and (bsi_username eq '${username}' or emailaddress1 eq '${email}')&$select=fullname,emailaddress1,bsi_password,bsi_username`
      );

      return contact.value as Contact[];
    },

    getByMemberType: async (membertype: number) => {
      const contacts = await retrieveMultiple(
        config,
        "contacts",
        `$filter=customertypecode eq ${membertype}&$select=fullname,emailaddress1,customertypecode,bsi_organization,jobtitle`,
        { representation: true }
      );

      return contacts.value as Member[];
    },

    getBySearchstringMemberType: async (
      searchstring?: string,
      membertype?: number
    ) => {
      let filterString = "";
      if (searchstring) {
        filterString += `$filter=fullname contains ${searchstring}`;
        if (membertype !== undefined) {
          filterString += ` and customertypecode eq ${membertype}`;
        }
      } else {
        if (membertype !== undefined) {
          filterString += `$filter=customertypecode eq ${membertype}`;
        }
      }

      const contacts = await retrieveMultiple(
        config,
        "contacts",
        `${
          !!filterString ? `${filterString}&` : ""
        }$select=fullname,emailaddress1,customertypecode,bsi_organization,jobtitle`,
        { representation: true }
      );

      return contacts.value as Member[];
    },

    createUser: async (user: User) => {
      const createdUser = await createWithReturnData(
        config,
        "contacts",
        {
          bsi_username: user.username,
          bsi_password: user.password,
          firstname: user.firstName,
          lastname: user.lastName,
          emailaddress1: user.email,
        },
        "$select=contactid,firstname,lastname,emailaddress1,bsi_username"
      );
      if (createdUser.error) {
        throw createdUser.error;
      }
      return createdUser;
    },
  };
};
