export const subjectText = str => {
    return str.length >=3 && str.length <=175
}

export const detailText = str => {
    return str.length >=3 && str.length <=1000
}