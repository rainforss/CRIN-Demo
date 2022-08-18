import {
  INavigation,
  INavigationFields,
  IPageSectionFields,
  IPublicationsFields,
  IWebPage,
  IWebPageFields,
  IWebsiteFields,
} from "../@types/generated/contentful";

import * as contentful from "contentful";
import { Entry } from "contentful";

export const client = contentful.createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN!,
});

export const previewClient = contentful.createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_PREVIEW_API_ACCESS_TOKEN!,
  host: "preview.contentful.com",
});

export const getAllPageSections = async (
  client: contentful.ContentfulClientApi
) => {
  const pageSections = await client.getEntries<IPageSectionFields>({
    content_type: "pageSection",
  });
  return { pageSections };
};

export const getPageSectionById = async (
  client: contentful.ContentfulClientApi,
  pageSectionId: string
) => {
  const pageSection = await client.getEntry<IPageSectionFields>(pageSectionId);
  return { pageSection };
};

export const getNavigationById = async (
  client: contentful.ContentfulClientApi,
  navigationId: string
) => {
  const navigation = await client.getEntry<INavigationFields>(navigationId, {
    include: 3,
  });
  return { navigation };
};

export const getHomePageImageSections = async () => {
  const homePageEntry = await client.getEntry("sdgsdg");
  return homePageEntry;
};

export const getHeaderAndFooterNavigationOfWebsite = async (
  client: contentful.ContentfulClientApi,
  websiteId: string
) => {
  const headerNav = await client.getEntries({
    content_type: "navigation",
    "fields.navigationType": "Header",
    "fields.website.sys.id": websiteId,
    include: 2,
  });
  const headerLogo = headerNav.includes.Asset[0];
  const footerNav = await client.getEntries({
    content_type: "navigation",
    "fields.navigationType": "Footer",
    "fields.website.sys.id": websiteId,
    include: 2,
  });
  const footerLogo = footerNav.includes.Asset[0];
  return { headerNav, footerNav, headerLogo, footerLogo };
};

export const getPageSectionsOfWebPage = async (
  client: contentful.ContentfulClientApi,
  webPageName: string
) => {
  const webPage = await client.getEntries<IWebPageFields>({
    content_type: "webPage",
    "fields.pageName": webPageName,
    include: 2,
  });
  const pageSections = webPage.includes.Entry;
  const imageAssets = webPage.includes.Asset;
  return { webPage, pageSections, imageAssets };
};

export const getPublicationByTypeAndSlug = async (
  client: contentful.ContentfulClientApi,
  type: string,
  slug: string
) => {
  const publication: Entry<IPublicationsFields> = (
    await client.getEntries<IPublicationsFields>({
      content_type: "publications",
      "fields.type": type,
      "fields.slug": slug,
      include: 2,
    })
  ).items[0];
  return { publication };
};

export const getPublicationsByType = async (
  client: contentful.ContentfulClientApi,
  type: string
) => {
  const publications: Entry<IPublicationsFields>[] = (
    await client.getEntries<IPublicationsFields>({
      content_type: "publications",
      "fields.type": type,
      include: 2,
    })
  ).items;
  return { publications };
};

export const getAllStaticWebPages = async (
  client: contentful.ContentfulClientApi
) => {
  const webPages: Entry<IWebPageFields>[] = (
    await client.getEntries<IWebPageFields>({
      content_type: "webPage",
      "fields.pageType": "Static Page",
      include: 3,
    })
  ).items;
  return {
    webPages,
  };
};

export const getWebPageByWebsiteIdAndPageName = async (
  client: contentful.ContentfulClientApi,
  websiteId: string,
  pageName: string
) => {
  const website = (
    await client.getEntries<IWebsiteFields>({
      content_type: "website",
      "sys.id": websiteId,
      include: 3,
    })
  ).items[0];

  const webPage: IWebPage | undefined = pageName
    ? website!.fields!.webPages!.find((wp: any) =>
        wp.fields.slug.includes(pageName)
      )
    : undefined;
  const headerNav: INavigation = website.fields.headerNavigation!;
  const footerNav: INavigation = website.fields.footerNavigation!;
  return {
    siteName: website.fields.name,
    webPage,
    headerNav,
    footerNav,
  };
};
