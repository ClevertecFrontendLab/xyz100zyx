import {
    ERROR_ALL,
    ERROR_CAPITAL,
    ERROR_CAPITAL_NUMBER,
    ERROR_LENGTH,
    ERROR_LENGTH_CAPITAL, ERROR_LENGTH_NUMBER,
    ERROR_NUMBER
} from "./errors";


export const getRegisterPassErrorText = (value: string) => {
    let res;
    if(value?.length >= 8 && !value.match(new RegExp('(?=.*[А-ЯA-Z])', 'g')) && !value.match(new RegExp('(?=.*[0-9])'))){
        res =  ERROR_CAPITAL_NUMBER
    }else if(value?.length >= 8 && value.match(new RegExp('(?=.*[А-ЯA-Z])', 'g')) && !value.match(new RegExp('(?=.*[0-9])'))){
        res =  ERROR_NUMBER
    }else if(value?.length >= 8 && !value.match(new RegExp('(?=.*[А-ЯA-Z])', 'g')) && value.match(new RegExp('(?=.*[0-9])'))){
        res = ERROR_CAPITAL
    }else if (value?.length < 8 && value.match(new RegExp('(?=.*[А-ЯA-Z])', 'g')) && value.match(new RegExp('(?=.*[0-9])'))){
        res = ERROR_LENGTH
    }else if (value?.length < 8 && !value.match(new RegExp('(?=.*[А-ЯA-Z])', 'g')) && value.match(new RegExp('(?=.*[0-9])'))){
        res = ERROR_LENGTH_CAPITAL
    }else if(value?.length < 8 && value.match(new RegExp('(?=.*[А-ЯA-Z])', 'g')) && !value.match(new RegExp('(?=.*[0-9])'))){
        res = ERROR_LENGTH_NUMBER
    }
    else if(value?.length >= 8 && value.match(new RegExp('(?=.*[А-ЯA-Z])', 'g')) && value.match(new RegExp('(?=.*[0-9])'))){
        res = ''
    }
    else{
        res = ERROR_ALL
    }
    return res;
}


