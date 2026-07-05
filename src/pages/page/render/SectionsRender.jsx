import BannerSectionRender from "./BannerSectionRender";
import ProductsSectionRender from "./ProductsSectionRender";

import TextSectionRender from "./TextSectionRender";

export default function SectionsRender({ section }) {
  switch (section.type) {
    case "banner":
      return <BannerSectionRender data={section.props} />;

    case "products":
      return <ProductsSectionRender data={section.props} />;

    case "text":
      return <TextSectionRender data={section.props} />;

    default:
      return null;
  }
}
