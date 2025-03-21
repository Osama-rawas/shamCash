import { faqCategories } from "@/app/utils/siteData";
import { getTranslations } from "next-intl/server";

import { setDirction } from "@/app/utils/helperServer";
import { Languages } from "@/app/utils/enums";
import FAQSearchBtn from "./_components/FAQSearchBtn";
import Category from "@/app/components/Category";
interface FaqPageProps {
  params: Promise<{ locale: Languages }>;
}

const FaqPage = async ({ params }: FaqPageProps) => {
  const { locale } = await params;

  const t = await getTranslations("");
  const faqCategoriesArray = await faqCategories();

  return (
    <div className="flex items-center justify-center container flex-col gap-5 mx-auto  my-8 lg:my-14 ">
      <h2 className="-z-10 text-primary text-center text-3xl font-bold mb-14 underLine relative mx-auto sm:w-fit ">
        {t("faqPage.title")}
      </h2>
      <p dir="auto" className="mx-5 sm:mx-auto text-muted md:text-center text-justify text-lg font-medium max-w-4xl">
        {t("faqPage.description")}
      </p>

      <div className="w-80  mx-auto">
        <FAQSearchBtn locale={locale} diraction={setDirction(locale)} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2  text-center gap-6">
        {faqCategoriesArray.map((category) => (
          <Category {...category} key={category.id} />
        ))}
      </div>
    </div>
  );
};

export default FaqPage;
