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
import { useMemberTypes } from "../../hooks/useMemberTypes";
import { useTechThemes } from "../../hooks/useTechThemes";
import { getWebPageByWebsiteIdAndPageName } from "../../services/contentful";
import { withSessionSsr } from "../../utils/authentication/withSession";

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
  const { techThemes, isTechThemeLoading } = useTechThemes();
  const { memberTypes, isMemberTypeLoading } = useMemberTypes();

  // if (isMemberError || isTechThemeError || isMemberTypeError) {
  //   toast({
  //     status: "error",
  //     description:
  //       isMemberError ?? "" + isTechThemeError ?? "" + isMemberTypeError ?? "",
  //     duration: 3000,
  //     isClosable: true,
  //   });
  // }

  const search = React.useCallback((searchTerm: MemberSearchValue) => {
    setSearchTerm(() => ({ ...searchTerm }));
  }, []);

  console.log(isMemberError);

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
          {isMemberTypeLoading || isTechThemeLoading ? (
            <Center w="100%" minH="40vh" flexDir="column">
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
              <Box as="span" mt="2rem">
                Loading Filters......
              </Box>
            </Center>
          ) : (
            <MemberSearchForm
              techThemeOptions={techThemes.map((t) => ({
                value: t.bsi_themeid,
                label: t.bsi_name,
              }))}
              memberTypeOptions={memberTypes.map((m) => ({
                value: m.Value.toString(),
                label: m.Label.UserLocalizedLabel.Label,
              }))}
              search={search}
            />
          )}
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

    // const cca = await instantiateCca();
    // const tokenResponse = await getClientCredentialsToken(cca);
    // const accessToken = tokenResponse?.accessToken;
    // const members = await dynamicsContact(
    //   accessToken!
    // ).getMemberProfilesForIntermediateAccessMember();
    const { headerNav, footerNav, siteName } =
      await getWebPageByWebsiteIdAndPageName("5YqwWdGqUSG7Kpd2eLYgsX", "home");
    return {
      props: { headerNav, footerNav, siteName, user },
    };
  }
);
