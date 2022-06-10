import { Box } from "@chakra-ui/react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import * as React from "react";
import { IPageSection } from "../@types/generated/contentful";
import { richTextParserOption } from "../utils/contentful/richTextParser";

interface IRichTextSectionProps {
  pageSection: IPageSection;
}

const RichTextSection: React.FunctionComponent<IRichTextSectionProps> = ({
  pageSection,
}) => {
  return (
    <Box
      as="section"
      w="100%"
      px={32}
      py={16}
      my={16}
      mx="auto"
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
    >
      <Box>
        <Box as="h2" fontSize="2rem">
          {pageSection.fields.mainHeading}
        </Box>
      </Box>
      <Box w="60%">
        {pageSection.fields.richTextBody ? (
          documentToReactComponents(
            pageSection.fields.richTextBody,
            richTextParserOption
          )
        ) : (
          <Box as="p">Missing Rich Text Body field on the page section</Box>
        )}
      </Box>
    </Box>
  );
};

export default RichTextSection;
