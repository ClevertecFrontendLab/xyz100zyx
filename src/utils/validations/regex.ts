export const RegistrationRegExp = {
    PHONE : /^\+375 \((25|29|33|44)\) [0-9]{3}-[0-9]{2}-[0-9]{2}$/,
    EMAIL : /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-z\-0-9]+\.)+[a-z]{1,}))$/i,
    PASSWORD_ALL : new RegExp('(?=.*[0-9])(?=.*[A-Z]){8,}', 'g'),
    PASSWORD_CAPITAL : new RegExp('(?=.*[A-Z])', 'g'),
    PASSWORD_NUMBER : new RegExp('(?=.*[0-9])', 'g'),
    PASSWORD_CAPITAL_NUMBER : new RegExp('(?=.*[0-9])(?=.*[A-Z])', 'g'),
    USERNAME_ALPHABET : new RegExp('[a-zA-Z]+', 'g'),
    USERNAME_NUMBERS : new RegExp('[0-9]+', 'g'),
}
