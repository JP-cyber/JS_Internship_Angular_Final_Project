import { FormControl } from "@angular/forms";

export class MyValidators {

    static email: string = '';
    static userName: string = '';

    static emailValidation(control: FormControl):{[key: string]: boolean} {
        const errObj = {
        };

        const isValid = /((\w+\.){1,2}\w+|\w+)@\w{1,5}\.(co|com|net|org|us)$/gm.test(control.value);
        
        if(!isValid){
            errObj['invalidMail'] = true;
            return errObj;
        }

        MyValidators.email = control.value;

        return errObj;
    }

    static passwordValidation(control: FormControl):{[key: string]: boolean} {
        let errObj = {};

        const isInvalid = !/[A-Z]/g.test(control.value) || !/[0-9]/g.test(control.value)
        || !/[$%.&!-]/g.test(control.value);

        if(isInvalid){
            errObj['invalidPassword'] = true;
        }
        errObj = MyValidators.passwordEmailPartsValidation(control.value, errObj);
        errObj = MyValidators.passwordUserNamePartsValidation(control.value, errObj);

        return errObj;
    }

    static passwordEmailPartsValidation(password: string, errObj: {}):{[key: string]: boolean}  {
        const email = MyValidators.email;
        const reg = /((\w+\.){1,2}\w+|\w+)@/g;

        if(email && password){
            const emailParts = email.match(reg)[0].slice(0, -1).split('.');
            emailParts.forEach(p => {
                if(password.includes(p)){
                    errObj['invalidPassword'] = true;
                }
            });
        }

        return errObj;
    }

    static passwordUserNamePartsValidation(password: string, errObj: {}):{[key: string]: boolean} {
        const userName = MyValidators.userName;

        if(userName && password) {
            if(!userName.includes('-')){
                const userNameParts = userName.replace(/([a-z0-9])([A-Z])/g, '$1 $2').split(' ');
                userNameParts.forEach(p => {
                    if( password.includes(p) ){
                        errObj['invalidPassword'] = true;
                    }
                });
            }else{
                const kebabCaseParts = userName.replace(/-/g, ' ').split(' ');
                kebabCaseParts.forEach(p => {
                    if( password.includes(p) ){
                        errObj['invalidPassword'] = true;
                    }
                });
            } 

        }

        return errObj;
    }

    static userNameValidation(control: FormControl):{[key: string]: boolean} {
        const errObj = {};
        const isValid = /(^[a-z]+[A-Z][a-z]+$|^[a-z]+-[a-z]+$|^[A-Z][a-z]+[A-z][a-z]+$)/g
        .test(control.value);

        if(!isValid){
            errObj['invalidUserName'] = true;
            return errObj;
        }

        MyValidators.userName = control.value;
        return errObj;
    }

    static heroValidation(control: FormControl):{[key: string]: boolean} {
        const regExp = /^[a-z]+$/g;

        if( !regExp.test(control.value) ){
            return {
                '[invalidInput]': true
            }
        }
        return null;
    }
}