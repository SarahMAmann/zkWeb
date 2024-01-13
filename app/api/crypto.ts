import { createHash } from "node:crypto";

export function get14DigitHashFromString(str: string) {
  // Use SHA-256 for a more secure and longer hash
  const hashString = createHash("sha256").update(str).digest("hex");

  // Take a portion of the hash; here, we're using 14 hex digits (to be converted to a BigInt)
  const substring = hashString.substr(0, 14);

  // Convert the substring to a BigInt
  const num = BigInt("0x" + substring);

  // Since we're working with 14 hex digits, the maximum number would be 16^14
  // To ensure a 14-digit decimal limit, use a modulus with 10^14
  const result = num % BigInt("10000000000000"); // 10^14

  // Convert the result to a string
  return result.toString().padStart(14, "0");
}
