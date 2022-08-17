import { Box, Center, Spinner } from "@chakra-ui/react";
import * as React from "react";
import { INavigation } from "../../@types/generated/contentful";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import MemberProfileEdit from "../../components/MemberProfileEdit";
import { useMember } from "../../hooks/useMember";
import { getWebPageByWebsiteIdAndPageName } from "../../services/contentful";
import { CurrentUser } from "../../types/authentication";
import { withSessionSsr } from "../../utils/authentication/withSession";

interface IMyProfilePageProps {
  headerNav: INavigation;
  footerNav: INavigation;
  siteName: string;
  user: CurrentUser;
}

const MyProfilePage: React.FunctionComponent<IMyProfilePageProps> = ({
  headerNav,
  footerNav,
  user,
}) => {
  const { member, isMemberLoading, isMemberError } = useMember(user.id);

  return (
    <>
      <Header headerNav={headerNav} />
      <Box
        bgImage={`https://images.ctfassets.net/vjn6k5wzhope/7dp51SsKunOa29YbQwjdGb/2e28c43136269cb54083f8e40b2d19d9/header-home.jpg`}
        bgPosition="center"
      >
        <Box as="section" py={32} px={32} bgColor="rgba(255,255,255,0.3)">
          <Box as="h2" fontSize="2.5rem">
            My Profile
          </Box>
        </Box>
      </Box>
      <Box
        display="flex"
        flexDir={{ base: "column", md: "row" }}
        justifyContent="center"
        alignItems="flex-start"
        px={32}
        py={16}
      >
        {isMemberLoading && (
          <Center w="100%" minH="40vh" flexDir="column">
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
            <Box as="span" mt="2rem">
              Loading Your Profile......
            </Box>
          </Center>
        )}
        {!isMemberLoading && !isMemberError && (
          <MemberProfileEdit member={member} />
        )}
      </Box>
      <Footer footerNav={footerNav} />
    </>
  );
};

export default MyProfilePage;

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

    const { headerNav, footerNav, siteName } =
      await getWebPageByWebsiteIdAndPageName("5YqwWdGqUSG7Kpd2eLYgsX", "home");
    return {
      props: { headerNav, footerNav, siteName, user },
    };
  }
);
