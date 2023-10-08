export default function queryStringify(data: StringIndexed = {}, parentKey?: string): string {
    if (typeof data !== 'object' || data === null) {
        throw new Error('input must be an object');
    }

    const params: string[] = [];

    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const value = data[key];

            const paramKey = parentKey ? `${parentKey}[${key}]` : key;

            if (Array.isArray(value)) {
                value.forEach((item: any, index: number) => {
                    params.push(`${paramKey}[${index}]=${encodeURIComponent(item)}`);
                });
            } else if (typeof value === 'object' && value !== null) {
                const nestedParams = queryStringify(value, paramKey);
                if (nestedParams !== '') {
                    params.push(nestedParams);
                }
            } else {
                params.push(`${paramKey}=${value}`);
            }
        }
    }

    return params.length > 0 ? `?${params.join('&')}` : '';
}
