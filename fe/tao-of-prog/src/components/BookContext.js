import React, { Component } from 'react'

import { selectedBook, testData } from '../test';

const DONATION_RESULTS = {
    SUCCESS : "success",
    CANCELLED : "cancelled",
    ERRORED : "errored"   
}

const BookContext = React.createContext();

const serverURL =
  process.env.NODE_ENV === "production"
    ? "api/tao/v1"
    : "http://localhost:5665/api/tao/v1";

export default class BookContextProvider extends Component {

    state = {
        booksSummary: null,
        selectedBook: null,
        donated: false,
        donationAmt: 0,
        donationResult: null
    }

    componentDidMount() {
        console.log("Component Did Mount...", this.state);

        if(null != this.state.booksSummary) {
            console.log("No need to re-fetch books...");
            return;
        }

        // fetch the data via an api call
        console.log("Fetching the books...");
        if("true" === process.env.REACT_APP_USE_TEST_DATA){
            this.loadTestBookSummaries();
        }
        else {
            this.loadBookSummariesFromServer();
        }
    }

    handleBookSelection = (booknum) => {
        console.log("Handling book selection...");

        if(null != this.state.selectedBook &&
            booknum === this.state.selectedBook.booknum) {
            console.log("No need to re-fetch book: ", booknum);
            return;
        }

        // make an api call to fetch a book
        console.log("Fetching book: " + booknum);
        if("true" === process.env.REACT_APP_USE_TEST_DATA){
            this.loadTestBook();
        }
        else {
            this.loadBookFromServer(booknum);
        }
      }

    loadBookSummariesFromServer() {
        fetch(serverURL + "/booksummary")
            .then(res => res.json())
            .then((result) => {
                this.setState(() => {
                    return {
                        ...this.state,
                        booksSummary: result
                    };
                });
            });
    }

    loadBookFromServer(booknum) {
        fetch(serverURL + "/book/" + booknum)
            .then(res => res.json())
            .then((result) => {
                this.setState(() => {
                    return {
                        ...this.state,
                        selectedBook: result
                    };
                });
            });
    }

    loadTestBook() {
        console.log("USING TEST DATA: loadTestBook");

        this.setState(
            () => {
                return {
                    ...this.state,
                    selectedBook: selectedBook
                };
            },
            () => console.log("STATE AFTER componentDidMount", this.state)
        );
    }

    loadTestBookSummaries() {
        console.log("USING TEST DATA: loadTestBooks");
        this.setState(
            () => {
                return {
                    ...this.state,
                    booksSummary: testData
                };
            },
            () => console.log("STATE AFTER componentDidMount", this.state)
        );
    }

    onPayPalSuccess = (payment) => {
        console.log("onPayPalSuccess:", payment);
        this.onPayPalResult(true, DONATION_RESULTS.SUCCESS, payment);
    }

    onPayPalCancel = (payment) => {
        console.log("onPayPalCancel:", payment);
        this.onPayPalResult(false, DONATION_RESULTS.CANCELLED, payment);
    }

    onPayPalError = (payment) => {
        console.log("onPayPalError:", payment);
        this.onPayPalResult(false, DONATION_RESULTS.ERRORED, payment);
    }

    onPayPalResult = (donated, result, payment) => {
        console.log(`onPayPalResult donated result payment: ${donated} ${result} ${payment}`);
        this.setState(
            () => {
                return {
                    ...this.state,
                    donated: donated,
                    donationResult: result
                }
            }
        )
    }

    handleSelectDonationAmt = (amount) => {
        console.log("donation selected:", amount);
        this.setState(
            () => {
                return {
                    ...this.state,
                    donationAmt: amount
                }
            }
        );
    }

    render() {
        return (
            <BookContext.Provider value={{
                ...this.state, 
                handleBookSelection : this.handleBookSelection,
                handleSelectDonationAmt: this.handleSelectDonationAmt,
                paypalHandler: {
                    onPayPalCancel : this.onPayPalCancel,
                    onPayPalError : this.onPayPalError,
                    onPayPalSuccess : this.onPayPalSuccess
                }
              }}>
    
                {this.props.children}
            </BookContext.Provider>
        )
    }
}

const BookContextConsumer = BookContext.Consumer;

export { BookContextProvider, BookContextConsumer, DONATION_RESULTS };