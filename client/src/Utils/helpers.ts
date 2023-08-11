export function checkString(substring: string, str: string): boolean {
  if (!substring) {
    return false;
  }
  for (let i = 0; i < substring.length; i++) {
    if (i + 1 === str.length) {
      return false;
    }
    if (substring[i].toLowerCase() !== str[i].toLowerCase()) {
      return false;
    }
  }

  return true;
}
export function cutString(text: string, num: number): string {
  if (text.length > num) return text.slice(0, num) + "...";
  else return text;
}
export function paginate<T>(
  items: T[],
  pageNumber: number,
  pageSize: number
): T[] {
  const startIndex = (pageNumber - 1) * pageSize;
  return [...items].splice(startIndex, pageSize);
}
