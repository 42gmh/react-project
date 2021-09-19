import { BookContextConsumer } from './BookContext';
import BookSummary from './BookSummary';

const BooksList = () => (

    <BookContextConsumer> 
    {
        ({booksSummary}) => {
            console.log("BooksList:", booksSummary);

            return (
                null === booksSummary ? <h1>Loading...</h1> :
                <div className = "bg-dark py-3">
                {
                    booksSummary.books.map((aBook) => { 
                        return <BookSummary key={aBook.booknum} book={aBook}/> 
                    })
                }
                </div>
            );
        }
    }
    </BookContextConsumer>
);

export default BooksList;
