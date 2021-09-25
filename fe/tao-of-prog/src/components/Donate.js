import { BookContextConsumer, DONATION_RESULTS } from './BookContext';
import PayPalButton from './PayPalButton';

const Donate = () => (

    <BookContextConsumer> 
    {
        (value) => {

            return ( 
                <div className="card px-5 mx-3 mb-3">
                    <div className="card-body">
                        <h3 className="card-title">Donate! (For Test/Demo Purpose only)</h3>
                        <div className="card-text">
                            <p className="bg-warning text-center">This is a test system -- no money is actually collected.</p>
                            <p>Your fake donations go a long way to spreading the Tao of Programming to programmers everywhere!</p>
                            <p>You can make a difference!</p>
                            <p className="bg-warning text-center">This is a test system -- please do not use a real PayPal account!</p>
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
                            <h6>PayPal Test Env - Not Live</h6>
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
            )
        }
    }
    </BookContextConsumer>
);

export default Donate;