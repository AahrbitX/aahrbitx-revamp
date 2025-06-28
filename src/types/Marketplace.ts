export type TemplateProps = {
  id: string;
  title: string;
  slug: string;
  description: string;
  full_description: string;
  imageUrls: {
    illustrations: { src: string; alt: string }[];
    metaImage: { src: string; alt: string };
    fullpage: string;
  };
  price: string;
  link: string;
  tags: string[];
  rating: number;
  seobility?: string;
  colorSchema: { name: string; value: string }[];
  keyAspects?: string[];
  priceBreakdown: {
    selfService: {
      item: string;
      price: string | number;
      offer?: number | string;
    }[];
    ourService: {
      item: string;
      price: string | number;
      offer?: number | string;
    }[];
  };
  info: any[];
  actions: {};
  comingSoon?: boolean;
};

export type ComingSoonTemplateProps = Partial<TemplateProps>;
