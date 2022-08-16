import dayjs from "dayjs";

export const getSignMessage = (address: string) => {
    let service = "https://npics.xyz/terms"
    service = "https://npics.gitbook.io/npics-v1.0/resources/terms-of-service"
    let date = dayjs().format('YYYY/M/D HH:mm:ss')

    return `Welcome to NPics!

Please sign to let us verify that you are the owner of this address: ${address}

This sign will not cost you any gas fees.

By signing you accept the NPics Terms of Service: ${service}

[${date}]`
}
