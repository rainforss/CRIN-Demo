import { SearchIcon } from "@chakra-ui/icons";
import {
  ChakraProps,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useField } from "formik";
import * as React from "react";

interface ISearchInputProps extends ChakraProps {
  id: string;
  name: string;
  label: string;
  isRequired?: boolean;
}

const SearchInput: React.FunctionComponent<ISearchInputProps> = ({
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
      <InputGroup>
        <Input {...field} id={id} name={name} type="text" />
        <InputRightElement width="2.5rem">
          <SearchIcon />
        </InputRightElement>
      </InputGroup>
      {!!meta.error && <FormErrorMessage>{meta.error}</FormErrorMessage>}
    </FormControl>
  );
};

export default SearchInput;
