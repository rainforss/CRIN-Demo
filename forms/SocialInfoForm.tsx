import { useToast, Button } from "@chakra-ui/react";
import axios from "axios";
import { Formik, FormikProps, Form } from "formik";
import * as React from "react";
import TextInput from "../components/TextInput";
import { Member } from "../types/dynamics-365/common/types";

interface ISocialInfoFormProps {
  member: Member;
}

export class SocialInfoValue {
  websiteurl: string = "";
  bsi_linkedinprofile: string = "";
  bsi_twitterprofile: string = "";
  bsi_facebookprofile: string = "";
  bsi_othersocialmediaprofile: string = "";
}

const SocialInfoForm: React.FunctionComponent<ISocialInfoFormProps> = ({
  member,
}) => {
  const submit = async (values: SocialInfoValue) => {
    const result = await axios.put(`/api/members/${member.contactid}`, values);
    console.log(result.data);
  };
  const toast = useToast();
  console.log(member);
  return (
    <Formik
      initialValues={{
        websiteurl: member.websiteurl,
        bsi_linkedinprofile: member.bsi_linkedinprofile,
        bsi_twitterprofile: member.bsi_twitterprofile,
        bsi_facebookprofile: member.bsi_facebookprofile,
        bsi_othersocialmediaprofile: member.bsi_othersocialmediaprofile,
      }}
      onSubmit={async (values, actions) => {
        actions.setSubmitting(true);
        toast({
          status: "warning",
          title: "Update in progress",
          description:
            "Your contact information is being updated, please wait...",
          isClosable: true,
          duration: 3000,
        });
        await submit(values);
        actions.setSubmitting(false);
        toast({
          status: "success",
          title: "Update success",
          description: "Your contact information has been updated.",
          isClosable: true,
          duration: 3000,
        });
      }}
    >
      {(props: FormikProps<SocialInfoValue>) => {
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
              id="websiteurl"
              name="websiteurl"
              label="Website URL"
              type="url"
              my="1rem"
            />
            <TextInput
              id="bsi_linkedinprofile"
              name="bsi_linkedinprofile"
              label="LinkedIn Profile"
              type="url"
              my="1rem"
            />
            <TextInput
              id="bsi_twitterprofile"
              name="bsi_twitterprofile"
              label="Twitter Profile"
              type="text"
              my="1rem"
            />
            <TextInput
              id="bsi_facebookprofile"
              name="bsi_facebookprofile"
              label="Facebook Profile"
              type="url"
              my="1rem"
            />
            <TextInput
              id="bsi_othersocialmediaprofile"
              name="bsi_othersocialmediaprofile"
              label="Other Social Media"
              type="url"
              my="1rem"
            />
            <Button
              type="submit"
              mr="auto"
              my="2rem"
              bgColor="#173f5e"
              color="white"
              px="2rem"
              py="1.5rem"
              isLoading={props.isSubmitting}
              disabled={props.isSubmitting}
            >
              Update
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default React.memo(SocialInfoForm);
