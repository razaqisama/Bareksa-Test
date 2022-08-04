const Validate = require('./Validation');

const validateNewsPayload = (payload, opt) => {
    const {
        title,
        content,
        status,
        tags,
        author,
    } = payload

    const validationMessage = {
        title: "Title Cannot be empty",
        content: "Content cannot be empty",
        status: 'Status can be only be "draft", "published", "deleted".',
        tags: "Tags can be only array of string",
        author: "Author cannot be empty"
    }

    const valid = {
        title: Validate.isNotEmptyString(title) && Validate.isString(title),
        content: Validate.isNotEmptyString(content) && Validate.isString(content),
        status: Validate.isValidNewsStatus(status),
        tags: Validate.isArrayOfString(tags),
        author: Validate.isNotEmptyString(author) && Validate.isString(author)
    }

    let isValid = false;

    let message = [];

    for(const key in valid) {
        if(!valid[key]) {
            message.push(validationMessage[key]);
        }
    }

    if (message.length === 0) {
        isValid = true;
    }

    return ({
        isValid,
        message
    })

}


module.exports = validateNewsPayload