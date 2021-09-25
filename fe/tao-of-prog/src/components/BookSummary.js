import React from 'react'
import { Link } from 'react-router-dom';
import { BookContextConsumer } from './BookContext';

const BookSummary = ({book}) => (
        <BookContextConsumer>
        {
            (value) => {
                // console.log("BookSummary:", value);
                return (
                    <Link to="/book" className="text-decoration-none link-dark">
                        <div className="card px-5 mx-3 mb-3" onClick={() => value.handleBookSelection(book.booknum)}>
                            <div className="card-body">
                                <h3 className="card-title">{book.title}</h3>
                                    <blockquote className="blockquote mb-0">
                                        <p className="card-text text-center">{book.epigraph}</p>
                                    </blockquote>
                            </div>
                        </div>
                    </Link> 
                ) 
            }
        }
        </BookContextConsumer> 
);

export default BookSummary;