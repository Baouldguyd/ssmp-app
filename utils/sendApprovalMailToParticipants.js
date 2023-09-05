const { createMailTransorter } = require("./createMailTransaporter");

const sendApprovalMailToParticipant = (user) => {
  const transport = createMailTransorter();
  const date = new Date()

  const mailOption = {
    from: '"SAIL Student Management Portal" <wura77@outlook.com> ',
    to: user.email,
    subject: "STUDENT ENROLLMENT APPROVAL",
    html: `<html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>Student Enrollment Approval</title>
        </head>
        <body style=" margin: 0;background-color: transparent;font-family: Gelion, sans-serif;">
          <div
            style="width: 100%;
          table-layout: fixed;
          background-color: transparent;
          padding-bottom: 60px;"
          >
            <table
              style="background-color: #ffffff;
          margin: 0 auto;
          width: 100%;
          max-width: 700px;
          border-spacing: 0;
          color: #171a1b;"
              width="100%"
            >
              <tr>
                <td
                  height="120"
                  style="
                  background-color: #171a1b;
                  display: flex;
                  align-items: center;
                "
                >
                    SSMP
                </td>
              </tr>
              <tr>
                <td style="background-color: #ffffff">
                  <main>
                  Dear <b>${user.firstName?.toUpperCase()}</b>! We are thrilled to inform you that your application to the ${user.programme} 
                  has been approved! Congratulations on this remarkable achievement and welcome to our esteemed community of tech enthusiasts 
                  and innovators. We are excited to have you join us and embark on this exciting journey of learning, discovery, and growth.

                  To begin your adventure with us, kindly click the link below to set up your account and create your password using this OTP- ${user.otp}.
                  https://sail-student-dashboard.vercel.app


                  Once again, congratulations on your acceptance! We are looking forward to seeing you thrive and excel in the
                  ${user.programme}. Your presence will undoubtedly enrich our community and contribute to its success.
        
                    Best regards,
                    Management
                    
                    
                  </main>
                </td>
              </tr>
              <tr>
                <td
                  height="70"
                  style="
                  text-align: center;
                  background-color: #171a1b;
                  color: #ffffff;
                "
                >
                  <h3>©${date.getFullYear()} SSMP</h3>
                </td>
              </tr>
            </table> 
          </div>
        </body>
      </html>`,
  };
  transport.sendMail(mailOption, (error, info) => {n
    if (error) {
      console.log(error);
    } else {
      console.log("Email verification sent");
    }
  });
};

module.exports = sendApprovalMailToParticipant;
