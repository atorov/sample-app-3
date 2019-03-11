export default function (
    obj = {},
    path = '',
    defaultValue,
) {
    return path.split('.').reduce((out, key) => (out ? out[key] : undefined), obj) || defaultValue;
}
