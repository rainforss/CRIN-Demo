import { TriangleDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Link as ChakraLink,
  ButtonGroup,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { INavigation } from "../@types/generated/contentful";
import { useCurrentUser } from "../hooks/useCurrentUser";

interface IHeaderProps {
  headerNav: INavigation;
}

const Header: React.FunctionComponent<IHeaderProps> = ({ headerNav }) => {
  const { user, isLoading, isError } = useCurrentUser();
  return (
    <Box as="header">
      <Box
        display="flex"
        justifyContent="flex-end"
        bgColor="#548D9A"
        px={32}
        py={4}
      >
        {!user && (
          <>
            <Button
              variant="solid"
              bgColor="black"
              color="white"
              px={8}
              isLoading={isLoading}
              disabled={isLoading}
              as="a"
              href="/login"
            >
              Login
            </Button>
          </>
        )}
        {!isLoading && !!user && (
          <ButtonGroup spacing={6}>
            <Button
              as="a"
              href="/member-directory"
              variant="outline"
              color="white"
              _hover={{ bgColor: "black", borderColor: "black" }}
            >
              Member Directory
            </Button>
            <Button
              as="a"
              href="/profile"
              variant="outline"
              color="white"
              _hover={{ bgColor: "black", borderColor: "black" }}
            >
              My Profile
            </Button>
            <Button
              variant="solid"
              bgColor="black"
              color="white"
              px={8}
              _hover={{ color: "black", bgColor: "white" }}
            >
              Log Out
            </Button>
          </ButtonGroup>
        )}
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        px={32}
        py={8}
        bgColor={headerNav.fields.backgroundColor}
      >
        <Link href="/" passHref>
          <Box as="a" w={80}>
            <Image
              src={`https:${headerNav.fields.logo!.fields.file.url}`}
              alt={headerNav.fields.logo!.fields.title}
              width={headerNav.fields.logo?.fields.file.details.image?.width}
              height={headerNav.fields.logo?.fields.file.details.image?.height}
            />
          </Box>
        </Link>

        <Box as="nav">
          <Box
            as="ul"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            h="100%"
            style={{ gap: "4rem" }}
            fontSize="1.2rem"
          >
            {headerNav.fields.menuItems!.map((i) =>
              i.fields.subItems && i.fields.subItems.length !== 0 ? (
                <Box as="li" listStyleType="none" key={i.sys.id}>
                  <Menu>
                    <MenuButton
                      as={ChakraLink}
                      color={i.fields.textColor}
                      _hover={{ color: "black" }}
                    >
                      {i.fields.linkText}
                      <TriangleDownIcon ml={2} />
                    </MenuButton>
                    <MenuList>
                      {i.fields.subItems.map((si) => (
                        <Link
                          key={si.sys.id}
                          href={
                            si.fields.relativeUrl ||
                            si.fields.absoluteUrl ||
                            "#"
                          }
                          passHref
                        >
                          <MenuItem as="a">{si.fields.linkText}</MenuItem>
                        </Link>
                      ))}
                    </MenuList>
                  </Menu>
                </Box>
              ) : (
                <Box as="li" listStyleType="none" key={i.sys.id}>
                  <Link
                    href={i.fields.relativeUrl || i.fields.absoluteUrl || "#"}
                    passHref
                  >
                    <Box
                      as="a"
                      color={i.fields.textColor}
                      _hover={{ color: "black" }}
                    >
                      {i.fields.linkText}
                    </Box>
                  </Link>
                </Box>
              )
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
