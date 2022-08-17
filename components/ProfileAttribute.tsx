import { Box } from "@chakra-ui/react";
import Link from "next/link";
import * as React from "react";

interface IProfileAttributeProps {
  attributeName: string;
  attributeValue: string | string[];
  isLink?: boolean;
}

const ProfileAttribute: React.FunctionComponent<IProfileAttributeProps> = ({
  attributeName,
  attributeValue,
  isLink,
}) => {
  return (
    <Box>
      <Box fontSize="sm">{attributeName}</Box>
      {isLink && attributeValue ? (
        <Link href={`https://twitter.com/${attributeValue}`} passHref>
          <Box fontWeight="bold" fontSize="xl" as="a" textDecor="underline">
            {attributeValue}
          </Box>
        </Link>
      ) : (
        <Box fontWeight="bold" fontSize="xl">
          {!attributeValue
            ? "N/A"
            : typeof attributeValue === "string"
            ? attributeValue
            : typeof attributeValue === "object"
            ? attributeValue.map((v) => <Box key="v">- {v}</Box>)
            : "N/A"}
        </Box>
      )}
    </Box>
  );
};

export default ProfileAttribute;
