export default function trim(str: string, chars: string = ''): string {
    const pattern = `^[${chars}]+|[${chars}]+$`;
    const regex = new RegExp(pattern, 'g');
    return str.replace(regex, '');
}
