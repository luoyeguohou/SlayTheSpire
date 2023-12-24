import CryptoES from "crypto-es";

const key: string = "ch2346CatTacHseC"

export const encryptAES = (encrypted: string) => {
    return CryptoES.AES.encrypt(
        encrypted, CryptoES.enc.Utf8.parse(key),
        {
            mode: CryptoES.mode.ECB,
            padding: CryptoES.pad.Pkcs7
        }
    ).toString();
}

export const decryptAES = (decrypted: string) => {
    return CryptoES.AES.decrypt(
        decrypted, CryptoES.enc.Utf8.parse(key),
        {
            mode: CryptoES.mode.ECB,
            padding: CryptoES.pad.Pkcs7
        }
    ).toString(CryptoES.enc.Utf8);
}

