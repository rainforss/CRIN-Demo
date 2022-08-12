import {
  WebApiConfig,
  retrieveMultiple,
  createWithReturnData,
  retrieve,
} from "dataverse-webapi/lib/node";
import { User } from "../types/authentication";
import { Contact, Member } from "../types/dynamics-365/common/types";

export const dynamicsContact = (accessToken: string) => {
  const config = new WebApiConfig("9.1", accessToken, process.env.CLIENT_URL);
  return {
    //Get only 10 member profiles for members with limited access
    getMemberProfilesForIntermediateAccessMember: async () => {
      const members = await retrieveMultiple(
        config,
        "contacts",
        `$top=9&$orderby=firstname asc&$select=bsi_membertype,bsi_linkedinprofile,bsi_twitterprofile,bsi_othersocialmediaprofile,fullname,emailaddress1,telephone1,address1_city,address1_country,jobtitle&$expand=bsi_MemberCompany($select=bsi_name,bsi_organizationsize),bsi_MemberAssociatedSector_Member_Contact($select=bsi_name),bsi_bsi_memberassociatedtheme_Member_contact($select=bsi_name)`,
        { representation: true }
      );

      return members.value as Contact[];
    },

    //Get the contact record from D365 by querying the username
    getByUsername: async (username: string) => {
      const contact = await retrieveMultiple(
        config,
        "contacts",
        `$filter=statecode eq 0 and bsi_username eq '${username}'&$select=fullname,emailaddress1,bsi_password,bsi_username`
      );

      return contact.value as Contact[];
    },

    //Get the contact record from D365 by matching username or email
    getByUsernameOrEmail: async (username: string, email: string) => {
      const contact = await retrieveMultiple(
        config,
        "contacts",
        `$filter=statecode eq 0 and (bsi_username eq '${username}' or emailaddress1 eq '${email}')&$select=fullname,emailaddress1,bsi_password,bsi_username`
      );

      return contact.value as Contact[];
    },

    //Get contacts by the member type
    getByMemberType: async (membertype: number) => {
      const contacts = await retrieveMultiple(
        config,
        "contacts",
        `$filter=customertypecode eq ${membertype}&$select=fullname,emailaddress1,customertypecode,bsi_organization,jobtitle`,
        { representation: true }
      );

      return contacts.value as Member[];
    },

    //Get contacts by the member type and matching search string
    getBySearchstringMemberTypeTechTheme: async (
      searchstring?: string,
      membertype?: number,
      techtheme?: string
    ) => {
      const filters = [];
      if (searchstring) {
        filters.push(`startswith(fullname,'${searchstring}')`);
      }
      if (membertype) {
        filters.push(`bsi_membertype eq ${membertype}`);
      }
      if (techtheme) {
        filters.push(
          `bsi_bsi_memberassociatedtheme_Member_contact/any(o:o/_bsi_theme_value eq ${techtheme})`
        );
      }

      const contacts: any = await retrieveMultiple(
        config,
        "contacts",
        `${
          filters.length !== 0 ? `$filter=${filters.join(" and ")}&` : ""
        }$top=9&$orderby=firstname asc&$select=bsi_membertype,bsi_linkedinprofile,bsi_twitterprofile,bsi_othersocialmediaprofile,fullname,emailaddress1,telephone1,address1_city,address1_country,jobtitle&$expand=bsi_MemberCompany($select=bsi_name,bsi_organizationsize),bsi_MemberAssociatedSector_Member_Contact($select=bsi_name),bsi_bsi_memberassociatedtheme_Member_contact($select=bsi_name)`,
        { representation: true }
      );

      if (contacts.error) {
        throw new Error("D365 Error");
      }
      return contacts.value as Member[];
    },

    getById: async (id: string) => {
      const member = await retrieve(
        config,
        "contacts",
        id,
        "$select=fullname,emailaddress1,customertypecode,bsi_organization,jobtitle"
      );
      if (member.error) {
        throw new Error("D365 Error");
      }
      return member;
    },

    //Create a new contact based on the registration information
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
