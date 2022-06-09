import { Badge, Box } from "@chakra-ui/react";
import Link from "next/link";
import * as React from "react";
import { Member } from "../types/dynamics-365/common/types";

interface IMemberCardProps {
  member: Member;
}

const MemberCard: React.FunctionComponent<IMemberCardProps> = ({ member }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      w="30%"
      h="150px"
      border="1px solid #548D9A"
      borderRadius="10px"
      mb={0}
      p={4}
    >
      <Box display="flex" flexDirection="column" alignItems="flex-start">
        <Link
          href={
            member.emailaddress1
              ? `/member-directory/${member.emailaddress1}`
              : "#"
          }
          passHref
        >
          <Box as="a" fontSize="1.5rem">
            {member.fullname}
          </Box>
        </Link>
        <Badge colorScheme="teal" mt={4}>
          {member["customertypecode@OData.Community.Display.V1.FormattedValue"]}
        </Badge>
      </Box>
      <Box as="span">{member.bsi_organization}</Box>
      <Box as="span">{member.jobtitle}</Box>
    </Box>
  );
};

export default MemberCard;
