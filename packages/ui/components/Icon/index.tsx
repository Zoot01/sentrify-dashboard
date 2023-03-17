import * as MUIcon from "@mui/icons-material";
import { CSSProperties } from "react";

interface IconProps {
  icon: keyof typeof MUIcon;
  style?: CSSProperties;
}
const Icon: React.FC<IconProps> = ({ icon, style }: IconProps) => {
  const Icon = MUIcon[icon];
  return <Icon style={{ ...style }} />;
};

export default Icon;
