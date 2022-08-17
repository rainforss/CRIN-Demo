import { Button, useToast } from "@chakra-ui/react";
import { Formik, FormikProps, Form } from "formik";
import * as React from "react";
import RadioInput from "../components/RadioInput";
import TextInput from "../components/TextInput";
import { Member } from "../types/dynamics-365/common/types";
import configs from "../crin-config.json";
import axios from "axios";
import CheckboxInput from "../components/CheckboxInput";

interface IContactInfoFormProps {
  member: Member;
}

export class ContactInfoValue {
  firstname: string = "";
  lastname: string = "";
  emailaddress1: string = "";
  telephone1: string = "";
  bsi_membertype: string = "";
  donotbulkemail: boolean = false;
}

const ContactInfoForm: React.FunctionComponent<IContactInfoFormProps> = ({
  member,
}) => {
  const submit = async (values: ContactInfoValue) => {
    const result = await axios.put(`/api/members/${member.contactid}`, {
      ...values,
      bsi_membertype: parseInt(values.bsi_membertype),
    });
    console.log(result.data);
  };
  const toast = useToast();
  console.log(member);
  return (
    <Formik
      initialValues={{
        firstname: member.firstname,
        lastname: member.lastname,
        emailaddress1: member.emailaddress1,
        telephone1: member.telephone1,
        bsi_membertype: member.bsi_membertype.toString(),
        donotbulkemail: member.donotbulkemail,
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
      {(props: FormikProps<ContactInfoValue>) => {
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
              id="firstname"
              name="firstname"
              label="First Name"
              type="text"
              my="1rem"
              isRequired
            />
            <TextInput
              id="lastname"
              name="lastname"
              label="Last Name"
              type="text"
              my="1rem"
              isRequired
            />
            <TextInput
              id="emailaddress1"
              name="emailaddress1"
              label="E-Mail Address"
              type="email"
              my="1rem"
              isRequired
            />
            <TextInput
              id="telephone1"
              name="telephone1"
              label="Phone Number"
              type="tel"
              my="1rem"
              isRequired
            />
            <RadioInput
              id="bsi_membertype"
              name="bsi_membertype"
              label="Member Type"
              options={configs.membertypes}
              alignment="row"
              my="1rem"
              isRequired
              isEditing
            />
            <CheckboxInput
              id="donotbulkemail"
              name="donotbulkemail"
              label="I agree to receive email communications from CRIN, keeping me informed about upcoming events and opportunities. I understand that I can unsubscribe at any time."
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

export default React.memo(ContactInfoForm);
