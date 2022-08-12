import { Button } from "@chakra-ui/react";
import { Formik, FormikProps, Form } from "formik";
import * as React from "react";
import RadioInput from "../components/RadioInput";
import SearchInput from "../components/SearchInput";

interface IMemberSearchFormProps {
  search: (_term: MemberSearchValue) => void;
  memberTypeOptions: Array<{ value: string; label: string }>;
  techThemeOptions: Array<{ value: string; label: string }>;
}

export interface MemberSearchValue {
  searchString: string;
  memberType: string;
  techTheme: string;
}

const MemberSearchForm: React.FunctionComponent<IMemberSearchFormProps> = ({
  search,
  memberTypeOptions,
  techThemeOptions,
}) => {
  console.log("rendered");
  return (
    <Formik
      initialValues={{
        searchString: "",
        memberType: "",
        techTheme: "",
      }}
      onSubmit={(values, actions) => {
        actions.setSubmitting(true);
        search(values);
        actions.setSubmitting(false);
      }}
    >
      {(props: FormikProps<MemberSearchValue>) => {
        return (
          <Form
            style={{
              padding: "0",
              display: "flex",
              width: "100%",
              flexWrap: "wrap",
            }}
          >
            <SearchInput
              id="searchString"
              name="searchString"
              label="Keyword"
              my="1rem"
            />
            <RadioInput
              id="memberType"
              name="memberType"
              label="Member Type"
              options={memberTypeOptions}
              my="1rem"
            />
            <RadioInput
              id="techTheme"
              name="techTheme"
              label="Tech Theme"
              options={techThemeOptions}
              my="1rem"
            />
            <Button
              type="submit"
              mx="auto"
              my="2rem"
              bgColor="#173f5e"
              color="white"
              px="2rem"
              py="1.5rem"
              isLoading={props.isSubmitting}
            >
              Search
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default React.memo(MemberSearchForm);
