export default function () {
    let saved = {}
    try {
        const serialized = window.sessionStorage.getItem('sampleApp3Auth')
        if (serialized) {
            saved = JSON.parse(serialized)
        }
    }
    catch (reason) {
        console.error('::: reason:', reason)
    }

    return saved
}
