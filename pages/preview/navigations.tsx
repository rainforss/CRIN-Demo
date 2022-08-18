import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/react";
import { GetServerSidePropsContext } from "next";
import * as React from "react";
import { INavigation } from "../../@types/generated/contentful";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import * as contentful from "../../services/contentful";

interface INavigationPreviewPageProps {
  navigation: INavigation;
}

// interface IParams extends ParsedUrlQuery {
//   navigationId: string;
// }

interface IPreviewData {
  navigationId: string;
}

const NavigationPreviewPage: React.FunctionComponent<
  INavigationPreviewPageProps
> = ({ navigation }) => {
  return (
    <>
      <Header headerNav={navigation} />
      <Box
        w="100%"
        h="50vh"
        display="flex"
        flexDir="column"
        justifyContent="space-between"
        alignItems="center"
        border="1px dashed #ccc"
        p={4}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          as="strong"
        >
          <ChevronUpIcon fontSize="2rem" />
          <Box ml="2rem">Used as Header Navigation of Website</Box>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          as="strong"
        >
          <ChevronDownIcon fontSize="2rem" />
          <Box ml="2rem">Used as Footer Navigation of Website</Box>
        </Box>
      </Box>
      <Footer footerNav={navigation} />
    </>
  );
};

export default NavigationPreviewPage;

export const getServerSideProps = async ({
  preview,
  previewData,
}: GetServerSidePropsContext) => {
  const client = preview ? contentful.previewClient : contentful.client;
  const navigationId = (previewData as IPreviewData).navigationId;
  const { navigation } = await contentful.getNavigationById(
    client,
    navigationId
  );
  return {
    props: {
      navigation,
    },
  };
};
