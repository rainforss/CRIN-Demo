import {
  INavigation,
  IPublications,
  IWebPage,
  IWebsite,
} from "../@types/generated/contentful";

const client = require("contentful").createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

export const getHomePageImageSections = async () => {
  try {
    const homePageEntry = await client.getEntry("sdgsdg");
    return homePageEntry;
  } catch (err) {
    throw err;
  }
};

export const getHeaderAndFooterNavigationOfWebsite = async (
  websiteId: string
) => {
  try {
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
  } catch (err) {
    throw err;
  }
};

export const getPageSectionsOfWebPage = async (webPageName: string) => {
  try {
    const webPage = await client.getEntries({
      content_type: "webPage",
      "fields.pageName": webPageName,
      include: 2,
    });
    const pageSections = webPage.includes.Entry;
    const imageAssets = webPage.includes.Asset;
    return { webPage, pageSections, imageAssets };
  } catch (err) {
    throw err;
  }
};

export const getPublicationByTypeAndSlug = async (
  type: string,
  slug: string
) => {
  try {
    const publication: IPublications = (
      await client.getEntries({
        content_type: "publications",
        "fields.type": type,
        "fields.slug": slug,
        include: 2,
      })
    ).items[0];
    return { publication };
  } catch (err) {
    throw err;
  }
};

export const getPublicationsByType = async (type: string) => {
  try {
    const publications: IPublications = (
      await client.getEntries({
        content_type: "publications",
        "fields.type": type,
        include: 2,
      })
    ).items;
    return { publications };
  } catch (err) {
    throw err;
  }
};

export const getAllWebPages = async () => {
  try {
    const webPages: IWebPage[] = (
      await client.getEntries({
        content_type: "webPage",
        include: 3,
      })
    ).items;
    return {
      webPages,
    };
  } catch (err) {
    throw err;
  }
};

export const getWebPageByWebsiteIdAndPageName = async (
  websiteId: string,
  pageName: string
) => {
  try {
    const website: IWebsite = (
      await client.getEntries({
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
  } catch (err) {
    throw err;
  }
};
