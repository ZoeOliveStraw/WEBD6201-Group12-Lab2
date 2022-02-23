(function (core) 
{
    class Contact
    {
        //Constructor

        constructor(fullName = "", contactNumber = "", emailAddress = "")
        {
            this.FullName = fullName;
            this.ContactNumber = contactNumber;
            this.EmailAddress = emailAddress;
        }
        //Getters and Setters
        // Constructor
        get FullName()
        {
            return this.m_fullName;
        }

        set FullName(full_name)
        {
            this.m_fullName = full_name;
        }

        get ContactNumber()
        {
            return this.m_contactNumber;
        }

        set ContactNumber(contact_number)
        {
            this.m_contactNumber = contact_number;
        }

        get EmailAddress()
        {
            return this.m_emailAddress;
        }

        set EmailAddress(email_address)
        {
            this.m_emailAddress = email_address;
        }

        //Public Utility methods

        serialize()
        {
            if(this.FullName !== "" && this.ContactNumber !== "" && this.EmailAddress !== "")
            {
                return `${this.FullName},${this.ContactNumber},${this.EmailAddress}`;
            }
            console.error("One or more properties are of the Contact Object are missing or invalid");
            return null;
        }

        deserialize(data) // Assume that data is in a comma-separated format (string array of properties)
        {
            let propertyArray = data.split(",");
            this.FullName = propertyArray[0];
            this.ContactNumber = propertyArray[1];
            this.EmailAddress = propertyArray[2];
        }

        //Overridden methods

        toString()
        {
            return `Full Name: ${this.FullName} \nContact Number: ${this.ContactNumber} \nEmail Address: ${this.EmailAddress}`;
        }
    }

    core.Contact = Contact;
})(core || (core = {}));
