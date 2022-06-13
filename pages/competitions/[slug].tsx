import { Box } from "@chakra-ui/react";
import {
  documentToReactComponents,
  Options,
} from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import { GetServerSidePropsContext, GetStaticPathsContext } from "next";
import { NextSeo } from "next-seo";
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
import {
  getPublicationByTypeAndSlug,
  getPublicationsByType,
  getWebPageByWebsiteIdAndPageName,
} from "../../services/contentful";
import { richTextParserOption } from "../../utils/contentful/richTextParser";

interface ICompetitionSlugProps {
  publication: IPublications;
  webPage: IWebPage | undefined;
  headerNav: INavigation;
  footerNav: INavigation;
  siteName: string;
}

interface IParams extends ParsedUrlQuery {
  slug: string;
}

const CompetitionSlug: React.FunctionComponent<ICompetitionSlugProps> = ({
  publication,
  webPage,
  headerNav,
  footerNav,
  siteName,
}) => {
  return (
    <>
      <NextSeo
        title={publication.fields.name}
        description={publication.fields.coverText}
        openGraph={{
          url:
            webPage?.fields.seoAbsoluteUrl +
            "/tech-themes" +
            publication.fields.slug,
          title: publication.fields.name,
          description: publication.fields.coverText,
          site_name: siteName,
        }}
      />
      <Header headerNav={headerNav} />
      <Box
        bgImage={`https://images.ctfassets.net/vjn6k5wzhope/7dp51SsKunOa29YbQwjdGb/2e28c43136269cb54083f8e40b2d19d9/header-home.jpg`}
        bgPosition="center"
      >
        <Box as="section" py={32} px={32} bgColor="rgba(255,255,255,0.3)">
          <Box as="h2" fontSize="2.5rem">
            Competition Quick Links
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
        alignItems="flex-start"
      >
        <Box>
          <Box as="span" fontSize="1.5rem">
            {new Date(publication.fields.eventDate!).toLocaleDateString(
              "en-US",
              { month: "short", year: "numeric", day: "numeric" }
            )}
          </Box>
          <Box as="h2" fontSize="2rem">
            {publication.fields.name}
          </Box>
        </Box>
        <Box ml={32}>
          {documentToReactComponents(
            publication.fields.content!,
            richTextParserOption
          )}
        </Box>
      </Box>
      <Footer footerNav={footerNav} />
    </>
  );
};

export default CompetitionSlug;

export const getStaticPaths = async ({}: GetStaticPathsContext) => {
  const paths: any[] = [];
  const { publications } = await getPublicationsByType("Competitions");
  publications.forEach((p) => paths.push({ params: { slug: p.fields.slug } }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: GetServerSidePropsContext) => {
  const { slug } = params as IParams;
  const { publication } = await getPublicationByTypeAndSlug(
    "Competitions",
    slug
  );
  const { webPage, headerNav, footerNav, siteName } =
    await getWebPageByWebsiteIdAndPageName("5YqwWdGqUSG7Kpd2eLYgsX", "home");
  return {
    props: {
      publication,
      webPage,
      headerNav,
      footerNav,
      siteName,
    },
  };
};
