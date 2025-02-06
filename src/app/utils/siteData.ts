import headphones from "@/assets/icon/headphones.svg";
import shield from "@/assets/icon/shield.svg";
import flash from "@/assets/icon/flash.svg";
import facebookLight from "@/assets/icon/facebookLight.svg";
import whatsappLight from "@/assets/icon/whatsupLight.svg";
import xLight from "@/assets/icon/xLight.svg";
import telegramLight from "@/assets/icon/telegramLight.svg";
import facebookDark from "@/assets/icon/facebookDark.svg";
import whatsappDark from "@/assets/icon/whatsupDark.svg";
import xDark from "@/assets/icon/xDark.svg";
import telegramDark from "@/assets/icon/telegramDark.svg";
import xHoverDark from "@/assets/icon/xHoverDark.svg";
import xHoverLight from "@/assets/icon/xHoverLight.svg";
import facebookHover from "@/assets/icon/facebookHover.svg";
import telegramHover from "@/assets/icon/telegramHover.svg";
import whatsupHover from "@/assets/icon/whatsupHover.svg";
import services from "@/assets/icon/services.svg";
import convert from "@/assets/icon/convert.svg";
import user from "@/assets/icon/user.svg";
import paper from "@/assets/icon/paper.svg";

import {
  AboutCards,
  FAnswerQuestions,
  FeaturesCards as FeaturesCardsType,
  NavLinks,
  socialMedias,
  terms as termsType,
} from "./types";

export const navLinks: NavLinks = [
  { id: crypto.randomUUID(), title: "الصفحة الرئيسية", Path: "/" },
  { id: crypto.randomUUID(), title: "الأحكام والشروط", Path: "/terms" },
  { id: crypto.randomUUID(), title: "تواصل معنا", Path: "#footer" },
  // { id: crypto.randomUUID(), title: "ادخال", Path: "/form" },
  
];

export const terms: termsType = [
  { li: "تتحمل كامل المسؤولية عن صحة بيانات حسابك وعن حماية بيانات الدخول." },
  { li: "نخلي مسؤوليتنا عن أي أخطاء نتيجة سوء استخدامك للبرنامج." },
  {
    li: "تعتبر مسؤول مسؤولية تامة عن كافة العمليات و التحويلات التي تتم في حسابك.",
  },
  {
    li: "استخدامك البرنامج بشكل غير لائق وغير أخلاقي و محاولتك التحايل والإلتفاف على البرنامج يحملك كامل المسؤولية ويعرضك للمسألة.",
  },
  {
    li: "نحن غير مسؤولين عن أي عمليات احتيال تتعرض لها نتيجة استخدامك النسخ المزورة أو بالطرق الأخرى.",
  },
  {
    li: "لا يحق لك استخدام البرنامج في الأغراض الغير شرعية او المخالفة للأنظمة والقوانين المعمول بها.",
  },
  {
    li: "يحق لنا ايقاف حسابك في حال مخالفتك للاتفاقية أو بموجب امر قضائي دون الرجوع إليك.",
  },
  {
    li: "يتم حل كافة المسائل القضائية من خلال المحاكم التابعة للسلطة المحلية.",
  },
  {
    li: "نحن نحتفظ بالحق في تغيير أو تعديل هذه الاتفاقية في أي وقت, دون ضرورة إبلاغك وإنما الإعلان عن ذلك بالطريقة التي نراها مناسبة ويعتبر استمرارك في استخدام البرنامج بعد إجراء أي تغييرات أو تعديلات على هذه الاتفاقية قبولاً منك لهذه التغييرات أو التعديلات.",
  },
];

