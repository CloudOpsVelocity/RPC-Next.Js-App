export const sendMail = async (mailerData:any) => {
    try {
      // Send a request to your Java backend to trigger email sending
      const response = await fetch('https://info.getrightproperty.com/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.EMAIL_API_TOKEN}`,  // Optional if your API requires authorization
        },
        body: JSON.stringify(mailerData),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        // Return a success message if the email is sent successfully
        return { success: true, message: 'Email sent successfully' };
      } else {
        // Return the error message from the API response
        return { success: false, message: result.error || 'Failed to send email' };
      }
    } catch (error) {
      console.error('Error sending email:', error);
      return { success: false, message: 'Server error' }; // Return a failure message if an error occurs
    }
  };
  