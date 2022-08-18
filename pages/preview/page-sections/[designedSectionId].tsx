import { GetServerSidePropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import * as React from "react";
import {
  IPageSection,
  IPageSectionFields,
} from "../../../@types/generated/contentful";
import {
  DESIGNED_SECTION_NAMES,
  sectionConfig,
} from "../../../sections/sectionConfig";
import * as contentful from "../../../services/contentful";

interface IPageSectionPreviewPageProps {
  pageSection: IPageSection;
  designedSectionId: IPageSectionFields["designedSection"];
}

interface IParams extends ParsedUrlQuery {
  designedSectionId: string;
}

interface IPreviewData {
  pageSectionId: string;
}

const PageSectionPreviewPage: React.FunctionComponent<
  IPageSectionPreviewPageProps
> = ({ pageSection, designedSectionId }) => {
  const Section = sectionConfig[designedSectionId];

  return <Section pageSection={pageSection} />;
};

export default PageSectionPreviewPage;

export const getStaticPaths = () => {
  const paths: any[] = [];
  DESIGNED_SECTION_NAMES.forEach((p) =>
    paths.push({ params: { designedSectionId: p } })
  );
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({
  params,
  preview,
  previewData,
}: GetServerSidePropsContext) => {
  const { designedSectionId } = params as IParams;
  const client = preview ? contentful.previewClient : contentful.client;
  const pageSectionId = (previewData as IPreviewData).pageSectionId;
  const { pageSection } = await contentful.getPageSectionById(
    client,
    pageSectionId
  );
  return {
    props: {
      pageSection,
      designedSectionId,
    },
  };
};
