import { authenticate, signUp, getSession, getUserAttributes } from './useAccounts'

export const loginSchema = {
    schema: {
        title: "Please log in",
        type: "object",
        required: ["email", "password"],
        properties: {
            email: {type: "string", title: "Email", format: "email"},
            password: {type: "string", title: "Password"}
        }
    },
    uiSchema: {
        password: {
            "ui:widget": "password" // could also be "select"
        }
    },
    onSubmit: ({formData}, e) => {
        console.log("Data submitted: ",  formData);
        authenticate(formData.email, formData.password)
    }
};

export const forgotSchema = {
    schema: {
        title: "Forgotten Password",
        type: "object",
        required: ["email", "password"],
        properties: {
            email: {type: "string", title: "Email", format: "email"},
            password: {type: "string", title: "Password"}
        }
    },
    uiSchema: {
        password: {
            "ui:widget": "password" // could also be "select"
        }
    },
    onSubmit: ({formData}, e) => console.log("Data submitted: ",  formData)
};

export const newAccountSchema = {
    schema: {
        title: "Enter Account data",
        type: "object",
        required: ["email", "password", "firstName", "lastName"],
        properties: {
            email: {type: "string", title: "Email", format: "email"},
            firstName: {type: "string", title: "First Name"},
            lastName: {type: "string", title: "Last Name"},
            position: {type: "string", title: "Position"},
            dhsComponent: {type: "string", title: "DHS Component"},
            password: {type: "string", title: "Password"},
            confirm: {type: "string", title: "confirm"},
        }
    },
    uiSchema: {
        password: {
            "ui:widget": "password" // could also be "select"
        },
        confirm: {
            "ui:widget": "password" // could also be "select"
        }
    },
    onSubmit: ({formData}, e) => 
        {
            console.log("Data submitted: ",  formData);
            const { email, firstName, lastName, position, dhsComponent, password } = formData;

            let attributes = [];
            attributes.push({Name: 'email', Value: email});
            attributes.push({Name: 'family_name', Value: lastName});
            attributes.push({Name: 'given_name', Value: firstName});
            attributes.push({Name: 'custom:position', Value: position});
            signUp(email, password, attributes);
        }
}


  const dhsComponents = [
    { abbr: 'ICE', name: 'U.S. Customs and Immigration Enforcement' },
    { abbr: 'USCG', name: 'U.S. Coast Guard' },
    { abbr: 'TSA', name: 'Transportation Security Administration' },
    { abbr: 'PARM', name: ' Accountability and Risk Management' },
    { abbr: 'FEMA', name: 'Federal Emergency Management Agency' },
  ];