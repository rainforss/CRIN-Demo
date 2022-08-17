import { Box, Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import * as React from "react";
import ContactInfoForm from "../forms/ContactInfoForm";
import OrganizationInfoForm from "../forms/OrganizationInfoForm";
import SocialInfoForm from "../forms/SocialInfoForm";
import { Member } from "../types/dynamics-365/common/types";

interface IMemberProfileEditProps {
  member: Member;
}

const MemberProfileEdit: React.FunctionComponent<IMemberProfileEditProps> = ({
  member,
}) => {
  return (
    <Box w="70%" border="0.5px solid #ccc" borderRadius="10px" padding={6}>
      <Tabs isFitted colorScheme="green">
        <TabList>
          <Tab fontSize="1.3rem">Contact Info</Tab>
          <Tab fontSize="1.3rem">Socials</Tab>
          <Tab fontSize="1.3rem">Organization</Tab>
          <Tab fontSize="1.3rem">Tech Themes</Tab>
        </TabList>
        <TabPanels minH="40vh">
          <TabPanel>
            <Box
              display="flex"
              flexDir={{ base: "column" }}
              style={{ gap: "15px" }}
            >
              <ContactInfoForm member={member} />
            </Box>
          </TabPanel>
          <TabPanel>
            <Box
              display="flex"
              flexDir={{ base: "column" }}
              style={{ gap: "15px" }}
            >
              <SocialInfoForm member={member} />
            </Box>
          </TabPanel>
          <TabPanel>
            <Box
              display="flex"
              flexDir={{ base: "column" }}
              style={{ gap: "15px" }}
            >
              <OrganizationInfoForm member={member} />
            </Box>
          </TabPanel>
          <TabPanel>
            <Box
              display="flex"
              flexDir={{ base: "column" }}
              style={{ gap: "15px" }}
            ></Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default MemberProfileEdit;
