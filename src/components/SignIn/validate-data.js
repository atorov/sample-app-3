export default function (data = {}) {
    // TODO: Implement a real email validation
    const email = {
        isValid: true,
        message: '',
    }
    if (!data.email && data.password) {
        email.isValid = false
        email.message = 'Email is a required field'
    }

    // TODO: Implement a real password validation
    const password = {
        isValid: true,
        message: '',
    }
    if (!data.password && data.email) {
        password.isValid = false
        password.message = 'Password is a required field'
    }

    const required = {
        isValid: true,
    }
    if (!data.email || !data.password) {
        required.isValid = false
    }

    return {
        email,
        password,
        required,
    }
}
