import React from "react";
import { Link } from "react-router-dom";
import logoImg from "images/msk-logo.svg";
import logoLightImg from "images/logo-light.png";
import LogoSvg from "./LogoSvg";

export interface LogoProps {
  img?: string;
  imgLight?: string;
}

const Logo: React.FC<LogoProps> = ({
  img = logoImg,
  imgLight = logoLightImg,
}) => {
  return (
    <Link to="/" className="ttnc-logo inline-block text-primary-6000">
      <img src={img} width="100" />
    </Link>
  );
};

export default Logo;
