export function isASCII(str: string) {
    return /^[\x20-\x7F]*$/.test(str);
}

export function getUsernameError(uname: string): string | null {
    if (!isASCII(uname)) return "Illegal characters in username.";

    let strippedUname = uname.trim();
    if (strippedUname.length === 0) 
        return "Username cannot be empty.";
    
    // 6 digits with or withour curric\ prefixing them
    const usernameRegex = /^((CURRIC|curric)\\)?\d\d\d\d\d\d$/;

    if (!usernameRegex.test(strippedUname))
        return "Username must be a six-digit ID number, with or without \"CURRIC\\\" at start.";

    return null;
}

export function getPasswordError(pass: string): string | null {
    if (pass.length === 0) return "Password cannot be empty.";
    return null;
}