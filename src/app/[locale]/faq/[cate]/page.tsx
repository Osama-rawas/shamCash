import { Languages } from "@/app/utils/enums";
import { setDirction, setTextDirection } from "@/app/utils/helperServer";
import { faqWithCategories } from "@/app/utils/siteData";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getTranslations } from "next-intl/server";
import PathLine from "../../../components/PathLine";

interface FaqPageProps {
  params: Promise<{ cate: string; locale: Languages }>;
}

const FaqPage = async ({ params }: FaqPageProps) => {
  const resolvedParams = await params;
  const { locale } = resolvedParams;
  const categoryId = resolvedParams.cate;
  const faqWithCategorieArray = await faqWithCategories();
  const t = await getTranslations("");

  const faqWithCategorie = faqWithCategorieArray.find(
    (category) => category.categoryId === categoryId
  );

  return (
    <div className="container mx-auto pt-5">
      <PathLine
        pagename={t(`faqPage.category.category${categoryId}.name`)}
        backname={t("faqPage.title")}
      />
      <div className="container flex flex-col items-center gap-5 mx-auto my-6 lg:my-10">
        <h2 className="sm:w-fit text-primary text-center text-2xl font-bold mb-10 underLine relative mx-auto">
          {faqWithCategorie?.categoryName}
        </h2>

        <div
          className=" grid grid-cols-1 lg:grid-cols-2 gap-6 w-11/12"
          dir="rtl"
        >
          {faqWithCategorie?.questions.map((aq, index) => (
            <div key={index}>
              <Accordion type="single" collapsible>
                <AccordionItem
                  value={`item-${index}`}
                  dir={setDirction(locale)}
                >
                  <AccordionTrigger className={setTextDirection(locale)}>
                    {aq.question}
                  </AccordionTrigger>
                  <AccordionContent>{aq.answer}</AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaqPage;
