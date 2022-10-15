const isEmailValid = (emailToCheck: string) => {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(emailToCheck);
}

const isFieldFilled = (fieldToCheck: string) =>{
    return fieldToCheck.trim().length > 0;
}

export {
    isEmailValid,
    isFieldFilled
}