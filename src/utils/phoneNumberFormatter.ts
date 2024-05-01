export const formatPhoneNumber = (value: string): string => {
    if (!value) return value

    const phoneNumber = value.replace(/\D/g, '')
    const phoneNumberLength = phoneNumber.length
    if (phoneNumberLength === 0) return ''

    if (phoneNumberLength <= 3) {
        return `(+${phoneNumber}`
    } else if (phoneNumberLength <= 6) {
        return `(+${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`
    } else if (phoneNumberLength <= 8) {
        return `(+${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
            3,
            6
        )}-${phoneNumber.slice(6)}`
    } else if (phoneNumberLength <= 10) {
        return `(+${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
            3,
            6
        )}-${phoneNumber.slice(6, 8)}-${phoneNumber.slice(8, 10)}`
    } else {
        return `(+${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
            3,
            6
        )}-${phoneNumber.slice(6, 8)}-${phoneNumber.slice(
            8,
            10
        )}-${phoneNumber.slice(10, 12)}`
    }
}

export const phoneNumberToNumber = (value: any) => {
    const numericString = value.replace(/\D/g, '')

    return numericString
}
