import { ExternalLinkIcon, LockIcon, UnlockIcon } from "@chakra-ui/icons";
import { Badge, Box, StackDivider, VStack } from "@chakra-ui/react";
import {
  documentToReactComponents,
  Options,
} from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import { GetServerSidePropsContext } from "next";
import Image from "next/image";
import { ParsedUrlQuery } from "querystring";
import * as React from "react";
import {
  INavigation,
  IPublications,
  IWebPage,
} from "../../@types/generated/contentful";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import {
  getPublicationByTypeAndSlug,
  getWebPageByWebsiteIdAndPageName,
} from "../../services/contentful";
import { richTextParserOption } from "../../utils/contentful/richTextParser";

interface ITechThemeSlugProps {
  publication: IPublications;
  webPage: IWebPage | undefined;
  headerNav: INavigation;
  footerNav: INavigation;
}

interface IParams extends ParsedUrlQuery {
  slug: string;
}

const TechThemeSlug: React.FunctionComponent<ITechThemeSlugProps> = ({
  publication,
  webPage,
  headerNav,
  footerNav,
}) => {
  const { user, isLoading, isError } = useCurrentUser();

  return (
    <>
      <Header headerNav={headerNav} />
      <Box
        bgImage={`https://images.ctfassets.net/vjn6k5wzhope/7dp51SsKunOa29YbQwjdGb/2e28c43136269cb54083f8e40b2d19d9/header-home.jpg`}
        bgPosition="center"
      >
        <Box as="section" py={32} px={32} bgColor="rgba(255,255,255,0.3)">
          <Box as="h2" fontSize="2.5rem">
            {publication.fields.name}
          </Box>
        </Box>
      </Box>
      <Box
        as="article"
        w="100%"
        px={32}
        my={16}
        mx="auto"
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Box>
          <Box as="h2" fontSize="2rem">
            Objective
          </Box>
        </Box>
        <Box w="60%">
          {documentToReactComponents(
            publication.fields.content!,
            richTextParserOption
          )}
        </Box>
      </Box>
      {publication.fields.crinDocuments && (
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
              CRIN Documents
            </Box>
          </Box>
          <Box w="60%">
            <VStack
              divider={<StackDivider borderColor="gray.200" />}
              spacing={4}
              align="stretch"
            >
              {publication.fields.crinDocuments.map((cd) => (
                <Box
                  key={cd.sys.id}
                  fontSize="1.2rem"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  {cd.fields.restricted && !user ? (
                    <Box
                      as="a"
                      display="flex"
                      alignItems="center"
                      style={{ gap: "1rem" }}
                    >
                      {cd.fields.name}{" "}
                      {cd.fields.restricted && !user ? (
                        <LockIcon fontSize="1rem" color="red" />
                      ) : (
                        <UnlockIcon fontSize="1rem" color="green" />
                      )}
                    </Box>
                  ) : (
                    <Box
                      as="a"
                      target="_blank"
                      display="flex"
                      alignItems="center"
                      style={{ gap: "1rem" }}
                      href={
                        cd.fields.file?.fields.file.url
                          ? `https:${cd.fields.file?.fields.file.url}`
                          : cd.fields.externalResourceUrl || "#"
                      }
                    >
                      {cd.fields.name}{" "}
                      {cd.fields.restricted && !user ? (
                        <LockIcon fontSize="1rem" color="red" />
                      ) : (
                        <UnlockIcon fontSize="1rem" color="green" />
                      )}
                    </Box>
                  )}
                  {cd.fields.restricted ? (
                    <Badge colorScheme="orange">Member Only</Badge>
                  ) : null}
                </Box>
              ))}
            </VStack>
          </Box>
        </Box>
      )}
      {publication.fields.crinPartnerMaterial && (
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
              CRIN Partner Material
            </Box>
          </Box>
          <Box w="60%">
            <VStack
              divider={<StackDivider borderColor="gray.200" />}
              spacing={4}
              align="stretch"
            >
              {publication.fields.crinPartnerMaterial.map((cd) => (
                <Box
                  key={cd.sys.id}
                  fontSize="1.2rem"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  {cd.fields.restricted && !user ? (
                    <Box
                      as="a"
                      display="flex"
                      alignItems="center"
                      style={{ gap: "1rem" }}
                    >
                      {cd.fields.name}{" "}
                      {cd.fields.restricted && !user ? (
                        <LockIcon fontSize="1rem" color="red" />
                      ) : (
                        <UnlockIcon fontSize="1rem" color="green" />
                      )}
                    </Box>
                  ) : (
                    <Box
                      as="a"
                      target="_blank"
                      display="flex"
                      alignItems="center"
                      style={{ gap: "1rem" }}
                      href={
                        cd.fields.file?.fields.file.url
                          ? `https:${cd.fields.file?.fields.file.url}`
                          : cd.fields.externalResourceUrl || "#"
                      }
                    >
                      {cd.fields.name}{" "}
                      {cd.fields.restricted && !user ? (
                        <LockIcon fontSize="1rem" color="red" />
                      ) : (
                        <UnlockIcon fontSize="1rem" color="green" />
                      )}
                    </Box>
                  )}
                  {cd.fields.restricted ? (
                    <Badge colorScheme="orange">Member Only</Badge>
                  ) : null}
                </Box>
              ))}
            </VStack>
          </Box>
        </Box>
      )}
      {publication.fields.crinWebinarsAndPresentations && (
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
              CRIN Webinars and Presentations
            </Box>
          </Box>
          <Box w="60%">
            <VStack
              divider={<StackDivider borderColor="gray.200" />}
              spacing={4}
              align="stretch"
            >
              {publication.fields.crinWebinarsAndPresentations.map((cd) => (
                <Box
                  key={cd.sys.id}
                  fontSize="1.2rem"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  {cd.fields.restricted && !user ? (
                    <Box
                      as="a"
                      display="flex"
                      alignItems="center"
                      style={{ gap: "1rem" }}
                    >
                      {cd.fields.name}{" "}
                      {cd.fields.restricted && !user ? (
                        <LockIcon fontSize="1rem" color="red" />
                      ) : (
                        <UnlockIcon fontSize="1rem" color="green" />
                      )}
                    </Box>
                  ) : (
                    <Box
                      as="a"
                      target="_blank"
                      display="flex"
                      alignItems="center"
                      style={{ gap: "1rem" }}
                      href={
                        cd.fields.file?.fields.file.url
                          ? `https:${cd.fields.file?.fields.file.url}`
                          : cd.fields.externalResourceUrl || "#"
                      }
                    >
                      {cd.fields.name}{" "}
                      {cd.fields.restricted && !user ? (
                        <LockIcon fontSize="1rem" color="red" />
                      ) : (
                        <UnlockIcon fontSize="1rem" color="green" />
                      )}
                    </Box>
                  )}
                  {cd.fields.restricted ? (
                    <Badge colorScheme="orange">Member Only</Badge>
                  ) : null}
                </Box>
              ))}
            </VStack>
          </Box>
        </Box>
      )}
      {publication.fields.personnel && (
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
              Tech Leaders
            </Box>
          </Box>
          <Box w="60%">
            <VStack
              divider={<StackDivider borderColor="gray.200" />}
              spacing={4}
              align="stretch"
            >
              {publication.fields.personnel &&
                publication.fields.personnel.map((p) => (
                  <Box
                    key={p.sys.id}
                    fontSize="1.2rem"
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Box
                      as="a"
                      target="_blank"
                      href={p.fields.personalLink || "#"}
                    >
                      {p.fields.fullName}
                    </Box>
                    <Box as="a" href={`mailto:${p.fields.email}`}>
                      {p.fields.email}
                    </Box>
                  </Box>
                ))}
            </VStack>
          </Box>
        </Box>
      )}
      <Footer footerNav={footerNav} />
    </>
  );
};

export default TechThemeSlug;

export const getServerSideProps = async ({
  params,
}: GetServerSidePropsContext) => {
  const { slug } = params as IParams;
  const { publication } = await getPublicationByTypeAndSlug(
    "Tech Themes",
    slug
  );
  const { webPage, headerNav, footerNav } =
    await getWebPageByWebsiteIdAndPageName("5YqwWdGqUSG7Kpd2eLYgsX", "home");
  return {
    props: {
      publication,
      webPage,
      headerNav,
      footerNav,
    },
  };
};
