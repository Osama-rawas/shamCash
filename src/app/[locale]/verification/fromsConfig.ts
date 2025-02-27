import { AccountType, DynamicForm } from "@/app/utils/types";
import { z } from "zod";

export const businessForm = (): DynamicForm<{
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
}> => {
  return {
    id: "business",
    title: "Business Account Documentation",
    type: "stipper",
    fields: {
      email: {
        type: "email",
        label: "البريد الالكتروني",
        placeholder: "البريد الالكتروني",
        name: "email",
      },
      accountNumber: {
        type: "text",
        label: "رقم الحساب",
        placeholder: "رقم الحساب",
        name: "accountNumber",
      },
      userName: {
        type: "text",
        label: "اسم الحساب",
        placeholder: "اسم الحساب",
        name: "userName",
      },
      phoneNumber: {
        type: "text",
        label: "رقم الهاتف",
        placeholder: "رقم الهاتف",
        name: "phoneNumber",
        maxLength: 10,
      },
      taxNumber: {
        type: "text",
        label: "رقم التعريف الضريبي",
        placeholder: "رقم التعريف الضريبي",
        name: "taxNumber",
      },
      summary: {
        type: "textarea",
        label: " ملخص عن أنشطة الحساب",
        placeholder: "اكتب هنا",
        name: "summary",
      },
      commercialRegisterPhoto: {
        type: "file",
        label: "صورة السجل التجاري",
        placeholder: "صورة السجل التجاري",
        name: "commercialRegisterPhoto",
        accept: "image/.jpg, .jpeg, .png",
      },
      licensePhoto: {
        type: "file",
        label: "صورة رخصة مزاولة مهنة",
        placeholder: "صورة رخصة مزاولة مهنة",
        name: "licensePhoto",
        accept: "image/.jpg, .jpeg, .png",
      },
      physicalAddressImage: {
        type: "file",
        label: "صورة وثيقة تحمل الرقم الفيزيائي",
        placeholder: "صورة وثيقة تحمل الرقم الفيزيائي",
        name: "physicalAddressImage",
        accept: "image/.jpg, .jpeg, .png",
      },
      ownerIdentityImageFS: {
        type: "file",
        label: "صورة هوية المالك",
        placeholder: "الوجه الامامي",
        name: "ownerIdentityImageFS",
        accept: "image/.jpg, .jpeg, .png",
      },
      ownerIdentityImageBS: {
        type: "file",
        label: "صورة هوية المالك",
        placeholder: "الوجه الخلفي",
        name: "ownerIdentityImageBS",
        accept: "image/.jpg, .jpeg, .png",
      },
      commissionerIdentityImageFS: {
        type: "file",
        label: "صورة هوية المفوض",
        placeholder: "الوجه الامامي",
        name: "commissionerIdentityImageFS",
        accept: "image/.jpg, .jpeg, .png",
      },
      commissionerIdentityImageBS: {
        type: "file",
        label: "صورة هوية المفوض",
        placeholder: "الوجه الخلفي",
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

export const organizationForm = (): DynamicForm<{
  email: string;
  accountNumber: string;
  userName: string;
  phoneNumber: string;
  taxNumber: string;
  summary: string;
  licensePhoto?: string;
  ownerIdentityImageFS?: string;
  ownerIdentityImageBS?: string;
  commissionerIdentityImageFS?: string;
  commissionerIdentityImageBS?: string;
  physicalAddressImage?: string;
}> => {
  return {
    id: "organization",
    title: "organization Account Documentation",
    type: "stipper",
    fields: {
      email: {
        type: "email",
        label: "البريد الالكتروني",
        placeholder: "البريد الالكتروني",
        name: "email",
      },
      accountNumber: {
        type: "text",
        label: "رقم الحساب",
        placeholder: "رقم الحساب",
        name: "accountNumber",
      },
      userName: {
        type: "text",
        label: "اسم الحساب",
        placeholder: "اسم الحساب",
        name: "userName",
      },
      phoneNumber: {
        type: "text",
        label: "رقم الهاتف",
        placeholder: "رقم الهاتف",
        name: "phoneNumber",
        maxLength: 10,
      },
      taxNumber: {
        type: "text",
        label: "رقم التعريف الضريبي",
        placeholder: "رقم التعريف الضريبي",
        name: "taxNumber",
      },
      summary: {
        type: "textarea",
        label: " ملخص عن أنشطة الحساب",
        placeholder: "اكتب هنا",
        name: "summary",
      },

      licensePhoto: {
        type: "file",
        label: "صورة رخصة مزاولة مهنة",
        placeholder: "صورة رخصة مزاولة مهنة",
        name: "licensePhoto",
        accept: "image/.jpg, .jpeg, .png",
      },
      physicalAddressImage: {
        type: "file",
        label: "صورة وثيقة تحمل الرقم الفيزيائي",
        placeholder: "صورة وثيقة تحمل الرقم الفيزيائي",
        name: "physicalAddressImage",
        accept: "image/.jpg, .jpeg, .png",
      },
      ownerIdentityImageFS: {
        type: "file",
        label: "صورة هوية المالك",
        placeholder: "الوجه الامامي",
        name: "ownerIdentityImageFS",
        accept: "image/.jpg, .jpeg, .png",
      },
      ownerIdentityImageBS: {
        type: "file",
        label: "صورة هوية المالك",
        placeholder: "الوجه الخلفي",
        name: "ownerIdentityImageBS",
        accept: "image/.jpg, .jpeg, .png",
      },
      commissionerIdentityImageFS: {
        type: "file",
        label: "صورة هوية المفوض",
        placeholder: "الوجه الامامي",
        name: "commissionerIdentityImageFS",
        accept: "image/.jpg, .jpeg, .png",
      },
      commissionerIdentityImageBS: {
        type: "file",
        label: "صورة هوية المفوض",
        placeholder: "الوجه الخلفي",
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
        url: "/api/OrganizationAccount/verifyAccount",
        method: "POST",
      },
    },
  };
};

export const businessformSchema = z.object({
  email: z.string().email("البريد الإلكتروني غير صالح").min(1, "الحقل مطلوب"),
  accountNumber: z
    .string()
    .regex(/^\d+$/, "رقم الحساب يجب أن يحتوي على أرقام فقط (0-9).")
    .min(16, "رقم الحساب يجب أن يكون 16 أحرف على الأقل"),
  userName: z.string().min(1, "الحقل مطلوب"),
  phoneNumber: z
    .string()
    .regex(/^09\d{8}$/, "رقم الهاتف يجب أن يبدأ بـ 09 ويتكون من 10 أرقام فقط")
    .length(10, "رقم الهاتف يجب أن يحتوي على 10 أرقام فقط"),
  taxNumber: z
    .string()
    .regex(/^\d+$/, "رقم التعريف الضريبي يجب أن يحتوي على أرقام فقط (0-9).")
    .min(5, "رقم التعريف الضريبي غير صالح"),
  summary: z
    .string()
    .max(2048, "الملخص يجب أن يكون أكثر تفصيلاً")
    .min(1, "الحقل مطلوب"),

  commercialRegisterPhoto: z
    .any()
    .refine((file) => file?.length > 0, "يجب رفع الصورة"),
  licensePhoto: z.any().refine((file) => file?.length > 0, "يجب رفع الصورة"),
  ownerIdentityImageFS: z
    .any()
    .refine((file) => file?.length > 0, "يجب رفع الصورة"),
  ownerIdentityImageBS: z
    .any()
    .refine((file) => file?.length > 0, "يجب رفع الصورة"),
  commissionerIdentityImageFS: z
    .any()
    .refine((file) => file?.length > 0, "يجب رفع الصورة"),
  commissionerIdentityImageBS: z
    .any()
    .refine((file) => file?.length > 0, "يجب رفع الصورة"),
  physicalAddressImage: z
    .any()
    .refine((file) => file?.length > 0, "يجب رفع الصورة"),
});

export const organizationformSchema = z.object({
  email: z.string().email("البريد الإلكتروني غير صالح").min(1, "الحقل مطلوب"),
  accountNumber: z
    .string()
    .regex(/^\d+$/, "رقم الحساب يجب أن يحتوي على أرقام فقط (0-9).")
    .min(16, "رقم الحساب يجب أن يكون 5 أحرف على الأقل"),
  userName: z.string().min(1, "الحقل مطلوب"),
  phoneNumber: z
    .string()
    .regex(/^09\d{8}$/, "رقم الهاتف يجب أن يبدأ بـ 09 ويتكون من 10 أرقام فقط")
    .length(10, "رقم الهاتف يجب أن يحتوي على 10 أرقام فقط"),
  taxNumber: z
    .string()
    .regex(/^\d+$/, "رقم التعريف الضريبي يجب أن يحتوي على أرقام فقط (0-9).")
    .min(5, "رقم التعريف الضريبي غير صالح"),
  summary: z
    .string()
    .max(2048, "الملخص يجب أن يكون أكثر تفصيلاً")
    .min(1, "الحقل مطلوب"),
  licensePhoto: z.any().refine((file) => file?.length > 0, "يجب رفع الصورة"),
  ownerIdentityImageFS: z
    .any()
    .refine((file) => file?.length > 0, "يجب رفع الصورة"),
  ownerIdentityImageBS: z
    .any()
    .refine((file) => file?.length > 0, "يجب رفع الصورة"),
  commissionerIdentityImageFS: z
    .any()
    .refine((file) => file?.length > 0, "يجب رفع الصورة"),
  commissionerIdentityImageBS: z
    .any()
    .refine((file) => file?.length > 0, "يجب رفع الصورة"),
  physicalAddressImage: z
    .any()
    .refine((file) => file?.length > 0, "يجب رفع الصورة"),
});

export type FormBusinessType = z.infer<typeof businessformSchema>;
export type FormOrganizationType = z.infer<typeof organizationformSchema>;

export function getFormSchema(accountType: AccountType) {
  switch (accountType) {
    case "organization":
      return organizationformSchema;
    case "business":
      return businessformSchema;
    default:
      throw new Error(`Invalid form type: ${accountType}`);
  }
}

export function getFormData(accountType: AccountType) {
  switch (accountType) {
    case "organization":
      return organizationForm();
    case "business":
      return businessForm();
    default:
      throw new Error(`Invalid account type: ${accountType}`);
  }
}
