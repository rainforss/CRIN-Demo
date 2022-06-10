import { Box } from "@chakra-ui/react";
import * as React from "react";
import { IPageSection } from "../@types/generated/contentful";

interface ISecondaryHeroSectionProps {
  pageSection: IPageSection;
}

const SecondaryHeroSection: React.FunctionComponent<
  ISecondaryHeroSectionProps
> = ({ pageSection }) => {
  return (
    <Box
      bgImage={
        `https:${pageSection.fields.backgroundImage?.fields.file.url}` ||
        `https://images.ctfassets.net/vjn6k5wzhope/7dp51SsKunOa29YbQwjdGb/2e28c43136269cb54083f8e40b2d19d9/header-home.jpg`
      }
      bgPosition="center"
    >
      <Box as="section" py={32} px={32} bgColor="rgba(255,255,255,0.3)">
        <Box
          as="h2"
          fontSize="2.5rem"
          color={pageSection.fields.mainHeadingTextColor}
        >
          {pageSection.fields.mainHeading}
        </Box>
      </Box>
    </Box>
  );
};

export default SecondaryHeroSection;
