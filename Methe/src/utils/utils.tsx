export const findValueByKey = (list: {key:string, value:string}[], key: string) : string => {
    const item = list.find(item => item.key === key);
    return item ? item.value : '';
}
