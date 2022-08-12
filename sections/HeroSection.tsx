import { Box } from "@chakra-ui/react";
import Link from "next/link";
import * as React from "react";
import { IPageSection } from "../@types/generated/contentful";

interface IHeroSectionProps {
  pageSection: IPageSection;
}

const HeroSection: React.FunctionComponent<IHeroSectionProps> = ({
  pageSection,
}) => {
  return (
    <Box
      bgImage={`https:${pageSection.fields.backgroundImage?.fields.file.url}`}
    >
      <Box as="section" py={32} px={32} bgColor="rgba(255,255,255,0.5)">
        <Box
          as="h1"
          fontSize="3rem"
          w="50%"
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
  );
};

export default HeroSection;
