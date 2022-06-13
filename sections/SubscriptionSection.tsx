import { Box, Input } from "@chakra-ui/react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Link from "next/link";
import * as React from "react";
import { IPageSection } from "../@types/generated/contentful";
import { richTextParserOption } from "../utils/contentful/richTextParser";

interface ISubscriptionSectionProps {
  pageSection: IPageSection;
}

const SubscriptionSection: React.FunctionComponent<
  ISubscriptionSectionProps
> = ({ pageSection }) => {
  return (
    <Box
      bgImage={`https:${pageSection.fields.backgroundImage?.fields.file.url}`}
    >
      <Box
        as="section"
        py={32}
        px={32}
        bgColor="rgba(255,255,255,0.5)"
        display="flex"
        alignItems="stretch"
      >
        <Box w="50%">
          <Box
            as="h1"
            fontSize="3rem"
            w="100%"
            color={pageSection.fields.mainHeadingTextColor}
          >
            {pageSection.fields.mainHeading}
          </Box>
          <Box
            as="h4"
            fontSize="1.5rem"
            color={pageSection.fields.subHeadingTextColor}
            py={4}
          >
            {pageSection.fields.subHeading}
          </Box>
          <Box as="p" fontSize="1.5rem" mb={8}>
            {pageSection.fields.description}
          </Box>
          <Box>
            {documentToReactComponents(
              pageSection.fields.richTextBody!,
              richTextParserOption
            )}
          </Box>
        </Box>
        <Box
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          w="50%"
          style={{ gap: "3rem" }}
        >
          <Input
            placeholder="Enter email here."
            bgColor="white"
            borderColor="black"
            borderRadius="400px"
          />
          <Box display="flex" style={{ gap: "3rem" }}>
            {pageSection.fields.buttons?.map((b) => (
              <Link
                href={b.fields.relativeUrl || b.fields.absoluteUrl || "#"}
                key={b.sys.id}
                passHref
              >
                <Box
                  as="a"
                  px={8}
                  py={2}
                  border={
                    b.fields.variant !== "Underline"
                      ? `1px solid ${b.fields.backgroundColor}`
                      : `none`
                  }
                  textDecor={
                    b.fields.variant === "Underline" ? "underline" : "none"
                  }
                  bgColor={
                    b.fields.variant === "Outline"
                      ? `transparent`
                      : b.fields.variant === "Solid"
                      ? `${b.fields.backgroundColor}`
                      : "transparent"
                  }
                  color={b.fields.textColor}
                  _hover={{
                    color: b.fields.hoverTextColor,
                    bgColor: b.fields.hoverBackgroundColor,
                  }}
                  fontWeight="bold"
                >
                  {b.fields.label}
                </Box>
              </Link>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SubscriptionSection;
