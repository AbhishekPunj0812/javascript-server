export function validateEmail(email: string) {
    const pattern = /^([a-zA-Z0-9\.-]+)@(successive).(tech)$/;
    if (pattern.test(email)) {
    return true;
    }
    else {
    return false;
    }
}