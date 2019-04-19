export default function (data) {
    try {
        const serialized = JSON.stringify(data)
        window.sessionStorage.setItem('sampleApp3Auth', serialized)
        console.log('::: >>> Auth state has been saved to the session storage')
    }
    catch (reason) {
        console.error('::: reason:', reason)
    }
}
