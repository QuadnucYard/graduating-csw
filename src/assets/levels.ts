import dayjs from "dayjs";

import { decryptText } from "@/utils/encrypt";

import levelData from "./level.json";
import settingData from "./settings.json";

const key = (() => {
  const y = dayjs().year();
  const a = [(y % 10) - 2, y % 4, (y % 20) - 2, y % 10];
  const k = [...a, ...a, ...a, ...a];
  k[3] -= 3;
  k[7] -= 2;
  k[11] -= 1;
  return k;
})();

type ValueOf<T> = T[keyof T];

function mapObject<T extends object, R>(obj: T, f: (x: ValueOf<T>) => R): { [K in keyof T]: R } {
  return Object.fromEntries(
    Object.entries(obj).map((e) => {
      const [k, v] = e;
      return [k, f(v)];
    })
  ) as { [K in keyof T]: R };
}

// const levels = mapObject(levelData, (a) => mapObject(a, (b) => decryptText(b, key)));
const levels = {
  1: mapObject(levelData[1], (b) => decryptText(b, key)),
  2: mapObject(levelData[2], (b) => decryptText(b, key)),
  3: mapObject(levelData[3], (b) => decryptText(b, key)),
  4: mapObject(levelData[4], (b) => decryptText(b, key)),
};

export const goals: {
  title: string;
  content: string;
  achievement: string | null;
  icon: string;
}[] = JSON.parse(levels[4].goal);

export const settings: {
  levelNum: number;
  level2: { pwd: string };
  level3: { doors: number; trueDoor: number; pwd: string };
} = JSON.parse(decryptText(settingData, key));

export default levels;
