class Validation {
    static isString(payload) {
        return typeof payload === typeof "string"
    }

    static isNotEmptyString (payload) {
        if(payload && (typeof payload === typeof "string") ) {
            return true;
        } else {
            return false;
        }
    }

    static isAlphabet (payload) {
        const pattern = /^[a-zA-Z ]+$/;
        if(payload.match(pattern)) {
            return true;
        } else {
            return false;
        }
    }

    static isNumber (payload) {
        const pattern = /^[0-9]+$/;
        if(payload.match(pattern)) {
            return true;
        } else {
            return false;
        }
    }

    static isAlphaNumeric (payload) {
        const pattern = /^[a-zA-Z0-9]+$/;
        if(payload.match(pattern)) {
            return true;
        } else {
            return false;
        }
    }

    static isDate (payload) {
        const pattern = /^(0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2}$/;
        if(payload.match(pattern)) {
            return true;
        } else {
            return false;
        }
    }

    static isEmail (payload) {
        const pattern = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/;
        if(payload.match(pattern)) {
            return true;
        } else {
            return false;
        }
    }

    static isPassword (payload) {
        const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

        if(payload.match(pattern)){
            return true;
        } else {
            return false;
        }
    }

    static isNotNull (payload) {
        if(!payload) {
            return false;
        }

        return true
    }

    static isArrayOfString (payload) {
        if(!payload.length) {
            return false
        } else if(this.isString(payload)) {
            return false
        }

        for(let i = 0; i < payload.length; i++) {
            if (!this.isString(payload[i])) {
                return false
            }
        }
        return true
    }

    // News Validation
    static isValidNewsStatus (payload) {
        const validStatus = ["draft", "deleted", "publish"]
        
        for(let i = 0; i < validStatus.length; i++) {
            if(payload === validStatus[i]) {
                return true
            }
        }

        return false
    }
    
}



module.exports = Validation