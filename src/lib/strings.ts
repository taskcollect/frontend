// return a string in Title case
// eg. mystring -> Mystring
export function capitalize(s: string): string {
    if (s.length <= 1) return s.toUpperCase()
    return s.charAt(0).toUpperCase() + s.substring(1)
}

export default { capitalize }