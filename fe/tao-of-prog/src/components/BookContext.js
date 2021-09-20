import React, { Component } from 'react'

import { selectedBook, testData } from '../test';

const BookContext = React.createContext();

const serverURL =
  process.env.NODE_ENV === "production"
    ? "api/tao/v1"
    : "http://localhost:5665/api/tao/v1";

export default class BookContextProvider extends Component {

    state = {
        booksSummary: null,
        selectedBook: null,
        donated: true
    }

    componentDidMount() {
        console.log("Component Did Mount...", this.state);

        if(null != this.state.booksSummary) {
            console.log("No need to re-fetch books...");
            return;
        }

        // fetch the data via an api call
        console.log("Fetching the books...");
        if(true === process.env.REACT_APP_USE_TEST_DATA){
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
        if(true === process.env.REACT_APP_USE_TEST_DATA){
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

    render() {
        return (
            <BookContext.Provider value={{
                ...this.state, 
                handleBookSelection : this.handleBookSelection
              }}>
    
                {this.props.children}
            </BookContext.Provider>
        )
    }
}

const BookContextConsumer = BookContext.Consumer;

export { BookContextProvider, BookContextConsumer };
