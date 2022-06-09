import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import {
  INavigation,
  IPublications,
  IWebPage,
} from "../@types/generated/contentful";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { sectionConfig } from "../sections/sectionConfig";
import {
  getPublicationsByType,
  getWebPageByWebsiteIdAndPageName,
} from "../services/contentful";

interface IHomeProps {
  webPage: IWebPage | undefined;
  headerNav: INavigation;
  footerNav: INavigation;
  siteName: string;
  publications: IPublications[];
}

const Home: NextPage<IHomeProps> = (props) => {
  return (
    <>
      <NextSeo
        title={props.webPage?.fields.seoTitle}
        description={props.webPage?.fields.seoDescription}
        openGraph={{
          url: props.webPage?.fields.seoAbsoluteUrl,
          title: props.webPage?.fields.seoTitle,
          description: props.webPage?.fields.seoDescription,
          site_name: props.siteName,
          images: props.webPage?.fields.seoPageSnapshot.map((s) => ({
            url: s.fields.file.url,
            width: s.fields.file.details.image?.width,
            height: s.fields.file.details.image?.height,
            alt: s.fields.title,
            type: s.fields.file.contentType,
          })),
        }}
      />
      <Header headerNav={props.headerNav} />
      {!!props.webPage && (
        <div>
          {props.webPage.fields.pageSections!.map((s) => {
            // sectionConfig[s["bsi_DesignedSection"].bsi_name] &&
            //   sectionConfig[s["bsi_DesignedSection"].bsi_name]({
            //     dynamicsPageSection: s,
            //     dynamicsBlogs: props.dynamicsBlogs,
            //     key: s.bsi_pagesectionid,
            //   });
            const Section = sectionConfig[s.fields.designedSection];
            return (
              <Section
                key={s.sys.id}
                pageSection={s}
                publications={props.publications}
              />
            );
          })}
        </div>
      )}
      <Footer footerNav={props.footerNav} />
    </>
  );
};

export default Home;

export const getStaticProps = async () => {
  const { webPage, headerNav, footerNav, siteName } =
    await getWebPageByWebsiteIdAndPageName("5YqwWdGqUSG7Kpd2eLYgsX", "home");
  const { publications } = await getPublicationsByType("Competitions");
  return {
    props: {
      siteName,
      webPage,
      headerNav,
      footerNav,
      publications,
    },
  };
};
