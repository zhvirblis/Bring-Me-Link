function loginChecker(login){
    const patt = /^[a-zA-Z]([a-zA-Z0-9.-]{0,8}[a-zA-Z0-9])?$/;
    return patt.test(login);
}
function emailChecker(email){
    const patt = /.+@.+\..+/i;
    return patt.test(email);
}

module.exports = {
    loginChecker: loginChecker,
    emailChecker: emailChecker    	
};
