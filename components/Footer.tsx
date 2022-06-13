import { Box } from "@chakra-ui/react";
import Link from "next/link";
import * as React from "react";
import { INavigation } from "../@types/generated/contentful";
import Image from "next/image";

interface IFooterProps {
  footerNav: INavigation;
}

const Footer: React.FunctionComponent<IFooterProps> = ({ footerNav }) => {
  return (
    <Box as="footer">
      <Box
        bgColor={footerNav.fields.backgroundColor}
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
        px={32}
        py={16}
      >
        <Link href="/" passHref>
          <Box as="a" w={80} h="100%">
            <Image
              src={`https:${footerNav.fields.logo!.fields.file.url}`}
              alt={footerNav.fields.logo!.fields.title}
              width={footerNav.fields.logo?.fields.file.details.image?.width}
              height={footerNav.fields.logo?.fields.file.details.image?.height}
            />
          </Box>
        </Link>
        <Box>
          <Box as="h5" fontSize="1.5rem" fontWeight="bold" mb={6} color="white">
            Welcome to the network!
          </Box>
          <Box display="flex" flexDirection="column">
            {footerNav.fields.menuItems?.map((i) => (
              <Link
                href={i.fields.relativeUrl || i.fields.absoluteUrl || "#"}
                key={i.sys.id}
                passHref
              >
                <Box
                  as="a"
                  color={i.fields.textColor}
                  _hover={{ opacity: 0.7 }}
                >
                  {i.fields.linkText}
                </Box>
              </Link>
            ))}
          </Box>
        </Box>
      </Box>
      <Box
        py={6}
        display="flex"
        justifyContent="center"
        bgColor="#548D9A"
        color="white"
      >
        <Box as="span">
          2020-2022 - All Rights Reserved. |{" "}
          <Box as="a" href="/privacy" textDecor="underline">
            Privacy Policy
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
