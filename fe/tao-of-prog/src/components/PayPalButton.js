import React from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';
 
export default class PayPalButton extends React.Component {
    render() {

        // Document on Paypal's currency code: https://developer.paypal.com/docs/classic/api/currency_codes/
 
        const client = {
            sandbox: process.env.REACT_APP_PP_APP_ID,
            production: 'YOUR-PRODUCTION-APP-ID',
        }
        // In order to get production's app-ID, you will have to send your app to Paypal for approval first
        // For sandbox app-ID (after logging into your developer account, please locate the "REST API apps" section, click "Create App"):
        //   => https://developer.paypal.com/docs/classic/lifecycle/sb_credentials/
        // For production app-ID:
        //   => https://developer.paypal.com/docs/classic/lifecycle/goingLive/
 
        let env = 'sandbox'; // you can set here to 'production' for production
        let currency = 'USD'; // or you can set this value from your props or state
        return (
            <PaypalExpressBtn 
                env={env} 
                client={client} 
                currency={currency} 
                total={this.props.amountToPay} 
                onError={this.props.payPalHandler.onPayPalError} 
                onSuccess={this.props.payPalHandler.onPayPalSuccess} 
                onCancel={this.props.payPalHandler.onPayPalCancel} 
                style={{tagline:false}} />
        );
    }
}