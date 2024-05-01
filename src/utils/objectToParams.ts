export function ObjectToParams(data: any) {
    return Object.keys(data).map(key => `${key}=${encodeURIComponent(data[key])}`).join('&');
}