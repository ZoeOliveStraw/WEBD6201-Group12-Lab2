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

//IIFE -- Immediately invoked function express
//AKA anonymous self-executing function
"use script";
(function()
{
    /**
     * //This function uses AJAX to return data to the callback Function
     * 
     * @param {string} method
     * @param {string} url 
     * @param {Function} callback 
     */
    function AjaxRequest(method, url, callback)
    {
        //Step 1 - Create new XHR object
        let XHR = new XMLHttpRequest();

        // Step 2 - Create an Event
        XHR.addEventListener("readystatechange", () => 
        {
            if(XHR.readyState === 4 && XHR.status === 200)
            {
                callback(XHR.responseText);
            }
        });

        // Step 3 - Open a request
        XHR.open(method,url);

        //step 4 - Send the request
        XHR.send();
    }

    /**
     * This function loads the header data from the header file and injects the header and underlying HTML into the page
     * 
     * @param {string} data 
     */
    function LoadHeader(data)
    {
        $("header").html(data);
        $(`li>a:contains(${document.title})`).addClass("active");
        CheckLogin();
    }

    function DisplayHome()
    {

        console.log("Starting DispalyHome method");
        document.getElementById("AboutUsButton").addEventListener("click", () => 
        {
            location.href = "about.html";
        });

        let DocumentBody = document.body;

        $("main").append(`<p id="MainParagraph" class="mt-3">This is the Main Paragraph</p>`);

        $("body").append(`
        <article class ="container">
            <p id="ArticleParagraph" class="mt-3">
                This is the Article Paragraph
            </p>
        </article>`);
    }

/**
 *Adds a contact object to the localStorage
 *
 * @param {*} fullName
 * @param {*} contactNumber
 * @param {*} emailAddress
 */
function AddContact(fullName, contactNumber, emailAddress)
    {
        console.log("AddContact called");
        let contact = new core.Contact(fullName, contactNumber, emailAddress);
        if(contact.serialize())
        {
            let key = contact.FullName.substring(0,1) + Date.now();

            localStorage.setItem(key, contact.serialize());
        }
    }


    function DisplayAboutPage()
    {
        console.log("About Us")
    }

    function DisplayProjectsPage()
    {
        console.log("Projects page")
    }

    function DisplayServicesPage()
    {
        console.log("Services")
    }

    /**
     * This method validates an input text field and displays an error in the message area
     * 
     * @param {string} input_field_ID
     * @param {RegExp} regular_expression 
     * @param {string} error_message 
     */
    function ValidateField(input_field_ID, regular_expression, error_message)
    {
        let messageArea = $("#messageArea").hide();
        
        $("#" + input_field_ID).on("blur", function()
        {
            let inputFieldText = $(this).val();

            if(!regular_expression.test(inputFieldText))
            {
                $(this).trigger("focus"); 
                $(this).trigger("select"); 
                messageArea.show().addClass("alert alert-danger").text(error_message);
            }
            else
            {
                messageArea.removeAttr("class").hide();
            }
        });
    }

    function ValidateContactForm()
    {
        let _regex = new core.Regex();
        ValidateField("fullName", /^([A-Z][a-z]{1,3}.?\s)?([A-Z][a-z]{1,})+([\s,-]([A-Z][a-z]{1,}))*$/,"Incorrect full name");
        ValidateField("emailAddress", /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/, "Invalid email address");
        ValidateField("contactNumber", /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]?\d{4}$/, "Incorrect Contact Number");
    }
    
    function DisplayContactPage()
    {
        ValidateContactForm();

        let sendButton = document.getElementById("sendButton");
        let subscribeCheckBox = document.getElementById("subscribeCheckBox");

        sendButton.addEventListener("click",function(event)
        {
            event.preventDefault();
            if(subscribeCheckBox.checked)
            {
                AddContact(fullName.value, contactNumber.value, emailAddress.value);
            }
        })
    }

    function DisplayContactListPage()
    {
        console.log("Contact-List Page");

        if(localStorage.length > 0)
        {
            let contactList = document.getElementById("contactList");

            let data = ""; // data container -> add deserialized data from the localStorage

            let keys = Object.keys(localStorage); // returns a string array of keys

            let index = 1; // counts how many keys

            // for every key in the keys array (collection), loop
            for (const key of keys) 
            {
                let contactData = localStorage.getItem(key); // get localStorage data value related to the key

                let contact = new core.Contact(); // create a new empty contact object
                contact.deserialize(contactData);

                // inject a repeatable row into the contactList
                data += `<tr>
                <th scope="row" class="text-center">${index}</th>
                <td>${contact.FullName}</td>
                <td>${contact.ContactNumber}</td>
                <td>${contact.EmailAddress}</td>
                <td class="text-center"><button value="${key}" class="btn btn-primary btn-sm edit"><i class="fas fa-edit fa-sm"></i> Edit</button></td>
                <td class="text-center"><button value="${key}" class="btn btn-danger btn-sm delete"><i class="fas fa-trash-alt fa-sm"></i> Delete</button></td>
                </tr>
                `;

                index++;
            }

            contactList.innerHTML = data;

            $("#addButton").on("click",() =>
            {
                location.href = "edit.html#add";
            });

            $("button.delete").on("click", function()
            {
                if(confirm("Are you sure?"))
                {
                    localStorage.removeItem($(this).val());
                }

                // refresh after deleting
                location.href = "contact-list.html";
            });

            $("button.edit").on("click", function()
            {
                location.href = "edit.html#" + $(this).val();
            });
        }
    }

    function DisplayEditPage()
    {
        ValidateContactForm();
        console.log("Edit Page.");

        let page = location.hash.substring(1);

        switch(page)
        {
            case "add":
                {
                    
                    $("main>h1").text("Add Contact");

                    $("#editButton").html(`<i class="fas fa-plus-circle fa-lg"></i> Add`);
                    
                    $("#editButton").on("click",(event)=>
                    {
                        console.log("Ping");
                        event.preventDefault();
                        //Add a contact
                        AddContact(fullName.value, contactNumber.value, emailAddress.value);
                        //Refresh the contact-list page
                        location.href = "contact-list.html";
                    });

                    $("#cancelButton").on("click()",() =>
                    {
                        location.href = "contact-list.html";
                    });
                }
                break;
            default:
                {
                    console.log("edit mode loaded");
                    //Get the contact info from local storage
                    let contact = new core.Contact();
                    contact.deserialize(localStorage.getItem(page));
                    console.log(contact.toString());

                    //Display the contact info in the edit form
                    $("#fullName").val(contact.FullName);
                    $("#contactNumber").val(contact.ContactNumber);
                    $("#emailAddress").val(contact.EmailAddress);

                    //When the editButton is pressed - update the contact
                    $("#editButton").on("click", (event) => 
                    {
                        console.log("Edit button pressed");
                        event.preventDefault();

                        //get any changes from the form
                        contact.FullName = $("#fullName").val();
                        contact.ContactNumber = $("#contactNumber").val();
                        contact.EmailAddress = $("#emailAddress").val();

                        //replace the item in local storage
                        localStorage.setItem(page,contact.serialize());

                        //Return to the contact list
                        location.href = "contact-list.html";
                    });

                    $("#cancelButton").on("click",() =>
                    {
                        location.href = "contact-list.html";
                    });
                }
                break;

        }
    }

    function DisplayLoginPage()
    {
        console.log("Login Page");
        let messageArea = $("#messageArea");
        messageArea.hide();

        $("#loginButton").on("click", function()
            {
                let success = false;

                let newUser = new core.User();

                $.get("./Data/users.json", function(data)
                {
                    for(const user of data.users)
                    {
                        console.log(data);
                        //Check if the username and password entered matches the user data
                        if(username.value == user.Username && password.value == user.Password)
                        {
                            newUser.fromJSON(user);
                            success = true;
                            break;
                        }
                    }
                    //if username and password matches we have.. Success!
                    if(success)
                    {
                        sessionStorage.setItem("user",newUser.serialize());

                        //Hide error messages
                        messageArea.removeAttr("class").hide();

                        //redirect to secure area of the site (contact list)

                        location.href  = "contact-list.html";
                    }
                    else
                    {
                        $("#username").trigger("focus").trigger("select");
                        messageArea.addClass("alert alert-danger").text("error: Invalid Login Credentials").show();
                    }
                    });
            });

        $("#cancelButton").on("click", function()
            {
                document.forms[0].reset();

                location.href = "index.html";
            }
        );
    }

    function CheckLogin()
    {
        if(sessionStorage.getItem("user"))
        {
            //swap out the login logout links

            $("#login").html(
                `<a id="logout" class="nav-link" href="#">Logout</a>`
            )
            $("#logout").on("click", function()
            {
                sessionStorage.clear();

                location.href = "login.html";
            })
            //Grab a reference to the current user's name and inject it into the navbar between Contact and Logout
            // Changed Navbar to show username instead of name
            let userName = sessionStorage.getItem("user").split(',')[2];
            let contactListNavbarItem = $("a:contains('Contact Us')").parent();
            contactListNavbarItem.after(`<li class="navbar-text"><a>${userName}</a></li>`);
        }
    }

    /**
     * Displays the registration page and validates it for the user
     */
    function DisplayRegisterPage()
    {
        $("#contentArea").prepend(`<div id="ErrorMessage">SAMPLE ERROR MESSAGE</div>`);
        ValidateRegisterForm();
        
        $("#submitButton").on("click", function()
        {
            console.log("DONE DONE DONE");
            let newUser = new User(firstName.value,lastName.value,userName.value,emailAddress.value,password.value);
            console.log(newUser.toString() + "Created");
        });
    }

    /**
     * This method validates an input text field in the registration form and displays an error in the message area
     * 
     * @param {string} input_field_ID
     * @param {RegExp} regular_expression 
     * @param {string} error_message 
     */
     function ValidateRegistrationField(input_field_ID, regular_expression, error_message)
     {
         // Added hiding on default
         let errorMessage = $("#ErrorMessage").hide();
         
         $("#" + input_field_ID).on("blur", function()
         {
             let inputFieldText = $(this).val();

             if(!regular_expression.test(inputFieldText))
             {
                 $(this).trigger("focus");
                 $(this).trigger("select"); 
                 console.log("Thingy go zoom zoom");
                 errorMessage.show().addClass("alert alert-danger").text(error_message);
             }
             else
             {
                 errorMessage.removeAttr("class").hide();
             }
         });
     }
 
     function ValidateRegisterForm()
     {
         //TODO: SETUP REGEX FOR EMAIL AND CONFIRM PASSWORD
         // CHECK THAT PASSWORD AND CONFIRM PASSWORD ARE THE SAME
         ValidateRegistrationField("firstName", /([A-Z][a-z]{1,})/,"Invalid first name");
         ValidateRegistrationField("lastName", /([A-Z][a-z]{1,})/, "Invalid last name");
         ValidateRegistrationField("userName", /([A-Z][a-z]{1,})/, "Invalid username");
         ValidateRegistrationField("emailAddress", /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/, "Invalid email address");
         ValidateRegistrationField("password", /^[\S]{6,}$/, "Invalid Password");
         ValidateRegistrationField("confirmPassword", /^[\S]{6,}$/, "Invalid Password");
     }

    //named function
    function Start()
    {
        console.log("Hello, World!");

        AjaxRequest("GET","header.html",LoadHeader);

        CheckLogin();

        switch(document.title)
        {
            case "Home":
                DisplayHome();
                break;
            case "About Us":
                DisplayAboutPage();
                break;
            case "Our Projects":
                DisplayProjectsPage();
                break;
            case "Our Services":
                DisplayServicesPage();
                break;
            case "Contact-List":
                DisplayContactListPage();
                break;
            case "Contact Us":
                DisplayContactPage();
                break;
            case "Edit":
                DisplayEditPage();
                break;
            case "Login":
                DisplayLoginPage();
                break;
            case "Register":
                DisplayRegisterPage();
                break;
        }
        
    }

    window.addEventListener("load", Start());

})();