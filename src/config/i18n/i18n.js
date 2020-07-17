import I18n from 'react-native-i18n';

// Import all locales
import en from './locales/en';
import ar from './locales/ar';


// Should the app fallback to French if user locale doesn't exists
I18n.defaultLocale = "en";
I18n.fallbacks = true;


// Define the supported translations
I18n.translations = {ar, en};

export const currentLocale = I18n.currentLocale();
console.log("\n***********************\n******** " + currentLocale + " ********\n***********************");

// Is it a RTL language?
// export const isRTL = currentLocale.indexOf('fr') === 0;

// Allow RTL alignment in RTL languages
// ReactNative.I18nManager.allowRTL(isRTL);

// The method we'll use instead of a regular string
export function _(name, params = {}) {
    let string = I18n.t(name, params);
    return /\[missing/.test(string)? name : string;
};

export default I18n;