import { encryptText } from "../src/utils/encrypt";

// 128-bit key (16 bytes * 8 bits/byte = 128 bits)
const key = [2, 0, 2, 1, 2, 0, 2, 2, 2, 0, 2, 3, 2, 0, 2, 4];

const encryptFile = async (file: string) => {
  const text = await Bun.file(file).text();
  return encryptText(text, key);
};

const levels = {
  1: {
    body: await encryptFile("data/level-1-0.txt"),
    end_fake: await encryptFile("data/level-1-1.txt"),
    end_true: await encryptFile("data/level-1-2.txt"),
  },
  2: {
    pre: await encryptFile("data/level-2-0.txt"),
    body: await encryptFile("data/level-2-1.txt"),
  },
  3: {
    body: await encryptFile("data/level-3-0.txt"),
    fail: await encryptFile("data/level-3-1.txt"),
    succ: await encryptFile("data/level-3-2.txt"),
  },
  4: {
    pre: await encryptFile("data/level-4-0.txt"),
    goal: await encryptFile("data/level-4-goal.json"),
    bad: await encryptFile("data/level-4-1.txt"),
    happy: await encryptFile("data/level-4-2.txt"),
  },
};

const settings = await encryptFile("data/settings.json");

await Bun.write("src/assets/level.json", JSON.stringify(levels));
await Bun.write("src/assets/settings.json", JSON.stringify(settings));
