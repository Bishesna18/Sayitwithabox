import {VERIFICATION_EMAIL_TEMPLATE,PASSWORD_RESET_REQUEST_TEMPLATE,PASSWORD_RESET_SUCCESS_TEMPLATE} from './emailTemplates.js'
import {mailClient,sender} from './mailtrap.config.js'
export const sendVerificationEmail=async(email,verificationToken)=>{
    const recipient=[{email}]

    try{
        const response=await mailClient.sendMail({
            from:sender,
            to:recipient.map(item => item.email).join(', '),
            subject:"verify yout email",
            html:VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}",verificationToken),
            category:"Email Verification"
        })
        console.log("Email sent successfully",response)
    }catch (error){
        console.log(`Error sending verification email`,error);   
    throw new Error(`Error sending verification email:${error}`)
    }
};
export const sendwelcomeEmail=async(email,name)=>{
    const recipient=[{email}];

    try {
        const response =await mailClient.sendMail({
            from:sender,
            to:recipient.map(item => item.email).join(', '),
            subject: 'Welcome to our platform!',
            // template_uuid:"f6564929-66be-42d4-9fe5-9d5afc5fe89b",
            // template_variables:{
            //     "company_info_name":"Say it with a Box",
            //     "name":name
            html: `
        <h1>Welcome ${name}!</h1>
        <p>Thank you for joining Say it with a Box!</p>
      `, 
      category: "Welcome Email"
    });
        console.log(" welcome Email sent successfully",response);
    } catch (error) {
        console.error(`erroe sending mail`,error);
        throw new Error(`Error sending welcome email:${error}`);
    }
};
export const sendPasswordResetEmail=async(email,resetURL)=>{
    const recipient=[{email}];
    try {
       const response=await mailClient.sendMail({
        from:sender,
        to:recipient.map(item => item.email).join(', '),
        subject: 'Reset your password',
        html:PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}",resetURL),
        category:"Password Reset",
       });
       console.log(" reset Email sent successfully",response);
    } catch (error) {
        console.error(`error sending mail`,error);
        throw new Error(`Error sending reset email:${error}`); 
    }
};
export const sendResetSuccessEmail=async(email)=>{
    const recipient=[{email}];
    console.log("Preparing to send reset success email to:", email);

    try {
        const response=await mailClient.sendMail({
         from:sender,
         to:recipient.map(item => item.email).join(', '),
         subject:"Password Reset Successful",
         html: PASSWORD_RESET_SUCCESS_TEMPLATE,
         category:"password Reset"
        });
        console.log(" reset Email sent successfully",response); 
    } catch (error) {
        console.error(`error sending password reset success mail`,error);
        throw new Error(`Error sending password reset email:${error}`); 
    }
}

