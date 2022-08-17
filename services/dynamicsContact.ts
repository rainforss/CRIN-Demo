import {
  WebApiConfig,
  retrieveMultiple,
  createWithReturnData,
  retrieve,
  updateWithReturnData,
  ChangeSet,
  batchOperation,
  deleteRecord,
  create,
} from "dataverse-webapi/lib/node";
import { User } from "../types/authentication";
import { Contact, Member } from "../types/dynamics-365/common/types";

export const dynamicsContact = (accessToken: string) => {
  const config = new WebApiConfig("9.1", accessToken, process.env.CLIENT_URL);
  return {
    //Get only 9 member profiles for members with limited access
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
        filters.push(`contains(fullname,'${searchstring}')`);
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
        "$select=bsi_membertype,websiteurl,bsi_linkedinprofile,bsi_twitterprofile,bsi_othersocialmediaprofile,bsi_facebookprofile,bsi_dateregistered,firstname,lastname,fullname,emailaddress1,telephone1,address1_line1,address1_postalcode,address1_stateorprovince,address1_city,address1_country,jobtitle,donotbulkemail&$expand=bsi_MemberCompany($select=bsi_name,bsi_organizationsize,bsi_membercompanyid),bsi_MemberAssociatedSector_Member_Contact($select=bsi_name,bsi_memberassociatedsectorid,_bsi_sector_value),bsi_bsi_memberassociatedtheme_Member_contact($select=bsi_name),bsi_contact_bsi_memberassociatedfocusarea_Member($select=bsi_name,bsi_memberassociatedfocusareaid)",
        { representation: true }
      );
      if (member.error) {
        console.log(member.error);
        throw new Error("D365 Error");
      }
      return member as Member;
    },

    updateUserById: async (id: string, user: any) => {
      const member = await updateWithReturnData(
        config,
        "contacts",
        id,
        user,
        "$select=bsi_membertype,websiteurl,bsi_linkedinprofile,bsi_twitterprofile,bsi_othersocialmediaprofile,bsi_facebookprofile,bsi_dateregistered,firstname,lastname,fullname,emailaddress1,telephone1,address1_line1,address1_postalcode,address1_stateorprovince,address1_city,address1_country,jobtitle,donotbulkemail"
      );
      if (member.error) {
        console.log(member.error);
        throw new Error("D365 Error");
      }
      return member as Member;
    },

    updateUserMemberCompany: async (id: string, company: any) => {
      const updatedCompany = await updateWithReturnData(
        config,
        "bsi_membercompanies",
        id,
        company,
        "$select=bsi_name"
      );
      if (updatedCompany.error) {
        throw new Error("D365 Error");
      }
      return updatedCompany.bsi_name;
    },

    updateUserAssociatedSectors: async (id: string, sectors: any[]) => {
      const existingAssociatedSectors = await retrieveMultiple(
        config,
        "bsi_memberassociatedsectors",
        `$filter=_bsi_member_value eq ${id}&$select=_bsi_sector_value,bsi_memberassociatedsectorid`
      );
      if ((existingAssociatedSectors as any).error) {
        console.log((existingAssociatedSectors as any).error);
        throw new Error("D365 Error");
      }
      const toBeModified: Promise<void>[] = [];

      existingAssociatedSectors.value.forEach((as) => {
        if (sectors.findIndex((s) => s.value === as._bsi_sector_value) === -1) {
          toBeModified.push(
            deleteRecord(
              config,
              "bsi_memberassociatedsectors",
              as.bsi_memberassociatedsectorid as string
            )
          );
        }
      });
      sectors.forEach((s) => {
        if (
          existingAssociatedSectors.value.findIndex(
            (as) => as._bsi_sector_value === s.value
          ) === -1
        ) {
          toBeModified.push(
            create(config, "bsi_memberassociatedsectors", {
              "bsi_Member@odata.bind": `/contacts(${id})`,
              "bsi_Sector@odata.bind": `/bsi_organizationsectors(${s.value})`,
              bsi_name: s.label,
            })
          );
        }
      });

      await Promise.all(toBeModified);
      return;
    },

    createMemberCompany: async (company: any) => {
      const createdCompany = await createWithReturnData(
        config,
        "bsi_membercompanies",
        company,
        "$select=bsi_membercompanyid"
      );
      if (createdCompany.error) {
        throw new Error("D365 Error");
      }
      return createdCompany.bsi_membercompanyid;
    },

    batchUpdate: async (
      contactid: string,
      contact: any,
      companyid: string,
      company: any
    ) => {
      try {
        const changeSets: ChangeSet[] = [
          {
            entity: contact,
            method: "PATCH",
            queryString: `contacts(${contactid})`,
          },
          {
            entity: company,
            method: "PATCH",
            queryString: `bsi_membercompanys(${companyid})`,
          },
        ];
        const result = await batchOperation(
          config,
          "BATCH1",
          "CHANGESET1",
          changeSets,
          []
        );
        console.log(result);
        return;
      } catch (error) {
        console.log(error);
        throw new Error("D365 Error");
      }
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
