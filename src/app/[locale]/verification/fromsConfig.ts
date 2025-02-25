import { DynamicForm } from "@/app/utils/types";
import { z } from "zod";
import { getTranslations } from "next-intl/server";



export const businessForm = async (): Promise<DynamicForm<{ 
  email: string; 
  accountNumber: string; 
  userName: string; 
  phoneNumber: string; 
  taxNumber: string; 
  summary: string; 
  commercialRegisterPhoto?: string; 
  licensePhoto?: string; 
  ownerIdentityImageFS?: string; 
  ownerIdentityImageBS?: string; 
  commissionerIdentityImageFS?: string; 
  commissionerIdentityImageBS?: string; 
  physicalAddressImage?: string; 
}>> => {

  const t = await getTranslations();

  return {
    id: "business",
    title: "Business Account Documentation",
    type: "stipper",
    fields: {
      email: {
        type: "email",
        label: t("verificationForm.email.label"),
        placeholder: t("verificationForm.email.placeholder"),
        name: "email",
      },
      accountNumber: {
        type: "text",
        label: t("verificationForm.account_number.label"),
        placeholder: t("verificationForm.account_number.placeholder"),
        name: "accountNumber",
      },
      userName: {
        type: "text",
        label: t("verificationForm.account_name.label"),
        placeholder: t("verificationForm.account_name.placeholder"),
        name: "userName",
      },
      phoneNumber: {
        type: "text",
        label: t("verificationForm.account_phone_number.label"),
        placeholder: t("verificationForm.account_phone_number.placeholder"),
        name: "phoneNumber",
        maxLength: 10,
      },
      taxNumber: {
        type: "text",
        label: t("verificationForm.tax_identification_number.label"),
        placeholder: t("verificationForm.tax_identification_number.placeholder"),
        name: "taxNumber",
      },
      summary: {
        type: "textarea",
        label: t("verificationForm.account_activity_summary.label"),
        placeholder: t("verificationForm.account_activity_summary.placeholder"),
        name: "summary",
      },
      commercialRegisterPhoto: {
        type: "file",
        label: t("verificationForm.commercial_register_image.label"),
        placeholder: t("verificationForm.commercial_register_image.placeholder"),
        name: "commercialRegisterPhoto",
        accept: "image/.jpg, .jpeg, .png",
      },
      licensePhoto: {
        type: "file",
        label: t("verificationForm.practice_license_image.label"),
        placeholder: t("verificationForm.practice_license_image.placeholder"),
        name: "licensePhoto",
        accept: "image/.jpg, .jpeg, .png",
      },
      physicalAddressImage: {
        type: "file",
        label: t("verificationForm.physical_address_document.label"),
        placeholder: t("verificationForm.physical_address_document.placeholder"),
        name: "physicalAddressImage",
        accept: "image/.jpg, .jpeg, .png",
      },
      ownerIdentityImageFS: {
        type: "file",
        label: t("verificationForm.owner_id_image.label"),
        placeholder: t("verificationForm.owner_id_image.placeholder"),
        name: "ownerIdentityImageFS",
        accept: "image/.jpg, .jpeg, .png",
      },
      ownerIdentityImageBS: {
        type: "file",
        label: t("verificationForm.owner_id_image.label"),
        placeholder: t("verificationForm.owner_id_image.placeholder1"),
        name: "ownerIdentityImageBS",
        accept: "image/.jpg, .jpeg, .png",
      },
      commissionerIdentityImageFS: {
        type: "file",
        label: t("verificationForm.delegate_id_image.label"),
        placeholder: t("verificationForm.delegate_id_image.placeholder"),
        name: "commissionerIdentityImageFS",
        accept: "image/.jpg, .jpeg, .png",
      },
      commissionerIdentityImageBS: {
        type: "file",
        label: t("verificationForm.delegate_id_image.label"),
        placeholder: t("verificationForm.delegate_id_image.placeholder1"),
        name: "commissionerIdentityImageBS",
        accept: "image/.jpg, .jpeg, .png",
      },
    },
    endpoint: {
      sendOtp: {
        url: "/api/Authentication/checkVerifications",
        method: "POST",
      },
      verificationAccount: {
        url: "/api/CommercialAccounts/verifyAccount",
        method: "POST",
      },
    },
  };
};

