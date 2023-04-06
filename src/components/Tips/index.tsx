import React from 'react';
import tips from '../../../static/data/tips.json';
import * as style from './style.module.scss';

type Tip = {
  label: string
}

type Props = {
  randomTip: number | null
}

export const generateRandomTip = () => Math.floor(Math.random() * tips.length);

const Tips = ({ randomTip }: Props) => {
  return (
    <ul className={style.tips}>
      {tips.map((tip: Tip, n: number) => (
        <li key={n} className={`${style.tip} ${randomTip === n ? style.active : ''}`}>
          {tip.label}
        </li>
      ))}
    </ul>
  );
}

export default Tips;