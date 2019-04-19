export default function (data = {}) {
    return !Object.values(data).some(item => !item.isValid)
}
