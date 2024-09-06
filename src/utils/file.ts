async function GetBase64<T>(files: T): Promise<T> {
    if (_.isArray(files)) {
        const selectedFiles = files.map((fileItem: any) => {
            return new Promise((resolve) => {
                const reader = new FileReader()
                reader.readAsDataURL(fileItem)
                reader.onloadend = function () {
                    const result = {
                        Type: fileItem.type,
                        Name: fileItem.name,
                        Base64: reader.result,
                        Size: fileItem.size,
                    }
                    resolve(result)
                }
            })
        })
        return Promise.all(selectedFiles) as Promise<T>
    }
    else {
        const fileItem = files as File
        return new Promise((resolve) => {
            const reader = new FileReader()
            reader.readAsDataURL(fileItem)
            reader.onloadend = function () {
                const result = {
                    Type: fileItem.type,
                    Name: fileItem.name,
                    Base64: reader.result,
                    Size: fileItem.size,
                }
                resolve(result as T)
            }
        }) as Promise<T>
    }
}

export const _file = {
    GetBase64,
}
