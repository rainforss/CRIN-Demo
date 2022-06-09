import { Box } from "@chakra-ui/react";
import Link from "next/link";
import * as React from "react";
import Carousel from "react-multi-carousel";
import { IPageSection } from "../@types/generated/contentful";
import "react-multi-carousel/lib/styles.css";

interface ICarouselSectionProps {
  pageSection: IPageSection;
}

const CarouselSection: React.FunctionComponent<ICarouselSectionProps> = ({
  pageSection,
}) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <Box w="80%" mx="auto" py={32}>
      <Carousel
        responsive={responsive}
        ssr={true}
        infinite={true}
        autoPlaySpeed={5000}
        autoPlay={true}
        removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
        showDots={true}
      >
        {pageSection.fields.attachedComponents?.map((ac) => (
          <Box
            key={ac.sys.id}
            display="flex"
            flexDirection="column"
            px={8}
            justifyContent="space-between"
            h="100%"
          >
            <Box display="flex" flexDirection="column">
              <Link href={ac.fields.ctaButtonLink || "#"} passHref>
                <Box
                  as="a"
                  fontSize="1.4rem"
                  fontWeight="bold"
                  color={ac.fields.mainHeadingTextColor}
                >
                  {ac.fields.mainHeading}
                </Box>
              </Link>
              <Box as="small" fontWeight="bold" my={6}>
                {ac.fields.subHeading}
              </Box>
            </Box>
            <Box as="p">{ac.fields.description}</Box>
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};

export default CarouselSection;
