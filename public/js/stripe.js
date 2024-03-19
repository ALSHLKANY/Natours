import axios from 'axios';
import { showAlert } from './alerts';

export const bookTour = async (tourId) => {
  const stripe = Stripe(
    'pk_test_51OvewUJzRBgGPhr2BoQV9fW7BBMYMGiTjj6opQGxdQ5m9qkpmq2FKuTgc94ZJfupkGXj9KWSHHT1LtmgvHUKzhyX00QPLoSKWD',
  );
  try {
    const session = await axios(
      `http://127.0.0.1:8000/api/v1/booking/checkout-session/${tourId}`,
    );
    console.log(session);
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    showAlert('error', err);
  }
};
