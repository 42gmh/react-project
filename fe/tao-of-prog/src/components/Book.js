import { BookContextConsumer } from './BookContext';
import BookSummary from './BookSummary';
import Section from './Section';

const Book = () => (

    <BookContextConsumer> 
    {
        ({selectedBook}) => {

            return ( null === selectedBook ? <h1>Loading...</h1> :
                <div className = "bg-dark py-3">
                    <BookSummary key={selectedBook.booknum} book={selectedBook}/>
                    {
                        selectedBook.sections.map(aSection => {
                            const sectionKey = selectedBook.booknum + "-" + aSection.id;
                                    
                            return (<Section key={sectionKey} section={aSection}/>)
                        })
                    }
                </div>
            )
        }
    }
    </BookContextConsumer>
);

export default Book;