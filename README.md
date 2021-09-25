# DigitalCrafts 2021 - React Version of The Tao of Programming

This is my 2021 DigitalCrafts React project. [Requirements are here](https://github.com/careecodes/React-Project-Requirements/blob/main/README.md).

For my project, I decided to implement a React version of [The Tao of Programming as translated by Geoffrey James](https://en.wikipedia.org/wiki/The_Tao_of_Programming).

This project has 3 main parts:
1. A screen-scraper/parser that translates the [online HTML Tao of Programming](https://www.mit.edu/~xela/tao.html) into json. This may be found in the /prep folder.
2. An express.js backend that serves up the aforementiond Tao json. This may be found in the /be folder.
3. A React frontend that uses the exposed enpoints of the express backend to fetch the book summary listing as well as specific book contents selected by the user. This may be found in the /fe/tao-of-prog folder.

It front end and backend have been deployed to an AWS EC2 instance at [gregreact.xyz](https://gregreact.xyz/).

Within each of the folders listed above, run npm install in order to fetch the project dependancies.
