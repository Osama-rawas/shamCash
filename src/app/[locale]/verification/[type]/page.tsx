"use client";
import { SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import imgLightAr from "@/assets/images/verficationimage.svg";
import imgDarkAr from "@/assets/images/verficationimage-dark.svg";
import imgDarkEn from "@/assets/images/imgVrfication-darkEn.svg";
import imgLightEn from "@/assets/images/imgVrfication-lightEn.svg";
import { OtpAlertDialog } from "@/app/components/OtpAlertDialog";
import PathLine from "@/app/components/PathLine";
import { useLocale, useTranslations } from "next-intl";
import { postData } from "@/app/utils/apiService";
import Resizer from "react-image-file-resizer";
import FilleField from "@/app/components/fields/FilleField";
import {
  FormBusinessType,
  FormOrganizationType,
  getFormData,
  getFormSchema,
} from "../formsConfig";
import InputField from "@/app/components/fields/InputField";
import { setDirctionReverse } from "@/app/utils/helperServer";
import { Languages, ResponseCodes } from "@/app/utils/enums";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { z, ZodSchema } from "zod";
import { AccountType } from "@/app/utils/types";
import { useParams } from "next/navigation";
import Spinner from "@/app/components/spinner";

const MultiStepForm = () => {
  const params = useParams();
  const accountType = params.type as AccountType;
  const schema = getFormSchema(accountType) as unknown as ZodSchema<
    FormBusinessType | FormOrganizationType
  >;
  const t = useTranslations("");
  type formType = z.infer<typeof schema>;
  const formData = getFormData(accountType);
  const [step, setStep] = useState(1);
  const [openalert, setOpenAlert] = useState(false);
  const [otp, setOtp] = useState<string>("");
  const locale = useLocale() as Languages;
  const { resolvedTheme } = useTheme();
  const [timer, setTimer] = useState(0);
  const [errorsApi, setErrorsApi] = useState({
    accountError: false,
    otpError: false,
  });
  const [fileNames, setFileNames] = useState({
    commercialRegisterPhoto: "",
    licensePhoto: "",
    ownerIdentityImageFS: "",
    ownerIdentityImageBS: "",
    commissionerIdentityImageFS: "",
    commissionerIdentityImageBS: "",
    physicalAddressImage: "",
  });

  const [isNextHovered, setIsNextHovered] = useState(false); // لحالة hover لزر "التالي"
  const [isBackHovered, setIsBackHovered] = useState(false); // لحالة hover لزر "العودة"

  const handleStepChange = (step: SetStateAction<number>) => {
    setStep(step);
    setIsNextHovered(false); // إلغاء التأثير عند التبديل بين الأزرار
    setIsBackHovered(false); // إلغاء التأثير عند التبديل بين الأزرار
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<formType>({
    resolver: zodResolver(schema),
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onError = (errors: any) => {
    const parsed = schema.safeParse(errors);
    if (!parsed.success) {
      if (
        errors.email ||
        errors.userName ||
        errors.taxNumber ||
        errors.summary ||
        errors.accountNumber ||
        errors.phoneNumber
      ) {
        setStep(1);
      }

      toast.error(t("messages.checkEnteredData"));
    }
  };

  function getOtpBody(data: formType): Record<string, string> {
    const oData: Record<string, string> = {};
    const fieldData: (keyof formType)[] = [
      "phoneNumber",
      "userName",
      "accountNumber",
      "email",
    ];
    for (let i = 0; i < fieldData.length; i++) {
      oData[fieldData[i]] = data[fieldData[i]];
    }
    oData["type"] = accountType;
    return oData;
  }

  const onCheckOtp = async (data: formType) => {
    const otpData = getOtpBody(data);

    try {
      const response = await postData(
        `${formData.endpoint.sendOtp.url}`,
        otpData

        // {
        //   encData:
        //     "m1+dSlwabyf+VUBXbfkUyb6b6LUuhOd6+4cLFVCVywWboHd3VtRisa5YSMnpVWXtnsUGkOZ+PULkZQcNYUTP0thGpFNydLJJerhh7GdMh2IvN6pZaFMsAuXuv57LJ7BO00pqAyHQNBr6yq2nQIcBdquasklK8UnlqFPhaw==.6Q2kN+g8LyHHdObp",
        //   aesKey:
        //     "SutvdE8ww8AN7YyVKzqGPY0RZsQQzimKJdVKBnUfDwTxkzUXizlOf4jnIzroCg3MAVedWdg32Yh5/T1G0pZvPDVXx0Flp/MOPGNkwLJMdSWNaZnH/kbXJ2Zsm2GjFmiwnPTy/86nxh0PM5Yysx3N8r+aZeIQh/TI2Vsn48NEoN02IhjnWCkqh6IPTJeV1VkyMkE60bOCJ7EsL1yYzI0/GwGgr80mJc2hVL8ZvEa5Z3wifmIaf0U+/3WLyV3YPKF7uw0ZB+U7VeBiBRu7R24c4x0rXri4PyqVjeU6NihB6xl9l1tvzPtDSma3vccPBAmNUCmGyIF7ze6aGGEy3fGDNw==",
        // }
      );
      console.log(response);
      if (response.succeeded) {
        setTimer(response.data.timeLeft);
        setOpenAlert(true);
        setErrorsApi((prev) => ({
          ...prev,
          accountError: false,
        }));
      } else {
        if (
          +response.result === ResponseCodes.ALREADY_SEND_DATA_FOR_VERIFICATIONS
        ) {
          toast.error(t("messages.requestAlreadySent"));
        } else {
          toast.error(t("messages.accountNotFound"));
          setStep(1);
          setErrorsApi((prev) => ({
            ...prev,
            accountError: true,
          }));
        }
      }
    } catch (error) {
      console.error(t("messages.requestFailed"), error);
      toast.error(t("messages.serverConnectionFailed"));
    }
  };

  const onSubmit = async (data: formType) => {
    try {
      const otpWithData = { ...data, otpCode: otp };
      const response = await postData(
        `${formData.endpoint.verificationAccount.url}`,
        otpWithData
      );
      console.log(response);
      if (response.succeeded) {
        toast.success(t("messages.requestSentSuccessfully"));
        setOpenAlert(false);
        setOtp("");
      } else {
        if (+response.result === ResponseCodes.OTP_IS_INVALID) {
          setErrorsApi((prev) => ({
            ...prev,
            otpError: true,
          }));
        } else {
          toast.error(t("messages.unexpectedError"));
        }
      }
    } catch (error) {
      console.error(t("messages.requestFailed"), error);
      toast.error(t("messages.serverConnectionFailed"));
    }
  };

  const resizeFile = (file: File): Promise<string> =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        3000, // العرض
        3000, // الارتفاع
        "JPEG", // الصيغة
        100, // الجودة
        0, // التدوير
        (uri) => {
          resolve(uri as string);
        },
        "base64"
      );
    });

  const onChangeFile = async (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return; // التحقق من وجود الملف
      const image = await resizeFile(file);
      setValue(fieldName as keyof formType, image); // تحديث قيمة `useForm` بالحقل المناسب
      setFileNames((prev) => ({
        ...prev,
        [fieldName]: file.name,
      }));
    } catch (err) {
      console.log(err);
    }
  };

  // تحديد الصورة بناءً على اللغة والثيم
  const [currentTheme, setCurrentTheme] = useState<string | undefined>();

  useEffect(() => {
    setCurrentTheme(resolvedTheme); // تحديث الثيم بعد التحميل
  }, [resolvedTheme]);

  const getImageSrc = () => {
    if (locale === Languages.ARABIC) {
      return currentTheme === "dark" ? imgDarkAr : imgLightAr;
    } else {
      return currentTheme === "dark" ? imgDarkEn : imgLightEn;
    }
  };

  return (
    <div
      className="mx-auto pt-5 lg:bg-none  bg-cover bg-center bg-[url(../assets/images/verification-bg.svg)] "
      dir={setDirctionReverse(locale)}
    >
      <div className="container mx-auto ">
        <PathLine
          pagename={t(`verification.categories.${accountType}.name`)}
          backname={t("verification.title")}
        />
        <OtpAlertDialog
          open={openalert}
          setOpen={setOpenAlert}
          setOtp={setOtp}
          otp={otp}
          timer={timer}
          setTimer={setTimer}
          sure={handleSubmit(onSubmit)}
          resend_otp={handleSubmit(onCheckOtp)}
          otpError={errorsApi.otpError}
          classNameExtra={`${
            errorsApi.otpError && "border !border-destructive"
          } `}
        />
        <div className="mx-auto px-6 lg:pl-16 lg:pr-0 flex flex-col lg:flex-row items-center justify-between">
          {/* الصورة على اليسار */}
          <div className="hidden lg:block lg:w-1/2">
            <Image
              src={getImageSrc()}
              alt="توثيق الحساب"
              width={600}
              height={600}
              className="max-w-full h-auto"
            />
          </div>
          {/* الفورم على اليمين */}
          <div className="lg:w-1/3 md:p-8 md:ps-0 py-8 px-2">
            <form onSubmit={handleSubmit(onCheckOtp, onError)}>
              {Object.keys(formData.fields).length > 0 ? (
                <>
                  {/* القسم الأول */}
                  {step === 1 && (
                    <div>
                      {formData.fields.email && (
                        <div className="mb-4">
                          <InputField<formType>
                            {...formData.fields.email}
                            register={register}
                            error={errors?.email}
                            classNameExtra={`${
                              errorsApi.accountError && "!border-destructive "
                            }`}
                          />
                        </div>
                      )}
                      {formData.fields.accountNumber && (
                        <div className="mb-4">
                          <InputField<formType>
                            {...formData.fields.accountNumber}
                            register={register}
                            error={errors?.accountNumber}
                            classNameExtra={`${
                              errorsApi.accountError && "!border-destructive "
                            }`}
                          />
                        </div>
                      )}
                      {formData.fields.userName && (
                        <div className="mb-4">
                          <InputField<formType>
                            {...formData.fields.userName}
                            register={register}
                            error={errors?.userName}
                            classNameExtra={`${
                              errorsApi.accountError && "!border-destructive "
                            }`}
                          />
                        </div>
                      )}
                      {formData.fields.phoneNumber && (
                        <div className="mb-4">
                          <InputField<formType>
                            {...formData.fields.phoneNumber}
                            register={register}
                            error={errors?.phoneNumber}
                            classNameExtra={`${
                              errorsApi.accountError && "!border-destructive "
                            }`}
                          />
                        </div>
                      )}
                      {formData.fields.taxNumber && (
                        <div className="mb-4">
                          <InputField<formType>
                            {...formData.fields.taxNumber}
                            register={register}
                            error={errors?.taxNumber}
                          />
                        </div>
                      )}
                      {formData.fields.summary && (
                        <div className="mb-4">
                          <InputField<formType>
                            {...formData.fields.summary}
                            register={register}
                            error={errors?.summary}
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {step === 2 && (
                    <div dir="auto">
                      {formData.fields.commercialRegisterPhoto && (
                        <div className="mb-4">
                          <label className="block mb-1 text-sm font-medium text-foreground">
                            {formData.fields.commercialRegisterPhoto.label}
                          </label>
                          <FilleField<formType>
                            {...formData.fields.commercialRegisterPhoto}
                            register={register}
                            onchangeFile={onChangeFile}
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            error={(errors as any)?.commercialRegisterPhoto}
                            fileName={fileNames.commercialRegisterPhoto}
                          />
                        </div>
                      )}
                      {formData.fields.licensePhoto && (
                        <div className="mb-4">
                          <label className="block mb-1 text-sm font-medium text-foreground ">
                            {formData.fields.licensePhoto.label}
                          </label>
                          <FilleField<formType>
                            {...formData.fields.licensePhoto}
                            register={register}
                            onchangeFile={onChangeFile}
                            error={errors.licensePhoto}
                            fileName={fileNames.licensePhoto}
                          />
                        </div>
                      )}
                      {formData.fields.physicalAddressImage && (
                        <div className="mb-4">
                          <label className="block mb-1 text-sm font-medium text-foreground ">
                            {formData.fields.physicalAddressImage.label}
                          </label>
                          <FilleField<formType>
                            {...formData.fields.physicalAddressImage}
                            register={register}
                            onchangeFile={onChangeFile}
                            error={errors.physicalAddressImage}
                            fileName={fileNames.physicalAddressImage}
                          />
                        </div>
                      )}
                      {formData.fields.ownerIdentityImageFS && (
                        <div className="mb-4">
                          <label className="block mb-1 text-sm font-medium text-foreground ">
                            {formData.fields.ownerIdentityImageFS.label}
                          </label>
                          <FilleField<formType>
                            {...formData.fields.ownerIdentityImageFS}
                            register={register}
                            onchangeFile={onChangeFile}
                            error={errors.ownerIdentityImageFS}
                            fileName={fileNames.ownerIdentityImageFS}
                          />
                          <div className="flex flex-col mt-2">
                            {formData.fields.ownerIdentityImageBS && (
                              <FilleField<formType>
                                {...formData.fields.ownerIdentityImageBS}
                                register={register}
                                onchangeFile={onChangeFile}
                                error={errors.ownerIdentityImageBS}
                                fileName={fileNames.ownerIdentityImageBS}
                              />
                            )}
                          </div>
                        </div>
                      )}
                      {formData.fields.commissionerIdentityImageFS && (
                        <div className="mb-4">
                          <label className="block mb-1 text-sm font-medium text-foreground">
                            {formData.fields.commissionerIdentityImageFS.label}
                          </label>
                          <div className="flex flex-col  gap-2">
                            <FilleField<formType>
                              {...formData.fields.commissionerIdentityImageFS}
                              register={register}
                              onchangeFile={onChangeFile}
                              error={errors.commissionerIdentityImageFS}
                              fileName={fileNames.commissionerIdentityImageFS}
                            />
                            {formData.fields.commissionerIdentityImageBS && (
                              <FilleField<formType>
                                {...formData.fields.commissionerIdentityImageBS}
                                register={register}
                                onchangeFile={onChangeFile}
                                error={errors.commissionerIdentityImageBS}
                                fileName={fileNames.commissionerIdentityImageBS}
                              />
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex justify-between">
                    {step === 2 && (
                      <Button
                        className=" mt-3 font-semibold  bg-inherit border-none shadow-none text-primary hover:bg-btn_Hover "
                        type="submit"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? <Spinner /> : t("forms.Confirm")}
                      </Button>
                    )}
                    {step === 1 ? (
                      <span
                        className={`w-16 h-9 inline-flex mt-3 py-2 px-4 font-semibold text-md bg-inherit border-none shadow-none text-primary rounded-md white justify-center items-center cursor-pointer ${
                          isNextHovered ? "hover:bg-btn_Hover" : ""
                        }`}
                        onClick={() => handleStepChange(2)} // عند النقر على "التالي"
                        onMouseEnter={() => setIsNextHovered(true)} // تفعيل hover لزر التالي
                        onMouseLeave={() => setIsNextHovered(false)} // إلغاء hover لزر التالي
                        onTouchStart={() => setIsNextHovered(false)} // عند اللمس على الموبايل
                      >
                        {t("forms.next")}
                      </span>
                    ) : (
                      <span
                        className={`w-16 h-9 inline-flex mt-3 py-2 px-4 font-semibold text-md bg-inherit border-none shadow-none text-primary rounded-md white justify-center items-center cursor-pointer ${
                          isBackHovered ? "hover:bg-btn_Hover" : ""
                        }`}
                        onClick={() => handleStepChange(1)} // عند النقر على "العودة"
                        onMouseEnter={() => setIsBackHovered(true)} // تفعيل hover لزر العودة
                        onMouseLeave={() => setIsBackHovered(false)} // إلغاء hover لزر العودة
                        onTouchStart={() => setIsBackHovered(false)} // عند اللمس على الموبايل
                      >
                        {t("forms.back")}
                      </span>
                    )}
                  </div>
                </>
              ) : (
                <p>لا توجد بيانات لعرضها.</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;
