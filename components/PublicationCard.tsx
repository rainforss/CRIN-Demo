import { Box, Badge } from "@chakra-ui/react";
import Link from "next/link";
import * as React from "react";
import { IPublications } from "../@types/generated/contentful";

interface IPublicationCardProps {
  publication: IPublications;
}

const PublicationCard: React.FunctionComponent<IPublicationCardProps> = ({
  publication,
}) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      alignItems="flex-start"
      w="45%"
      h="400px"
      border="1px solid #548D9A"
      borderRadius="10px"
      bgColor="white"
      mb={0}
      p={6}
    >
      <Box display="flex" flexDirection="column" alignItems="flex-start">
        <Link
          href={
            publication.fields.slug
              ? `/competitions/${publication.fields.slug}`
              : "#"
          }
          passHref
        >
          <Box as="a" fontSize="1.5rem" fontWeight="bold" color="#548D9A">
            {publication.fields.name}
          </Box>
        </Link>
        <Badge colorScheme="teal" mt={4}>
          {new Date(publication.fields.eventDate!).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </Badge>
      </Box>
      <Box as="p">{publication.fields.coverText} </Box>
      <Link
        href={
          publication.fields.slug
            ? `/competitions/${publication.fields.slug}`
            : "#"
        }
        passHref
      >
        <Box as="a" textDecor="underline">
          Read more
        </Box>
      </Link>
    </Box>
  );
};

export default PublicationCard;
