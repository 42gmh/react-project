import React, { Component } from 'react'

import { selectedBook, testData } from '../test';

const BookContext = React.createContext();

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
        console.log("Fetching the books...")
        this.setState(
            () => {
                return {
                    ...this.state,
                    booksSummary : testData
                }
            },
            () => console.log("STATE AFTER componentDidMount", this.state)
        );
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
