import CryptoJS from 'crypto-js'

export interface CrypotoType {
  encrypt: any
  decrypt: any
}

// 默认的 KEY 与 iv 如果没有给
const KEY = CryptoJS.enc.Utf8.parse(import.meta.env.VITE_KEY)
const IV = CryptoJS.enc.Utf8.parse(import.meta.env.VITE_IV)

/**
 * AES加密 ：字符串 key iv  返回base64
 */
export function Encrypt(word: any, keyStr?: any, ivStr?: any) {
  let key = KEY
  let iv = IV
  if (keyStr) {
    key = CryptoJS.enc.Utf8.parse(keyStr)
    iv = CryptoJS.enc.Utf8.parse(ivStr)
  }
  const srcs = CryptoJS.enc.Utf8.parse(word)
  const encrypted = CryptoJS.AES.encrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding
  })
  return CryptoJS.enc.Base64.stringify(encrypted.ciphertext)
}

/**
 * AES 解密 ：字符串 key iv  返回base64
 *
 * @return {string}
 */
export function Decrypt(word: any, keyStr?: any, ivStr?: any) {
  let key = KEY
  let iv = IV

  if (keyStr) {
    key = CryptoJS.enc.Utf8.parse(keyStr)
    iv = CryptoJS.enc.Utf8.parse(ivStr)
  }

  const base64 = CryptoJS.enc.Base64.parse(word)
  const src = CryptoJS.enc.Base64.stringify(base64)

  const decrypt = CryptoJS.AES.decrypt(src, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding
  })

  return CryptoJS.enc.Utf8.stringify(decrypt)
}