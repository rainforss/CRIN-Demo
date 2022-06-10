import { Box, Button, Input, useToast } from "@chakra-ui/react";
import axios from "axios";
import { Formik, FormikProps, Form } from "formik";
import router from "next/router";
import * as React from "react";
import { IWebPage, INavigation } from "../@types/generated/contentful";
import DateInput from "../components/DateInput";
import Footer from "../components/Footer";
import Header from "../components/Header";
import TextAreaInput from "../components/TextAreaInput";
import TextInput from "../components/TextInput";
import {
  getWebPageByWebsiteIdAndPageName,
  getPublicationsByType,
} from "../services/contentful";
import { submitRegistration } from "../services/user";
import { withSessionSsr } from "../utils/authentication/withSession";
import { requestSchema } from "../utils/formik-forms/validation";

interface IRequestProps {
  webPage: IWebPage | undefined;
  headerNav: INavigation;
  footerNav: INavigation;
  siteName: string;
}

export interface RequestValues {
  title: string;
  requestDescription: string;
  startDate: Date;
  endDate: Date;
  file: File | null;
}

const Request: React.FunctionComponent<IRequestProps> = ({
  headerNav,
  footerNav,
}) => {
  const toast = useToast();
  return (
    <>
      <Header headerNav={headerNav} />
      <Box
        bgImage={`https://images.ctfassets.net/vjn6k5wzhope/7dp51SsKunOa29YbQwjdGb/2e28c43136269cb54083f8e40b2d19d9/header-home.jpg`}
        bgPosition="center"
      >
        <Box as="section" py={32} px={32} bgColor="rgba(255,255,255,0.3)">
          <Box as="h2" fontSize="2.5rem">
            Request Submission
          </Box>
        </Box>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        px={32}
        py={24}
        bgColor="whiteAlpha.800"
      >
        <Formik
          validationSchema={requestSchema}
          initialValues={{
            title: "",
            requestDescription: "",
            startDate: new Date(),
            endDate: new Date(),
            file: null,
          }}
          onSubmit={async (values, actions) => {
            try {
              let formData = new FormData();
              formData.append("test", "ape");
              for (let value in values) {
                formData.append(value, (values as any)[value]);
              }
              const result = await axios.post("/api/request", formData, {
                headers: { "Content-Type": "multipart/form-data" },
              });
              actions.resetForm();
              toast({
                title: "Request submitted.",
                description: `We've received your request ${result.data.bsi_title}. You will receive further emails about processing of your request.`,
                status: "success",
                duration: 3000,
                isClosable: true,
                onCloseComplete: () => router.push("/"),
              });
            } catch (error: any) {
              return toast({
                title: error.response.data.error.name,
                description: error.response.data.error.message,
                status: "error",
                duration: 9000,
                isClosable: true,
              });
            }
          }}
        >
          {(props) => {
            return (
              <Form
                style={{
                  padding: "0",
                  display: "flex",
                  width: "100%",
                  flexWrap: "wrap",
                }}
              >
                <TextInput
                  name="title"
                  id="title"
                  type="text"
                  label="Title"
                  isRequired
                  w="100%"
                  p="1rem"
                />
                <TextAreaInput
                  name="requestDescription"
                  id="requestDescription"
                  label="Description"
                  isRequired
                  w="100%"
                  p="1rem"
                />
                <Input
                  name="file"
                  id="file"
                  type="file"
                  w="100%"
                  mx="1rem"
                  px={0}
                  mt={8}
                  lineHeight="2"
                  onChange={(event) => {
                    if (event.currentTarget.files) {
                      props.setFieldValue("file", event.currentTarget.files[0]);
                    }
                  }}
                />
                <DateInput
                  id="startDate"
                  name="startDate"
                  label="Start Date"
                  w="100%"
                  p="1rem"
                  mt={4}
                />
                <DateInput
                  id="endDate"
                  name="endDate"
                  label="End Date"
                  w="100%"
                  p="1rem"
                  mt={4}
                />
                <Button
                  type="submit"
                  mx="auto"
                  my="4rem"
                  bgColor="#173f5e"
                  color="white"
                  px="2rem"
                  py="1.5rem"
                  isLoading={props.isSubmitting}
                >
                  Submit
                </Button>
              </Form>
            );
          }}
        </Formik>
      </Box>
      <Footer footerNav={footerNav} />
    </>
  );
};

export default Request;

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
      props: { headerNav, footerNav, siteName },
    };
  }
);
