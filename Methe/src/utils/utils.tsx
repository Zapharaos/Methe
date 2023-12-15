export const findValueByKey = (list: {key:string, value:string}[], key: string) : string => {
    const item = list.find(item => item.key === key);
    return item ? item.value : '';
}

/**
 * Utils class to work on string
 */
export class StringUtils {

    /**
     * Has de some effect than string.format in C#
     * @param template the string with some {number}
     * @param args value to insert in the template
     */
    public static format = (template: string, ...args: any[]) => {
        return template.replace(/{(\d+)}/g, (match, index) => (args[index] !== undefined ? args[index] : match));
    };

    /**
     * Return true if the string is null or whitespace
     * @param str the string to test
     */
    public static isNullOrWhitespace = (str: string | null | undefined): boolean => {
        return str == null || str.trim() === '';
    };

    /**
     * Return true if the string is in a fraction format
     * @param str the string to test
     */
    public static isFractionFormat = (str: string) => {
        const pattern = /^\d+\/\d+$/;
        return pattern.test(str);
    }
}

/**
 * Utils class to work on numbers
 */
export class MathUtils {
    public static gcd = (a: number, b: number): number => {
        if (b === 0) {
            return a;
        } else {
            return MathUtils.gcd(b, a % b);
        }
    };

}