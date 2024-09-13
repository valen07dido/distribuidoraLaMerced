import CryptoJS from "crypto-js";
const KEY = import.meta.env.VITE_SECRET_KEY;

const getDecryptedData = (key) => {
  const encryptedData = localStorage.getItem(key);
  if (!encryptedData) return null;

  const bytes = CryptoJS.AES.decrypt(encryptedData, KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

export default getDecryptedData;
