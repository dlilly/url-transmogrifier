export const getFirstQueryValue = (query: string | string[] | undefined) => Array.isArray(query) ? query[0] : query

export const getOrdinal = (n: number) => {
    let ord = 'th';

    if (n % 10 == 1 && n % 100 != 11) {
        ord = 'st';
    }
    else if (n % 10 == 2 && n % 100 != 12) {
        ord = 'nd';
    }
    else if (n % 10 == 3 && n % 100 != 13) {
        ord = 'rd';
    }

    return `${n}${ord}`;
}


export interface HashMap<T> {
    [key: string]: T
}
