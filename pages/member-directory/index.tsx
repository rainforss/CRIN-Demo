import { Box } from "@chakra-ui/react";
import * as React from "react";
import { INavigation } from "../../@types/generated/contentful";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import MemberCard from "../../components/MemberCard";
import { getWebPageByWebsiteIdAndPageName } from "../../services/contentful";
import { dynamicsContact } from "../../services/dynamicsContact";
import { Member } from "../../types/dynamics-365/common/types";
import { withSessionSsr } from "../../utils/authentication/withSession";
import { instantiateCca } from "../../utils/msal/cca";
import { getClientCredentialsToken } from "../../utils/msal/getClientCredentialsToken";

interface IMemberDirectoryProps {
  members: Member[];
  headerNav: INavigation;
  footerNav: INavigation;
  siteName: string;
}

const MemberDirectory: React.FunctionComponent<IMemberDirectoryProps> = ({
  members,
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
            Member Directory
          </Box>
        </Box>
      </Box>
      <Box
        display="flex"
        justifyContent="flex-start"
        flexWrap="wrap"
        w="100%"
        style={{ gap: "4rem" }}
        px={32}
        py={16}
      >
        {members.map((m) => (
          <MemberCard member={m} key={m.contactid} />
        ))}
      </Box>
      <Footer footerNav={footerNav} />
    </>
  );
};

export default MemberDirectory;

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;

    if (!user) {
      return {
        redirect: {
          permanent: false,
          destination: "/403",
        },
      };
    }

    const cca = await instantiateCca();
    const tokenResponse = await getClientCredentialsToken(cca);
    const accessToken = tokenResponse?.accessToken;
    const members = await dynamicsContact(
      accessToken!
    ).getBySearchstringMemberType();
    const { headerNav, footerNav, siteName } =
      await getWebPageByWebsiteIdAndPageName("5YqwWdGqUSG7Kpd2eLYgsX", "home");
    return {
      props: { members, headerNav, footerNav, siteName },
    };
  }
);
