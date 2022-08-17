import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import * as React from "react";
import { Member } from "../types/dynamics-365/common/types";
import ProfileAttribute from "./ProfileAttribute";

interface IMemberProfileProps {
  member: Member;
}

const MemberProfile: React.FunctionComponent<IMemberProfileProps> = ({
  member,
}) => {
  console.log(member);
  return (
    <Box w="70%" border="0.5px solid #ccc" borderRadius="10px" padding={6}>
      <Tabs isFitted colorScheme="green">
        <TabList>
          <Tab fontSize="1.3rem">Contact Info</Tab>
          <Tab fontSize="1.3rem">Organization</Tab>
          <Tab fontSize="1.3rem">Tech Themes</Tab>
          <Tab fontSize="1.3rem">Socials</Tab>
        </TabList>
        <TabPanels minH="40vh">
          <TabPanel>
            <Box
              display="flex"
              flexDir={{ base: "column" }}
              style={{ gap: "15px" }}
            >
              <ProfileAttribute
                attributeName="Name"
                attributeValue={member.fullname}
              />
              <ProfileAttribute
                attributeName="Email"
                attributeValue={member.emailaddress1}
              />
              <ProfileAttribute
                attributeName="Phone"
                attributeValue={member.telephone1}
              />
              <ProfileAttribute
                attributeName="Member Type"
                attributeValue={
                  member[
                    "bsi_membertype@OData.Community.Display.V1.FormattedValue"
                  ]
                }
              />
              <ProfileAttribute
                attributeName="Member Since"
                attributeValue={new Date(
                  member.bsi_dateregistered
                ).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "2-digit",
                })}
              />
            </Box>
          </TabPanel>
          <TabPanel>
            <Box
              display="flex"
              flexDir={{ base: "column" }}
              style={{ gap: "15px" }}
            >
              <ProfileAttribute
                attributeName="Name"
                attributeValue={member.bsi_MemberCompany.bsi_name}
              />
              <ProfileAttribute
                attributeName="Position"
                attributeValue={member.jobtitle}
              />
              <ProfileAttribute
                attributeName="City"
                attributeValue={member.address1_city}
              />
              <ProfileAttribute
                attributeName="Country"
                attributeValue={member.address1_country}
              />

              <ProfileAttribute
                attributeName="Organization Type (s)"
                attributeValue={member.bsi_MemberAssociatedSector_Member_Contact.map(
                  (s) => s.bsi_name
                )}
              />
              <ProfileAttribute
                attributeName="Employee Count"
                attributeValue={
                  member.bsi_MemberCompany[
                    "bsi_organizationsize@OData.Community.Display.V1.FormattedValue"
                  ]
                }
              />
            </Box>
          </TabPanel>
          <TabPanel>
            <Box
              display="flex"
              flexDir={{ base: "column" }}
              style={{ gap: "15px" }}
            >
              <ProfileAttribute
                attributeName="Preferred tech themes"
                attributeValue={member.bsi_bsi_memberassociatedtheme_Member_contact.map(
                  (s) => s.bsi_name
                )}
              />
              <ProfileAttribute
                attributeName="Area of focus"
                attributeValue={member.bsi_contact_bsi_memberassociatedfocusarea_Member.map(
                  (s) => s.bsi_name
                )}
              />
            </Box>
          </TabPanel>
          <TabPanel>
            <Box
              display="flex"
              flexDir={{ base: "column" }}
              style={{ gap: "15px" }}
            >
              <ProfileAttribute
                attributeName="LinkedIn"
                attributeValue={member.bsi_linkedinprofile}
              />
              <ProfileAttribute
                attributeName="Twitter"
                attributeValue={member.bsi_twitterprofile}
                isLink
              />
              <ProfileAttribute
                attributeName="Facebook"
                attributeValue={member.bsi_facebookprofile}
                isLink
              />
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default MemberProfile;
