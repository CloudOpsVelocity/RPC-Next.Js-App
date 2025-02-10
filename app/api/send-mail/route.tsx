// pages/api/send-mail.ts
import { NextApiRequest, NextApiResponse } from 'next';

interface MailerData {
  to_address: string;
  subject: string;
  message: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {
  // Check if it's a POST request
  if (req.method === 'POST') {
   
    const mailerData: MailerData = req.body;
    console.log("testiung the function",)

    try {
      // Send a request to your Java backend to trigger email sending
    
      const response = await fetch('https://info.getrightproperty.com/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.EMAIL_API_TOKEN}`,  // optional if your API requires authorization
        },
        body: JSON.stringify(mailerData),
      });

      const result = await response.json();

      if (response.ok) {
        res.status(200).json({ success: true, message: 'Email sent successfully' });
      } else {
        res.status(response.status).json({ success: false, message: result.error || 'Failed to send email' });
      }
    } catch (error) {
      console.error('Error sending email:', error);
      //res.status(500).json({ success: false, message: 'Server error' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
