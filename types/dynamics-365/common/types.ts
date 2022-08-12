import { Entity } from "dataverse-webapi/lib/node";
import {
  DynamicsVenue,
  DynamicsOrganizationContact,
  DynamicsMatch,
  DynamicsSportsTeam,
} from "../customized/types";

export interface DesignedSection {
  dynamicsPageSection: DynamicsPageSection;
}

export interface Contact extends Entity {
  contactid: string;
  fullname: string;
  emailaddress1: string;
  bsi_username: string;
  bsi_password: string;
}

export interface Member extends Entity {
  contactid: string;
  fullname: string;
  emailaddress1: string;
  customertypecode: number;
  "customertypecode@OData.Community.Display.V1.FormattedValue": string;
  bsi_organization: string;
  jobtitle: string;
  bsi_membertype: number;
  "bsi_membertype@OData.Community.Display.V1.FormattedValue": string;
  bsi_MemberCompany: {
    bsi_name: string;
    bsi_membercompanyid: string;
  };
  address1_city: string;
  address1_country: string;
  bsi_dateregistered: Date;
  telephone1: string;
  bsi_MemberAssociatedSector_Member_Contact: Array<{
    bsi_name: string;
    "bsi_organizationsize@OData.Community.Display.V1.FormattedValue": string;
  }>;
  bsi_bsi_memberassociatedtheme_Member_contact: Array<{ bsi_name: string }>;
}

export type DynamicsMemberType = {
  Value: number;
  Label: {
    UserLocalizedLabel: {
      Label: string;
    };
  };
};

export type DynamicsTheme = {
  bsi_name: string;
  bsi_themeid: string;
};

export type DynamicsBlog = {
  bsi_name: string;
  bsi_BlogCoverImage: {
    bsi_name: string;
    bsi_cdnurl: string;
    bsi_alttext: string;
  };
  bsi_blogcovertext: string;
  bsi_blogid: string;
  bsi_slug: string;
  bsi_Blog_bsi_BlogAuthor_bsi_BlogAuthor: Array<{
    bsi_name: string;
    bsi_slug: string;
  }>;
  bsi_BlogCategory_bsi_Blog_bsi_Blog: Array<{
    bsi_name: string;
    bsi_slug: string;
  }>;
  bsi_blogbody: string;
  modifiedon: string;
};

export interface DynamicsPageProps {
  error?: any;
  dynamicsPageName: string;
  dynamicsVenues: DynamicsVenue[];
  dynamicsOrganizationContacts: DynamicsOrganizationContact[];
  dynamicsPageSections: DynamicsPageSection[];
  dynamicsMatches: DynamicsMatch[];
  dynamicsSportsTeams: DynamicsSportsTeam[];
  dynamicsHeaderMenuItems: any[];
  dynamicsFooterMenuItems: any[];
  dynamicsBlogs: DynamicsBlog[];
  dynamicsSocialPlatforms: any[];
  companyLogoUrl: string;
  preview: boolean;
}

export type DynamicsPageSection = {
  bsi_name: string;
  bsi_restricted: boolean;
  bsi_pagesectionid: string;
  bsi_videourl: string;
  bsi_paragraph: string;
  bsi_hasctabutton: boolean;
  bsi_ctabuttonlink: string;
  bsi_ctabuttontext: string;
  bsi_youtubevideoid: string;
  bsi_youtubevideoalttext: string;
  _bsi_designedsection_value: string;
  bsi_overline: string;
  bsi_mainheading: string;
  bsi_subheading: string;
  bsi_sectionid: string;
  bsi_featuredproducts: string;
  bsi_backgroundcolor: string;
  bsi_bordercolor: string;
  bsi_overlinetextcolor: string;
  bsi_mainheadingtextcolor: string;
  bsi_subheadingtextcolor: string;
  bsi_paragraphtextcolor: string;
  bsi_ctabuttontextcolor: string;
  bsi_ctabuttonhoverbgcolor: string;
  bsi_ctabuttonbgcolor: string;
  bsi_AttachedComponent_bsi_PageSection_bsi: Array<{
    bsi_attachedcomponentid: string;
    bsi_name: string;
    bsi_description: string;
    bsi_descriptiontextcolor: string;
    bsi_hasctabutton: boolean;
    bsi_ctabuttontext: string;
    bsi_ctabuttonlink: string;
    bsi_ctabuttonbgcolor: string;
    bsi_ctabuttonhoverbgcolor: string;
    bsi_ctabuttontextcolor: string;
    bsi_backgroundcolor: string;
    bsi_bordercolor: string;
    bsi_overline: string;
    bsi_overlinetextcolor: string;
    bsi_title: string;
    bsi_titletextcolor: string;
    bsi_subtitle: string;
    bsi_subtitletextcolor: string;
    bsi_AttachedComponent_bsi_ImageAsset_bsi_: Array<{
      bsi_cdnurl: string;
      bsi_name: string;
    }>;
  }>;
  bsi_PageSection_bsi_ImageAsset_bsi_ImageA: Array<{
    bsi_imageassetid: string;
    bsi_name: string;
    bsi_cdnurl: string;
    bsi_alttext: string;
    bsi_referencingurl: string;
  }>;

  bsi_DesignedSection: {
    bsi_name: string;
  };
  bsi_Background: {
    bsi_cdnurl: string;
  };
  bsi_MarketingFormPage: {
    msdyncrm_javascriptcode: string;
  };

  bsi_FileAsset_bsi_PageSection_bsi_PageSec: Array<{
    bsi_name: string;
    bsi_fileassetid: string;
    bsi_cdnurl: string;
    bsi_description: string;
    bsi_file_name: string;
    bsi_restricted: boolean;
  }>;
};
