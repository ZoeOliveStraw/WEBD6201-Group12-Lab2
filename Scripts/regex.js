(function(core){
    /**
     * The Regex class allows us to more easily use our regular expressions
     * We can define each type of regular expression that we need, and then
     * invoke it by name in our code.
     */
    class Regex
    {
        constructor()
        {
            let FullName = /^([A-Z][a-z]{1,3}.?\s)?([A-Z][a-z]{1,})+([\s,-]([A-Z][a-z]{1,}))*$/;
            
            // Minimum length of 8 and an @ present
            let EmailAddress = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            let PhoneNumber = /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]?\d{4}$/;

            // First Name and Last Name that the minimum length 
            // that each input element will allow is 2 characters
            let FirstLastName = /([A-Z][a-z]{1,})/;

            // Password at least 6 characters in length
            let Password = /^[\S]{6,}$/;
        }
    }
    core.Regex = Regex;
})(core || (core={}));