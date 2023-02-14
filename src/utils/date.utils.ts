export const getDeliveredDate = (apiDate: string) => `${apiDate.split("-")[2].slice(0,2)}.${apiDate.split("-")[1]}`


export const getMonthByNumber = (month: string) => {
    switch (month){
        case '0':
            return 'Январ';
            break;
        case '1': 
            return 'Феврал'
            break;
        case '2':
            return 'Март'
            break;
        case '3': 
            return 'Апрел'
            break;
        case '4':
            return 'Ма'
            break;
        case '5':
            return 'Июн';
            break;
        case '6':
            return 'Июл'
            break;
        case '7':
            return 'Август';
            break;
        case '8':
            return 'Сентябр'
            break;
        case '9': 
            return 'Октябр';
            break;
        case '10':
            return 'Ноябр'
        default:
            return 'Декабр'
            break;
    }
}

export const getCommentDate = (apiDate: string) => {
    const [year, month, day] = new Date('2023-01-22T13:13:11.484Z').toLocaleDateString().split(".")
    return `${day.slice(0,2)} ${getMonthByNumber(month[0] === '0' ? month[1] : month)}я ${year}`;
}