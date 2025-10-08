import React from "react";
import * as LucideIcons from "lucide-react";

type LucideIconName = keyof typeof LucideIcons;

type Props = {
  iconName: LucideIconName;
  size?: number;
  color?: string;
  className?: string;
};

const LuIcon = ({
  iconName,
  size = 20,
  color = "currentColor",
  className = "",
}: Props) => {
  const Icon =
    (LucideIcons[iconName] as React.FC<{
      size?: number;
      color?: string;
      className?: string;
    }>) || LucideIcons.HelpCircle;

  return <Icon size={size} color={color} className={className} />;
};

export default LuIcon;
