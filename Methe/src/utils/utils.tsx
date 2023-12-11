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

    public static isNullOrWhitespace = (str: string | null | undefined): boolean => {
        return str == null || str.trim() === '';
    };
}
