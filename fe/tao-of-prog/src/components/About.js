import { BookContextConsumer, DONATION_RESULTS } from './BookContext';
import PayPalButton from './PayPalButton';

const About = () => (

    <BookContextConsumer> 
    {
        (value) => {

            return ( 
                <div className = "bg-dark py-3">
                    <div className="card px-5 mx-3 mb-3">
                        <h3 className="card-title">2021 DigitalCrafts React Project</h3>
                    </div>
                    <div className="card px-5 mx-3 mb-3">
                        <div className="card-body">
                            <h3 className="card-title">Donate!</h3>
                            <div className="card-text">
                                <p>Your donations go a long way to spreading the Tao of Programming to programmers everywhere!</p>
                                <p>You can make a difference!</p>
                                <p className="bg-warning text-center">This is a test system -- please do not use!</p>
                                <p>Please select your donation amount:</p>
                                <div>
                                    <input type="radio" defaultChecked={1 === value.donationAmt} id="one-dollar" name="donation-amt" value="1" onClick={() => value.handleSelectDonationAmt(1)}/>
                                    <label htmlFor="one-dollar">$1 - Thank you!</label>
                                </div>
                                <div>
                                    <input type="radio" defaultChecked={2 === value.donationAmt} id="two-dollars" name="donation-amt" value="2" onClick={() => value.handleSelectDonationAmt(2)}/>
                                    <label htmlFor="two-dollars">$2 - You are too kind!</label>
                                </div>
                                <div>
                                    <input type="radio" defaultChecked={3 === value.donationAmt} id="thee-dollars" name="donation-amt" value="3" onClick={() => value.handleSelectDonationAmt(3)}/>
                                    <label htmlFor="three-dollars">$3 - Your generosity overflows!</label>
                                </div>
                                <br/>
                                <PayPalButton payPalHandler={value.paypalHandler} amountToPay={value.donationAmt}/>
                                <>
                                    <br/>
                                    {
                                        DONATION_RESULTS.CANCELLED === value.donationResult ? <p className="bg-warning text-dark text-center">You have cancelled your donation.</p> : null
                                    }
                                    {
                                        DONATION_RESULTS.SUCCESS === value.donationResult ? <p className="bg-success text-light text-center">Thank you for your donation!</p> : null
                                    }
                                    {
                                        DONATION_RESULTS.ERRORED === value.donationResult ? <p className="bg-danger text-dark text-center">There was an error processing your donation.</p> : null
                                    }
                                </>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
    </BookContextConsumer>
);

export default About;