export const fAnswerQuestion: FAnswerQuestions = [
  {
    id: crypto.randomUUID(),
    question: "اديش عمولة التحويل؟",
    answer: "الخدمة مجانية ولا يوجد عمولة تحويل حالياً.",
  },
  {
    id: crypto.randomUUID(),
    question: "شو ضمان المنصة أنه ماتسكر فجأة ؟",
    answer: "بنك شام هو الضامن",
  },
  {
    id: crypto.randomUUID(),
    question: "هل يوجد من يقوم بحماية المنصة من الاختراق ؟",
    answer: "صحيح يوجد عدد من الإخوة المبرمجين قائمين على حماية البرنامج.",
  },
  {
    id: crypto.randomUUID(),
    question:
      "هل يمكن الاستفاده من برنامج شام كاش من اجل تعبئه رصيد في سيريافون او تعبئه الكهرباء ؟",
    answer:
      "قريباً بإذن الله سيتم تفعيل عدد من الخدمات ومنها الاتصالات والكهرباء والتسويق الإلكتروني",
  },
];
export const aboutCards: AboutCards = [
  {
    image: headphones.src,
    title: "الدعم",
    description:
      "فريق الدعم الخاص بنا متواجد على مدار الساعة للرد على استفساراتك وحل أي مشاكل قد تواجهها، لضمان تجربة استخدام سلسة وخالية من العقبات.",
  },
  {
    image: shield.src,
    title: "الأمان",
    description:
      "تطبيقنا مصمم بأعلى معايير الأمان لحماية بياناتك ومعاملاتك المالية، مما يضمن لك تجربة موثوقة وآمنة في كل خطوة.",
  },
  {
    image: flash.src,
    title: "السرعة",
    description:
      "تطبيقنا يتميز بالسرعة العالية لتنفيذ العمليات، مما يضمن تجربة فورية وسلسة تلبي احتياجاتك في أي وقت.",
  },
];
export const socialMedia: socialMedias = [
  {
    id: crypto.randomUUID(),
    name: "facebook",
    imgDark: facebookDark.src,
    imgLight: facebookLight.src,
    imgDarkHover: facebookHover.src,
    imgLightHover: facebookHover.src,
  },
  {
    id: crypto.randomUUID(),
    name: "x",
    imgDark: xDark.src,
    imgLight: xLight.src,
    imgDarkHover: xHoverDark,
    imgLightHover: xHoverLight,
  },
  {
    id: crypto.randomUUID(),
    name: "whatsapp",
    imgDark: whatsappDark.src,
    imgLight: whatsappLight.src,
    imgDarkHover: whatsupHover.src,
    imgLightHover: whatsupHover.src,
  },
  {
    id: crypto.randomUUID(),
    name: "telegram",
    imgDark: telegramDark.src,
    imgLight: telegramLight.src,
    imgDarkHover: telegramHover.src,
    imgLightHover: telegramHover.src,
  },
];
export const featuresCards: FeaturesCardsType = [
  {
    image: services.src,
    title: "الخدمات",
    description:
      "نوفر مجموعة من الخدمات المتنوعة التي تلبي احتياجاتك اليومية وتوفر عليك الوقت والجهد.",
  },
  {
    image: convert.src,
    title: "سهولة التحويل بين المستخدمين",
    description: "أرسل واستقبل الأموال بسهولة وسلاسة بين مستخدمي التطبيق.",
  },
  {
    image: flash.src,
    title: "سرعة العمليات",
    description: "نفّذ معاملاتك المالية بسرعة فائقة دون أي تأخير.",
  },
  {
    image: user.src,
    title: "سهولة الاستخدام",
    description:
      "واجهة تطبيق بسيطة ومباشرة تسهل عليك إجراء العمليات دون تعقيد.",
  },
  {
    image: shield.src,
    title: "أمان الأموال",
    description:
      "نضمن حماية كاملة لأموالك ومعاملاتك باستخدام أحدث تقنيات الأمان.",
  },
  {
    image: paper.src,
    title: "بدون رسوم",
    description:
      "استمتع بخدماتنا المالية بدون أي رسوم خفية، لتبقى كل معاملتك واضحة وشفافة.",
  },
];
