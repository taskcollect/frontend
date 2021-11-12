// return a string in Title case
// eg. mystring -> Mystring
export function capitalize(s: string): string {
    if (s.length <= 1) return s.toUpperCase();
    return s.charAt(0).toUpperCase() + s.substring(1);
}

export function padNumber(num: number, size: number): string {
    let s = num.toString();
    while (s.length < size) s = "0" + s;
    return s;
}

export function shorten(input: string, max: number): string {
    if (input.length <= max) return input;
    return input.substring(0, max - 3) + "...";
}

const e = { capitalize, padNumber };
export default e;
