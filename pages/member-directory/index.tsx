import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Center,
  Spinner,
} from "@chakra-ui/react";
import * as React from "react";
import { INavigation } from "../../@types/generated/contentful";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import MemberCard from "../../components/MemberCard";
import MemberSearchForm, {
  MemberSearchValue,
} from "../../forms/MemberSearchForm";
import { useMembers } from "../../hooks/useMembers";
import {
  getWebPageByWebsiteIdAndPageName,
  client,
} from "../../services/contentful";
import { withSessionSsr } from "../../utils/authentication/withSession";
import config from "../../crin-config.json";

interface IMemberDirectoryProps {
  headerNav: INavigation;
  footerNav: INavigation;
  siteName: string;
}

const MemberDirectory: React.FunctionComponent<IMemberDirectoryProps> = ({
  headerNav,
  footerNav,
}) => {
  const [searchTerm, setSearchTerm] = React.useState<MemberSearchValue>({
    searchString: "",
    memberType: "",
    techTheme: "",
  });

  const { members, isMemberLoading, isMemberError } = useMembers(searchTerm);

  const search = React.useCallback((searchTerm: MemberSearchValue) => {
    setSearchTerm(() => ({ ...searchTerm }));
  }, []);

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
        flexDir={{ base: "column", md: "row" }}
        alignItems="flex-start"
        px={32}
        py={16}
      >
        <Box w={{ base: "100%", md: "30%" }}>
          <MemberSearchForm
            techThemeOptions={config.themetypes.map((t) => ({
              value: t.value,
              label: t.label,
            }))}
            memberTypeOptions={config.membertypes.map((m) => ({
              value: m.value,
              label: m.label,
            }))}
            search={search}
          />
        </Box>
        <Box
          display="flex"
          justifyContent="flex-end"
          flexWrap="wrap"
          w={{ base: "100%", md: "70%" }}
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
            members.map((m) => <MemberCard member={m} key={m.contactid} />)
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

    const { headerNav, footerNav, siteName } =
      await getWebPageByWebsiteIdAndPageName(
        client,
        "5YqwWdGqUSG7Kpd2eLYgsX",
        "home"
      );
    return {
      props: { headerNav, footerNav, siteName, user },
    };
  }
);
