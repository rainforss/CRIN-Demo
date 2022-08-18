import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
} from "@chakra-ui/react";
import * as React from "react";
import { INavigation } from "../@types/generated/contentful";
import Footer from "../components/Footer";
import Header from "../components/Header";
import {
  getWebPageByWebsiteIdAndPageName,
  client,
} from "../services/contentful";

interface INotAuthorizedProps {
  headerNav: INavigation;
  footerNav: INavigation;
}

const NotAuthorized: React.FunctionComponent<INotAuthorizedProps> = ({
  headerNav,
  footerNav,
}) => {
  return (
    <>
      <Header headerNav={headerNav} />
      <Box
        bgImage={`https://images.ctfassets.net/vjn6k5wzhope/7dp51SsKunOa29YbQwjdGb/2e28c43136269cb54083f8e40b2d19d9/header-home.jpg`}
        bgPosition="center"
      >
        <Box as="section" py={32} px={32} bgColor="rgba(255,255,255,0.3)">
          <Box as="h2" fontSize="2.5rem">
            Not Authorized
          </Box>
        </Box>
      </Box>
      <Box h="30vh" py={32} px={32}>
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Your are not logged in.</AlertTitle>
          <AlertDescription>
            You were redirected to this page because you are not logged in as a
            member. Please log in and view the member restricted content.
          </AlertDescription>
        </Alert>
      </Box>
      <Footer footerNav={footerNav} />
    </>
  );
};

export default NotAuthorized;

export const getStaticProps = async () => {
  const { webPage, headerNav, footerNav, siteName } =
    await getWebPageByWebsiteIdAndPageName(
      client,
      "5YqwWdGqUSG7Kpd2eLYgsX",
      "home"
    );
  return {
    props: {
      siteName,
      webPage,
      headerNav,
      footerNav,
    },
  };
};
