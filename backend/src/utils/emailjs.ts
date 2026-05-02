import axios from 'axios';

export async function sendOtpWithEmailJs(to_email: string, otp: string) {
  const service_id = process.env.EMAILJS_SERVICE_ID;
  const template_id = process.env.EMAILJS_TEMPLATE_ID;
  const user_id = process.env.EMAILJS_USER_ID;
  const private_key = process.env.EMAILJS_PRIVATE_KEY;

  // 🔥 sécurité minimale
  if (!service_id || !template_id || !user_id || !private_key) {
    throw new Error('EmailJS env variables are missing');
  }

  await axios.post(
    'https://api.emailjs.com/api/v1.0/email/send',
    {
      service_id,
      template_id,
      user_id,
      accessToken: private_key,
      template_params: {
        email: to_email,
        passcode: otp,
        time: '30 minutes',
      },
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  console.log('ENV DEBUG:', {
  service_id,
  template_id,
  user_id,
  private_key,
});
}

