import CarouselSection from "./CarouselSection";
import HeroSection from "./HeroSection";
import PublicationsSection from "./PublicationsSection";
import RichTextSection from "./RichTextSection";
import SecondaryHeroSection from "./SecondaryHeroSection";
import SubscriptionSection from "./SubscriptionSection";

//Add newly developed designed sections here
export const sectionConfig = {
  HeroSection: HeroSection,
  CarouselSection: CarouselSection,
  PublicationsSection: PublicationsSection,
  RichTextSection: RichTextSection,
  SecondaryHeroSection: SecondaryHeroSection,
  SubscriptionSection: SubscriptionSection,
};

export const DESIGNED_SECTION_NAMES = Object.keys(sectionConfig);
