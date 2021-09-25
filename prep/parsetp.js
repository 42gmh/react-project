const fs = require('fs');
const { exit } = require('process');
const readline = require('readline');

const WHERE_BOOK = "book"
const WHERE_EPIGRAPH = "epigraph";
const WHERE_EPIGRAPH_COMPLETED = "epigraph-completed";
const WHERE_SECTION = "section";
const WHERE_BLOCKQUOTE = "bq";
const WHERE_STANZA = "stanza";

async function processLineByLine() {
  const fileStream = fs.createReadStream('tp.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  const theTao = {
    title: "The Tao of Programmin",
    attribution: "Translated by Geoffrey James",
    books: []
  };

  const theContext = {
    whereAmI: [],
    aBook: null,
    aSection: null,
    aLine: null,
    aStanza: null
  }

  for await (const line of rl) {

    if(line.match(/.*(HTML|BODY|HEAD|TITLE)/)) {
        continue;
    }

    // a book
    if(line.match(/^<H3>/))
    {
        closeSection(theContext);
        // found another book, push the last on into the collection of books
        if(theContext.aBook != null)
        {
            theTao.books.push(theContext.aBook);
            theContext.aBook = null;
            pop(theContext);
        }

        push(theContext, WHERE_BOOK);

        const found = line.match(/<H3>BOOK (?<booknum>[0-9]*)/);

        theContext.aBook = {
            booknum : found.groups.booknum,
            epigraph : null,
            title : null,
            sections : []
        };

        // console.log(JSON.stringify(theContext));
        // console.log("TAO: ", JSON.stringify(theTao));
        continue
    }

    // book title
    if(line.match(/^<H2><I>/)) {
        const found = line.match(/<H2><I>(?<title>[a-zA-Z ]*)</);

        theContext.aBook.title = found.groups.title;
        continue;

    }

    // epigraph begins - 1st line of N - Thus the master spake
    if(line.match(/^<H5>/)) {

        const found = line.match(/^<H5>(?<epigraph>[a-zA-Z :]*)</);

        theContext.aBook.epigraph = found.groups.epigraph;
        push(theContext, WHERE_EPIGRAPH);
        continue;
    }

    // epigraph - content
    if(line.match(/^<P><FONT/)) {

        const found = line.match(/^<P>.*<B>.*"(?<epigraph>[a-zA-Z :.,]*)/);

        theContext.aBook.epigraph += " " + found.groups.epigraph;

        continue;
    }

    // epigraph ends - content ending
    if(line.match(/.*"<\/B><\/FONT>/))
    {
        const found = line.match(/(?<epigraph>.*)"<\/B><\/FONT>/);

        theContext.aBook.epigraph += " " + found.groups.epigraph;

        pop(theContext);
        continue;
    }

    // section begin
    if(line.match(/^<H4>[0-9]\.[0-9]<\/H4>/))
    {
        closeSection(theContext);

        const found = line.match(/<H4>[0-9]\.(?<sectionnum>[0-9]*)<\/H4>/);

        openSection(theContext, found);

        continue;
    }

    if(line.match(/^<BLOCKQUOTE>/))
    {
        closeStanza(theContext);

        push(theContext, WHERE_BLOCKQUOTE);

        theContext.aStanza = {
            lines: [],
            type: "block"
        };

        push(theContext, WHERE_STANZA);
    }

    if(line.match(/^<\/BLOCKQUOTE>/))
    {
        closeStanza(theContext);
        pop(theContext)
    }

    if(line.match(/^<P>/))
    {
        if(WHERE_SECTION === (theContext.whereAmI[theContext.whereAmI.length - 1]))
        {
            theContext.aStanza = {
                lines: [],
                type: "plain"
            };

            push(theContext, WHERE_STANZA);
        }
    
        if(null != theContext.aLine)
        {
            theContext.aStanza.lines.push(theContext.aLine);
            theContext.aLine = null;
        }

        continue;
    }

    if(line.match(/^<BR>/))
    {    
        if(null != theContext.aLine)
        {
            theContext.aStanza.lines.push(theContext.aLine);
            theContext.aLine = null;
        }

        continue;
    }

    if(!line.match(/^</))
    {
        // console.log("before:", line);
        if(theContext.aLine){
            theContext.aLine += " " + line;
        }
        else {
            if(WHERE_SECTION === (theContext.whereAmI[theContext.whereAmI.length - 1]))
            {
                theContext.aStanza = {
                    lines: [],
                    type: "plain"
                };
                push(theContext, WHERE_STANZA);
            }
            theContext.aLine = line;
        }

        // console.log("after:", theContext.aLine);


        continue;
    }
}

    // console.log("b");
    // closeSection(theContext);

    closeSection(theContext);
    theTao.books.push(theContext.aBook);
    console.log(JSON.stringify(theTao, null, 2));
}

processLineByLine();

function closeSection(theContext) {

    closeStanza(theContext);

    if (null != theContext.aSection) {
        theContext.aBook.sections.push(theContext.aSection);
        theContext.aSection = null;
        pop(theContext);
    }
}

function closeStanza(theContext) {
    // console.log(theContext.aLine);
    // console.log(theContext.aStanza);
    if (null != theContext.aLine) {
        theContext.aStanza.lines.push(theContext.aLine);
        theContext.aLine = null;
    }

    if (null != theContext.aStanza) {
        theContext.aSection.stanzas.push(theContext.aStanza);
        theContext.aStanza = null;
        pop(theContext);
    }
}

function openSection(theContext, found) {
    theContext.aSection = {
        id: found.groups.sectionnum,
        stanzas: []
    };

    push(theContext, WHERE_SECTION);
}

function push(theContext, what)
{
    theContext.whereAmI.push(what);
    // console.log("after push:", theContext.whereAmI);
}

function pop(theContext)
{
    theContext.whereAmI.pop();
    // console.log("after pop:", theContext.whereAmI);
}
