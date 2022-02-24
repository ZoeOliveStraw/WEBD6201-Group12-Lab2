(function(core){

    class User
    {
        // TODO: missing Getters and Setters

        // constructor
        constructor(firstName = "", lastName ="",username ="",  emailAddress = "", password = "")
        {
            this.FirstName = firstName;
            this.LastName = lastName;
            this.Username = username;
            this.EmailAddress = emailAddress;
            this.Password = password;
        }

        // overriden methods
        toString()
        {
            return `Name : ${this.FirstName} ${this.LastName}\nUsername: ${this.Username}\nEmail Address : ${this.EmailAddress}`;
        }

        // utility methods
        toJSON()
        {
            return {
                "FirstName": this.FirstName,
                "LastName": this.LastName,
                "Username":this.Username,
                "EmailAddress": this.EmailAddress,
                "Password": this.Password
            }
        }

        fromJSON(data)
        {
            this.FirstName = data.FirstName;
            this.LastName = data.LastName;
            this.Username = data.Username;
            this.EmailAddress = data.EmailAddress;
            this.Password = data.Password;
        }

        serialize()
        {
            if(this.FirstName !== "" && this.LastName !== "" && this.Username !== "" && this.EmailAddress !== "" && this.Password !== "")
            {
                return `${this.FirstName},${this.LastName},${this.Username},${this.EmailAddress}`;
            }
            console.error("One or more properties of the User Object are missing or invalid");
            return null;
        }
    
        deserialize(data) // assume that data is in a comma-separated format (string array of properties)
        {
            let propertyArray = data.split(",");
            this.FirstName = propertyArray[0];
            this.LastName = propertyArray[1];
            this.Username = propertyArray[2];
            this.EmailAddress = propertyArray[3];
            this.Username = propertyArray[4];
        }
    }
    core.User = User;
})(core || (core={}));