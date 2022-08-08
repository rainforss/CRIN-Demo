import {
  ChakraProps,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";
import { useField } from "formik";
import * as React from "react";

interface ITextAreaInputProps extends ChakraProps {
  id: string;
  name: string;
  label: string;
  isRequired?: boolean;
}

const TextAreaInput: React.FunctionComponent<ITextAreaInputProps> = ({
  id,
  name,
  label,
  isRequired,
  ...chakraProps
}) => {
  const [field, meta] = useField(name);
  return (
    <FormControl
      isInvalid={!!(meta.error && meta.touched)}
      isRequired={isRequired}
      {...chakraProps}
    >
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <Textarea
        {...field}
        id={id}
        name={name}
        resize="vertical"
        rows={5}
        autoComplete="off"
      />
      {!!meta.error && <FormErrorMessage>{meta.error}</FormErrorMessage>}
    </FormControl>
  );
};

export default TextAreaInput;
