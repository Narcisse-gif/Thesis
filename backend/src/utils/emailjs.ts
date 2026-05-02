import axios from 'axios';

function getRequiredEmailJsConfig() {
  const serviceId = process.env.EMAILJS_SERVICE_ID?.trim();
  const templateId = process.env.EMAILJS_TEMPLATE_ID?.trim();
  const publicKey =
    process.env.EMAILJS_PUBLIC_KEY?.trim() ||
    process.env.EMAILJS_USER_ID?.trim();
  const privateKey = process.env.EMAILJS_PRIVATE_KEY?.trim();

  const entries = {
    EMAILJS_SERVICE_ID: serviceId,
    EMAILJS_TEMPLATE_ID: templateId,
    EMAILJS_PUBLIC_KEY: publicKey,
  };

  for (const [name, value] of Object.entries(entries)) {
    if (!value || value.startsWith('remplace_par_')) {
      throw new Error(
        `Configuration EmailJS invalide: ${name} est manquant ou contient encore une valeur de remplacement dans backend/.env.`,
      );
    }
  }

  return {
    serviceId,
    templateId,
    publicKey,
    privateKey,
  };
}

export async function sendOtpWithEmailJs(to_email: string, otp: string) {
  const { serviceId, templateId, publicKey, privateKey } =
    getRequiredEmailJsConfig();

  try {
    await axios.post(
      'https://api.emailjs.com/api/v1.0/email/send',
      {
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        accessToken: privateKey || undefined,
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
      },
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const emailJsMessage =
        typeof error.response?.data === 'string'
          ? error.response.data
          : JSON.stringify(error.response?.data);

      throw new Error(
        `EmailJS a refuse la requete (${error.response?.status ?? 'sans statut'}): ${emailJsMessage}`,
      );
    }

    throw error;
  }
}
