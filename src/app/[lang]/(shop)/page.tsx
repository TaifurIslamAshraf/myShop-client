import Category from "@/components/Category";
import CustomerReview from "@/components/CustomerReview";
import Footer from "@/components/Footer";
import MixProdcts from "@/components/MixProdcts";
import SoldProducts from "@/components/SoldProducts";
import YoutubePlaylist from "@/components/YoutubePlaylist";
import BannerSlider from "@/components/bannerSlider";
import { cn } from "@/lib/utils";
import { Locale, getDictionary } from "../dictionaries";
import { styles } from "../styles";

type Props = {
  params: {
    lang: Locale;
  };
};

export default async function Home({ params: { lang } }: Props) {
  const intl = await getDictionary(lang);

  return (
    <main className={cn("h-[200vh] mt-[140px]")}>
      <div
        className={cn(
          styles.paddingX,
          "flex items-center justify-between h-[320px] gap-4"
        )}
      >
        <div className="w-full max-w-[270px]">
          <Category />
        </div>
        <div className="h-full w-full">
          <BannerSlider />
        </div>
      </div>

      <div className={cn(styles.paddingX)}>
        <MixProdcts />
      </div>
      <div className={cn(styles.paddingX)}>
        <SoldProducts />
      </div>
      <div className={(styles.paddingY, styles.paddingX, "mb-20")}>
        <h1 className={cn(styles.headingText, "text-center")}>
          Customer Review
        </h1>
        <CustomerReview />
      </div>
      <YoutubePlaylist />
      <div className={"pt-20"}>
        <Footer />
      </div>
    </main>
  );
}
