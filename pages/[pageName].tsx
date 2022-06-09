import type {
  GetStaticPathsContext,
  GetStaticPropsContext,
  NextPage,
} from "next";
import { ParsedUrlQuery } from "querystring";
import { INavigation, IWebPage } from "../@types/generated/contentful";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { sectionConfig } from "../sections/sectionConfig";
import {
  getAllWebPages,
  getWebPageByWebsiteIdAndPageName,
} from "../services/contentful";

interface IPageProps {
  webPage: IWebPage | undefined;
  headerNav: INavigation;
  footerNav: INavigation;
}

interface IParams extends ParsedUrlQuery {
  pageName: string;
}

const Page: NextPage<IPageProps> = (props) => {
  return (
    <>
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
            return <Section key={s.sys.id} pageSection={s} />;
          })}
        </div>
      )}
      <Footer footerNav={props.footerNav} />
    </>
  );
};

export default Page;

export const getStaticPaths = async ({}: GetStaticPathsContext) => {
  const paths: any[] = [];
  const { webPages } = await getAllWebPages();
  webPages.forEach((p) => paths.push({ params: { pageName: p.fields.slug } }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const { pageName } = params as IParams;
  const { webPage, headerNav, footerNav } =
    await getWebPageByWebsiteIdAndPageName("5YqwWdGqUSG7Kpd2eLYgsX", pageName);
  return {
    props: {
      webPage,
      headerNav,
      footerNav,
    },
  };
};
