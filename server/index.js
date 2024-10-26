const express = require('express')
const cors = require('cors')

require('dotenv').config()

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const app = express()

app.use(express.json())
app.use(cors({origin: 'http://localhost:3000'}))

app.get('/', (req, res)=>{
    res.json('Server Running')
})

app.post('/checkout', async(req, res)=>{
    try{
        const line_items = req.body.items.map((item)=>{
            return{
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.title,
                        images: [item.img]
                    },
                    unit_amount: item.price * 100
                },
                quantity: item.quantity,
            }
        })

        const session = await stripe.checkout.sessions.create({
            mode: 'payment',
            ui_mode: 'hosted',
            success_url: `http://localhost:3000/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `http://localhost:3000/checkout/failed?session_id={CHECKOUT_SESSION_ID}`,
            line_items: line_items,
            payment_method_types: ['card'],
            customer_email: req.body.email,
        })
        res.json({session_id:session.id, url: session.url})
    }catch(e){
        res.status(500).json({error: e.message})
    }
})


app.listen(process.env.BACKEND_PORT, ()=>{
    console.log('Server Running')
})