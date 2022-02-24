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
            if(this.FirstName !== "" && this.LastName !== "" && this.EmailAddress !== "" && this.Password !== "")
            {
                return `${this.FirstName},${this.LastName},${this.EmailAddress},${this.Password}`;
            }
            console.error("One or more properties of the User Object are missing or invalid");
            return null;
        }
    
        deserialize(data) // assume that data is in a comma-separated format (string array of properties)
        {
            let propertyArray = data.split(",");
            this.DisplayName = propertyArray[0];
            this.EmailAddress = propertyArray[1];
            this.Username = propertyArray[2];
        }
    }
    core.User = User;
})(core || (core={}));