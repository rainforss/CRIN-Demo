import { Box } from "@chakra-ui/react";
import * as React from "react";
import { IPageSection, IPublications } from "../@types/generated/contentful";
import PublicationCard from "../components/PublicationCard";

interface IPublicationsSectionProps {
  publications?: IPublications[];
  pageSection: IPageSection;
}

const PublicationsSection: React.FunctionComponent<
  IPublicationsSectionProps
> = ({ publications, pageSection }) => {
  if (!publications) {
    return null;
  }
  return (
    <Box
      px={32}
      py={24}
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
      bgColor={pageSection.fields.backgroundColor || "gray.200"}
    >
      <Box as="h2" fontSize="1.75rem" fontWeight="bold">
        {pageSection.fields.mainHeading}
      </Box>
      <Box
        display="flex"
        justifyContent="flex-start"
        flexWrap="wrap"
        w="70%"
        style={{ gap: "4rem" }}
      >
        {publications.map((m) => (
          <PublicationCard publication={m} key={m.sys.id} />
        ))}
      </Box>
    </Box>
  );
};

export default PublicationsSection;
