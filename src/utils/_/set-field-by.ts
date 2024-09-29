type Primitive = string | number | boolean | null | undefined

type Paths<T> = T extends Primitive
    ? never
    : {
            [K in keyof T & string]: T[K] extends object
                ? `${K}` | `${K}.${Paths<T[K]>}`
                : `${K}`;
        }[keyof T & string]

function _setFieldBy<T extends object, P extends Paths<T>>(
    data: T,
    fieldPath: P,
    value: any,
): T {
    const keys = fieldPath.split('.')
    let current: any = data

    for (let i = 0; i < keys.length - 1; i++) {
        if (current[keys[i]] === undefined) {
            current[keys[i]] = {}
        }
        current = current[keys[i]]
    }

    current[keys[keys.length - 1]] = value
    return data
}

// ตัวอย่างการใช้งาน:
// interface ProductData {
//     Product: {
//         id: string
//         files: {
//             id: string
//             name: string
//         }
//         details: {
//             category: {
//                 id: string
//                 name: string
//             }
//         }
//     }
// }

// const jsonData: ProductData = {
//   Product: {
//     id: "6a997062-9360-45d6-8c33-d4edce5c3265",
//     files: {
//       id: 'abc',
//       name: "Edison Leffler"
//     },
//     details: {
//       category: {
//         id: 'zzzzz',
//         name: "Electronics"
//       }
//     }
//   }
// };

// const updatedData = _setFieldBy(jsonData, "Product.details.category.name", "category updatedxx");
// console.log(updatedData.Product.details.category.name);

// const updatedData2 = _setFieldBy(jsonData, "Product.files.id", "files id updatedxx");
// console.log(updatedData2.Product.files.id);
