import React from "react";
import { Link } from "react-router-dom";
import logoImg from "/images/msk-logo.svg";
import logoLightImg from "/images/logo-light.png";

export interface LogoProps {
  img?: string;
  imgLight?: string;
  isOnBlog: boolean;
  isOnArchive: boolean;
}

const Logo: React.FC<LogoProps> = ({
  img = logoImg,
  isOnBlog,
  isOnArchive,
  imgLight = logoLightImg,
}) => {
  return (
    <Link
      to={(isOnBlog || isOnArchive) ? "/blog" : "/"}
      className="ttnc-logo inline-block text-primary-6000"
    >
      <img src={img} width="100" />
    </Link>
  );
};

export default Logo;
