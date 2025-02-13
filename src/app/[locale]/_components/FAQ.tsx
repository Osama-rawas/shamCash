import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { fAnswerQuestion } from "../../utils/siteData";
import { setDirction, setTextDirection } from "@/app/utils/helperServer";
import { useLocale } from "next-intl";
import { Languages } from "@/app/utils/enums";
const FAQ = () => {
  const locale = useLocale() as Languages;
  return (
    <div className="flex items-center justify-center container flex-col gap-5 mx-auto  my-8 lg:my-14 ">
      <h3 className="text-primary font-bold text-2xl underLine relative"  data-aos="fade-up"
        data-aos-duration="800">
        الأسئلة الشائعة
      </h3>
      <p
        className="w-[68%] text-center  text-xl text-muted leading-9 mt-10 font-medium"
        data-aos="fade-up"
        data-aos-duration="800"
      >
        نقدم لك إجابات على الأسئلة الأكثر شيوعًا التي قد تكون لديك حول استخدام
        التطبيق. هدفنا هو تزويدك بكل المعلومات التي تحتاجها لتجربة سلسة ومريحة.
        إذا كنت تواجه أي استفسار أو مشكلة لم يتم تناولها هنا، لا تتردد في
        التواصل مع فريق الدعم الذي يتوفر على مدار الساعة لمساعدتك.
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10  w-4/5 ">
        {fAnswerQuestion.map((faq) => (
          <div key={faq.id} data-aos="fade-up" data-aos-duration="800">
            <Accordion type="single" collapsible className="">
              <AccordionItem value="item-1" dir={setDirction(locale)}>
                <AccordionTrigger className={setTextDirection(locale)}>
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
