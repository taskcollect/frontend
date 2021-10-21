export function date2string(d: Date): string {
    var h = d.getHours();
    const m = d.getMinutes();
    // AM or PM?
    const ampm = h >= 12 ? "pm" : "am";
    // format to 12h time
    h = h % 12;
    // the hour '0' should be '12'
    h = h ? h : 12;
    // add 0 to minutes for <10 eg. 09 01 03
    const padded_m = m < 10 ? "0" + m : m.toString();

    return `${h}:${padded_m} ${ampm}`;
}
