"use client";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { useState } from "react";

const LanguageSwitcher = () => {
  const pathname = usePathname();
  const locale = useLocale();

  const [loading, setLoading] = useState(false);

  const toggleLanguage = () => {
    setLoading(true);
    const newLocale = locale === "ar" ? "en" : "ar";
    const newPathUrl = `/${newLocale}${pathname.replace(/^\/(ar|en)/, "")}`;
    window.location.replace(newPathUrl);
  };

  return (
    <>
      {/* Spinner تظهر عند التبديل بين اللغات */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-lg h-dvh ">
          <div className="animate-spin rounded-full h-16 w-16 spinner"></div>
        </div>
      )}

      <button
        onClick={toggleLanguage}
        className="cursor-pointer hover:text-primary md:block"
        disabled={loading}
      >
        {locale === "ar" ? "English" : "العربية"}
      </button>
    </>
  );
};

export default LanguageSwitcher;
