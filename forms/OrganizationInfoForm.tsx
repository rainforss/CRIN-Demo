import { useToast, Button } from "@chakra-ui/react";
import axios from "axios";
import { Formik, FormikProps, Form } from "formik";
import * as React from "react";
import MultiSelectInput from "../components/MultiSelectInput";
import TextInput from "../components/TextInput";
import { Member } from "../types/dynamics-365/common/types";
import config from "../crin-config.json";

interface IOrganizationInfoFormProps {
  member: Member;
}

export class OrganizationInfoValue {
  companyname: string = "";
  jobtitle: string = "";
  address1_line1: string = "";
  address1_country: string = "";
  address1_stateorprovince: string = "";
  address1_city: string = "";
  address1_postalcode: string = "";
  sectors: Array<{ label: string; value: string }> = [];
}

const OrganizationInfoForm: React.FunctionComponent<
  IOrganizationInfoFormProps
> = ({ member }) => {
  const submit = async (values: OrganizationInfoValue) => {
    const {
      companyname,
      jobtitle,
      address1_city,
      address1_country,
      address1_line1,
      address1_postalcode,
      address1_stateorprovince,
      sectors,
    } = values;
    const requestBody = {
      contactid: member.contactid,
      contact: {
        jobtitle,
        address1_city,
        address1_country,
        address1_line1,
        address1_postalcode,
        address1_stateorprovince,
      },
      bsi_membercompanyid: member.bsi_MemberCompany
        ? member.bsi_MemberCompany.bsi_membercompanyid
        : null,
      company: {
        bsi_name: companyname,
      },
      sectors,
    };
    await axios.put(`/api/members/${member.contactid}`, requestBody);
  };
  const toast = useToast();
  console.log(member);

  const initialSectors = member.bsi_MemberAssociatedSector_Member_Contact.map(
    (s) => ({ value: s._bsi_sector_value, label: s.bsi_name })
  );
  return (
    <Formik
      initialValues={{
        companyname: member.bsi_MemberCompany
          ? member.bsi_MemberCompany.bsi_name
          : "",
        jobtitle: member.jobtitle,
        address1_line1: member.address1_line1,
        address1_country: member.address1_country,
        address1_stateorprovince: member.address1_stateorprovince,
        address1_city: member.address1_city,
        address1_postalcode: member.address1_postalcode,
        sectors: initialSectors as Array<{ label: string; value: string }>,
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
      {(props: FormikProps<OrganizationInfoValue>) => {
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
              id="companyname"
              name="companyname"
              label="Name"
              type="text"
              my="1rem"
              isRequired
            />
            <TextInput
              id="jobtitle"
              name="jobtitle"
              label="Position"
              type="text"
              my="1rem"
              isRequired
            />
            <TextInput
              id="address1_line1"
              name="address1_line1"
              label="Street Address"
              type="text"
              my="1rem"
            />
            <TextInput
              id="address1_country"
              name="address1_country"
              label="Country"
              type="text"
              my="1rem"
              isRequired
            />
            <TextInput
              id="address1_stateorprovince"
              name="address1_stateorprovince"
              label="Province/State"
              type="text"
              my="1rem"
              isRequired
            />
            <TextInput
              id="address1_city"
              name="address1_city"
              label="City"
              type="text"
              my="1rem"
              isRequired
            />
            <TextInput
              id="address1_postalcode"
              name="address1_postalcode"
              label="Postal Code/Zip"
              type="text"
              my="1rem"
            />
            <MultiSelectInput
              id="sectors"
              name="sectors"
              label="Sectors"
              options={config.sectors}
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

export default OrganizationInfoForm;
