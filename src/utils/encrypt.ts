import aesjs from "aes-js";

export const encryptText = (text: string, key: number[]) => {
  // Convert text to bytes
  const textBytes = aesjs.utils.utf8.toBytes(text);
  // The counter is optional, and if omitted will begin at 1
  const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
  const encryptedBytes = aesCtr.encrypt(textBytes);

  // To print or store the binary data, you may convert it to hex
  const encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
  return encryptedHex;
};

export const decryptText = (encryptedHex: string, key: number[]) => {
  // When ready to decrypt the hex string, convert it back to bytes
  const encryptedBytes = aesjs.utils.hex.toBytes(encryptedHex);

  // The counter mode of operation maintains internal state, so to
  // decrypt a new instance must be instantiated.
  const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
  const decryptedBytes = aesCtr.decrypt(encryptedBytes);

  // Convert our bytes back into text
  const decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
  return decryptedText;
};
