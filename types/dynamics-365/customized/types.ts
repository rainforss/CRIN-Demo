export type DynamicsMatch = {
  msmedia_name: string;
  msmedia_mediaeventid: string;
  msmedia_hometeamscore: number;
  msmedia_visitingteamscore: number;
  bsi_starttime: Date;
  msmedia_eventtimezone: any;
  msmedia_HomeTeam: {
    msmedia_name: string;
    msmedia_sportsteamid: string;
  };
  msmedia_VisitingTeam: {
    msmedia_name: string;
    msmedia_sportsteamid: string;
  };
  msmedia_PrimaryVenue: {
    msmedia_name: string;
    msmedia_addressline1: string;
  };
};

export type DynamicsVenue = {
  msmedia_name: string;
  msmedia_addressline1: string;
  msmedia_latitude: string;
  msmedia_longitude: string;
  msmedia_addresscity: string;
  msmedia_addressstateorprovince: string;
  msmedia_addresspostalcode: string;
  msmedia_addresscountry: string;
  msmedia_mediavenueid: string;
};

export type DynamicsOrganizationContact = {
  fullname: string;
  emailaddress1: string;
  jobtitle: string;
  contactid: string;
  bsi_ProfilePicture: {
    bsi_alttext: string;
    bsi_cdnurl: string;
  };
};

export type DynamicsSportsTeam = {
  msmedia_name: string;
  bsi_teaminfo: string;
  bsi_description: string;
  msmedia_sportsteamid: string;
  bsi_TeamImage: {
    bsi_alttext: string;
    bsi_cdnurl: string;
  };
  msmedia_Division: {
    msmedia_divisionid: string;
    msmedia_name: string;
  };
  msmedia_MediaEvent_HomeTeam_msmedia_Sport: Array<{
    msmedia_name: string;
    msmedia_mediaeventid: string;
  }>;
  msmedia_MediaEvent_VisitingTeam_msmedia_S: Array<{
    msmedia_name: string;
    msmedia_mediaeventid: string;
  }>;
  bsi_matches: DynamicsMatch[];
  bsi_contacts: Array<{
    msmedia_name: string;
    bsi_Contact: {
      fullname: string;
      emailaddress1: string;
      contactid: string;
    };
    bsi_ProfilePicture: {
      bsi_alttext: string;
      bsi_cdnurl: string;
    };
    msmedia_sportsplayerid: string;
    "bsi_teamrole@OData.Community.Display.V1.FormattedValue": string;
  }>;
};
