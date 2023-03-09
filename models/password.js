const validator = require('validator');
const passwordValidator = require('password-validator');

const passwordSchema = new passwordValidator();

passwordSchema
.is().min(8)                                    
.has().uppercase()                              
.has().lowercase()                              
.has().digits()                                 
.has().not().spaces()
.has().not([/^[/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/])                       
.is().not().oneOf(['Passw0rd', 'Password123']);

module.exports = passwordSchema;