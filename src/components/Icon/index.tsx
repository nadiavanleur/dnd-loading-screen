import React, { FC } from 'react';
import { ReactComponent as DnDLogoIcon } from '../../assets/icons/DnD-Symbol.svg';

type Props = {
  icon: keyof typeof ICONS,
  className?: string,
}

const ICONS: { [key: string]: FC<React.SVGProps<SVGSVGElement>> } = {
  placeholder: DnDLogoIcon,
  logo: DnDLogoIcon,
} as const;

const Icon = ({ icon, className }: Props) => {
  const SelectedIcon = ICONS[icon];

  return <SelectedIcon className={className} />
}

export default Icon;