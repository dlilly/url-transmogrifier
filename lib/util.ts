export const getFirstQueryValue = (query: string | string[] | undefined) => Array.isArray(query) ? query[0] : query