// ✅ تعريف مخطط التحقق باستخدام Zod
export const formSchema = z.object({
  email: z.string().email("البريد الإلكتروني غير صالح"),
  accountNumber: z.string().min(1, "رقم الحساب يجب أن يكون 5 أحرف على الأقل"),
  userName: z.string().min(1, "الحقل مطلوب"),
  phoneNumber: z
    .string()
    .regex(/^09\d{8}$/, "رقم الهاتف يجب أن يبدأ بـ 09 ويتكون من 10 أرقام فقط")
    .length(10, "رقم الهاتف يجب أن يحتوي على 10 أرقام فقط"),
  taxNumber: z.string().min(5, "رقم التعريف الضريبي غير صالح"),
  summary: z.string().max(2048, "الملخص يجب أن يكون أكثر تفصيلاً").min(1),

  commercialRegisterPhoto: z
    .any()
    .refine((file) => file?.length > 0, "يجب رفع ملف مستندات"),
  licensePhoto: z
    .any()
    .refine((file) => file?.length > 0, "يجب رفع ملف مستندات"),
  ownerIdentityImageFS: z
    .any()
    .refine((file) => file?.length > 0, "يجب رفع ملف مستندات"),
  ownerIdentityImageBS: z
    .any()
    .refine((file) => file?.length > 0, "يجب رفع ملف مستندات"),
  commissionerIdentityImageFS: z
    .any()
    .refine((file) => file?.length > 0, "يجب رفع ملف مستندات"),
  commissionerIdentityImageBS: z
    .any()
    .refine((file) => file?.length > 0, "يجب رفع ملف مستندات"),
  physicalAddressImage: z
    .any()
    .refine((file) => file?.length > 0, "يجب رفع ملف مستندات"),
});
export type FormBusinessType = z.infer<typeof formSchema>;

export const organizationForm = async (): Promise<DynamicForm<{ 
  email: string; 
  accountNumber: string; 
  userName: string; 
  phoneNumber: string; 
  taxNumber: string; 
  summary: string; 
  CopyOfTheLicense?: string; 
  licensePhoto?: string; 
  ownerIdentityImageFS?: string; 
  ownerIdentityImageBS?: string; 
  commissionerIdentityImageFS?: string; 
  commissionerIdentityImageBS?: string; 
  physicalAddressImage?: string; 
}>> => {
  const t = await getTranslations();

  return {
    id: "organization",
    title: "Organization Account Documentation",
    type: "stipper",
    fields: {
      email: {
        type: "email",
        label: t("verificationForm.email.label"),
        placeholder: t("verificationForm.email.placeholder"),
        name: "email",
      },
      accountNumber: {
        type: "text",
        label: t("verificationForm.account_number.label"),
        placeholder: t("verificationForm.account_number.placeholder"),
        name: "accountNumber",
      },
      userName: {
        type: "text",
        label: t("verificationForm.account_name.label"),
        placeholder: t("verificationForm.account_name.placeholder"),
        name: "userName",
      },
      phoneNumber: {
        type: "text",
        label: t("verificationForm.account_phone_number.label"),
        placeholder: t("verificationForm.account_phone_number.placeholder"),
        name: "phoneNumber",
        maxLength: 10,
      },
      taxNumber: {
        type: "text",
        label: t("verificationForm.tax_identification_number.label"),
        placeholder: t("verificationForm.tax_identification_number.placeholder"),
        name: "taxNumber",
      },
      summary: {
        type: "textarea",
        label: t("verificationForm.account_activity_summary.label"),
        placeholder: t("verificationForm.account_activity_summary.placeholder"),
        name: "summary",
      },
      CopyOfTheLicense: {
        type: "file",
        label: t("verificationForm.granted_license_image.label"),
        placeholder: t("verificationForm.granted_license_image.placeholder"),
        name: "CopyOfTheLicense",
      },
      physicalAddressImage: {
        type: "file",
        label: t("verificationForm.physical_address_document.label"),
        placeholder: t("verificationForm.physical_address_document.placeholder"),
        name: "physicalAddressImage",
        accept: "image/.jpg, .jpeg, .png",
      },
      ownerIdentityImageFS: {
        type: "file",
        label: t("verificationForm.owner_id_image.label"),
        placeholder: t("verificationForm.owner_id_image.placeholder"),
        name: "ownerIdentityImageFS",
        accept: "image/.jpg, .jpeg, .png",
      },
      ownerIdentityImageBS: {
        type: "file",
        label: t("verificationForm.owner_id_image.label"),
        placeholder: t("verificationForm.owner_id_image.placeholder1"),
        name: "ownerIdentityImageBS",
        accept: "image/.jpg, .jpeg, .png",
      },
      commissionerIdentityImageFS: {
        type: "file",
        label: t("verificationForm.delegate_id_image.label"),
        placeholder: t("verificationForm.delegate_id_image.placeholder"),
        name: "commissionerIdentityImageFS",
        accept: "image/.jpg, .jpeg, .png",
      },
      commissionerIdentityImageBS: {
        type: "file",
        label: t("verificationForm.delegate_id_image.label"),
        placeholder: t("verificationForm.delegate_id_image.placeholder1"),
        name: "commissionerIdentityImageBS",
        accept: "image/.jpg, .jpeg, .png",
      },
    },
    endpoint: { sendOtp: { url: "exapmle.com", method: "POST" } },
  };
};
