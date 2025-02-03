import React, { FC } from 'react';
import { ReactComponent as DnDLogoIcon } from '../../assets/icons/DnD-Symbol.svg';
import { ReactComponent as PauseIcon } from '../../assets/icons/pause.svg';
import { ReactComponent as PlayIcon } from '../../assets/icons/play.svg';

type Props = {
  icon: keyof typeof ICONS,
  className?: string,
  width?: number,
  height?: number,
}

const ICONS: { [key: string]: FC<React.SVGProps<SVGSVGElement>> } = {
  placeholder: DnDLogoIcon,
  logo: DnDLogoIcon,
  pause: PauseIcon,
  play: PlayIcon,
} as const;

const Icon = ({ icon, className, width, height }: Props) => {
  const SelectedIcon = ICONS[icon];

  return <SelectedIcon className={className} width={width} height={height} />
}

export default Icon;