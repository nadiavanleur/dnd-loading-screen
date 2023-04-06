import React from 'react';
import hints from '../../../static/data/hints.json';
import * as style from './style.module.scss';

type Hint = {
  label: string
}

type Props = {
  randomHint: number | null
}

export const generateRandomHint = () => Math.floor(Math.random() * hints.length);

const Hints = ({ randomHint }: Props) => {
  return (
    <ul className={style.hints}>
      {hints.map((hint: Hint, n: number) => (
        <li key={n} className={`${style.hint} ${randomHint === n ? style.active : ''}`}>
          {hint.label}
        </li>
      ))}
    </ul>
  );
}

export default Hints;