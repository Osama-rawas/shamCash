"use client";
import { SocialMedia as SocialMediaType } from "@/app/utils/types";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

interface SocialMediaFooterprops {
  socialMedia: SocialMediaType;
}

const SocialMediaFooter = ({ socialMedia }: SocialMediaFooterprops) => {
  const { theme } = useTheme();
  const [socialIcon, setSocialIcon] = useState(socialMedia.imgDark);
  const [socialIconHover, setSocialIconHover] = useState(
    socialMedia.imgDarkHover
  );

  function getSocialIcon() {
    if (theme === "dark") return socialMedia.imgDark;
    else return socialMedia.imgLight;
  }
  function getSocialIconHover() {
    if (theme === "dark") return socialMedia.imgDarkHover;
    else {
      return socialMedia.imgLightHover;
    }
  }
  useEffect(() => {
    setSocialIcon(getSocialIcon);
    setSocialIconHover(getSocialIconHover);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  return (
    <div className="group ">
      <Image
        src={socialIcon}
        alt="social icon"
        height={42}
        width={42}
        className="group-hover:hidden"
      />
      <Image
        src={socialIconHover}
        alt="social icon hover"
        height={42}
        width={42}
        className="hidden group-hover:block cursor-pointer"
      />
    </div>
  );
};

export default SocialMediaFooter;
