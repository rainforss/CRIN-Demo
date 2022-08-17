import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Center,
  Spinner,
} from "@chakra-ui/react";
import { ParsedUrlQuery } from "querystring";
import * as React from "react";
import { INavigation } from "../../@types/generated/contentful";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import MemberProfile from "../../components/MemberProfile";
import { useMember } from "../../hooks/useMember";
import { getWebPageByWebsiteIdAndPageName } from "../../services/contentful";
import { withSessionSsr } from "../../utils/authentication/withSession";

interface IIndividualMemberPageProps {
  headerNav: INavigation;
  footerNav: INavigation;
  siteName: string;
  id: string;
}

interface CustomUrlQuery extends ParsedUrlQuery {
  id: string;
}

const IndividualMemberPage: React.FunctionComponent<
  IIndividualMemberPageProps
> = ({ headerNav, footerNav, id }) => {
  const { member, isMemberLoading, isMemberError } = useMember(id);

  console.log(member);

  return (
    <>
      <Header headerNav={headerNav} />
      <Box
        bgImage={`https://images.ctfassets.net/vjn6k5wzhope/7dp51SsKunOa29YbQwjdGb/2e28c43136269cb54083f8e40b2d19d9/header-home.jpg`}
        bgPosition="center"
      >
        <Box as="section" py={32} px={32} bgColor="rgba(255,255,255,0.3)">
          <Box as="h2" fontSize="2.5rem">
            CRIN Member Profile
          </Box>
        </Box>
      </Box>
      <Box
        display="flex"
        flexDir={{ base: "column" }}
        alignItems="flex-start"
        px={32}
        py={16}
      >
        <Box
          display="flex"
          justifyContent="center"
          flexWrap="wrap"
          w={{ base: "100%", md: "100%" }}
          style={{ gap: "1rem" }}
        >
          {isMemberLoading ? (
            <Center w="100%" minH="40vh" flexDir="column">
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
              <Box as="span" mt="2rem">
                Loading Members......
              </Box>
            </Center>
          ) : !isMemberError ? (
            <MemberProfile member={member} />
          ) : (
            <Center w="100%" minH="40vh" flexDir="column" px="3rem">
              <Alert status="error">
                <AlertIcon />
                <AlertTitle>Error Loading Memebers</AlertTitle>
                <AlertDescription>
                  {isMemberError.response.data.error.message}
                </AlertDescription>
              </Alert>
            </Center>
          )}
        </Box>
      </Box>
      <Footer footerNav={footerNav} />
    </>
  );
};

export default IndividualMemberPage;

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req, params }) {
    const user = req.session.user;
    const { id } = params as CustomUrlQuery;
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
      props: { headerNav, footerNav, siteName, user, id },
    };
  }
);
