const { createTransport } = require('nodemailer')
const { google } = require('googleapis')
const OAuth2 = google.auth.OAuth2
const { GOOGLE_ID,GOOGLE_REFRESH,GOOGLE_SECRET,GOOGLE_URL,GOOGLE_USER,BACK_URL } = process.env

function createClient() {
    return new OAuth2( 
        GOOGLE_ID,
        GOOGLE_SECRET,
        GOOGLE_URL
    )
}

function getTransport(client) {
 
  const accessToken = client.getAccessToken()
  return createTransport({
      service: 'gmail',   
      auth: {            
          user: GOOGLE_USER,
          type: 'OAuth2',
          clientId: GOOGLE_ID,
          clientSecret: GOOGLE_SECRET,
          refreshToken: GOOGLE_REFRESH,
          accessToken: accessToken
      },
      tls: { rejectUnauthorized: false }
   
  })
}


  function sendEmail({mail, name, lastName, country, state, adress, phone, productName, productPrice, }){
    return `
    <div>
    <h1>Hi, ${mail}</h1>            
    <p>Name: ${name}</p>
    <p>Last Name: ${lastName}</p>
    <p>Country: ${country}</p>
    <p>State: ${state}</p>
    <p>Adress: ${adress}</p>
    <p>Phone: ${phone}</p>
    <p>Product Name: ${productName}</p>
    <p>Product Price: ${productPrice}</p>
</div>
`
  }
    
  const sendEmailPurchase = async (mail, name, lastName, country, state, adress, phone, productName, productPrice) => {
    const client = createClient()
    client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH })
    const transport = getTransport(client)
    const mailOptions = {
        from: GOOGLE_USER, 
        to: mail, 
        subject: 'Your purchase', 
        html: sendEmail({ mail:mail, name:name, lastName:lastName, country:country, state:state, adress:adress, phone:phone, productName:productName, productPrice:productPrice, host:BACK_URL }) 
    }
  
    await transport.sendMail(
        mailOptions, 
        (error, response) => { 
            if (error) {
                console.error(error)
                return
            }
            console.log('Email sent!')
        }
    )
}



module.exports = sendEmailPurchase;