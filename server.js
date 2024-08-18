import express from 'express'
import cors from 'cors'
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51Pok2SIAoNUw9IKeDlmQEwZ5k7WxAWo3ig81rVj20U8pxhDri0DJ9sb2WaIVqCQucSFUvqdFr6aYrObbUGf68zau006kJR9mFM');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/create-payment-intent', async(req,res)=>{
    try {
        const {amount, currency} = req.body;
        const paymentIntent = await stripe.paymentIntents.create({
            amount:amount,
            currency:currency
        })
        res.status(200).send({clientSecret:paymentIntent.client_secret});

        
    } catch (err) {
        res.status(500).send({message:err.message});
        
    }
})
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));