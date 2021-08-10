![Flashcard-o-matic](https://raw.githubusercontent.com/micah-patrick/flashcards/main/src/readme/readme-header.png "Flashcard-o-matic")

#
# Flashcard-o-matic

Thinkful student project built using React and Bootstrap. Users can create decks and cards, then study them as flashcards. Both decks and cards can be edited or deleted. Additional cards can be added to a deck.

#
## SKILLS USED
* React 
* Javascript
* HTML / JSX 
* CSS
* Bootstrap
* React Router
* React Hooks (useState, useEffect)

#
## FEATURES BEYOND THE SCOPE OF THE PROJECT

I went beyond the scope of the project and added the following features

* Fully responsive
* Flashcards shuffle when studying
    * shuffle algorithm uses a runtime of O(n)
* Error handling that gives feedback to user with alerts for
    * Saving...
    * Loading...
    * Your `[deck, card]` is saved!
    * Unable to save your `[deck, card]`.
* Status bar showing percentage of cards a user has studied
* Truncation for long names and descriptions

#
## FUTURE FEATURES

Some features that I would like to impliment in the future

* Get server up and running
* Grading. Track right/ wrong answers while studying
* Add different types of decks / cards (multiple choice, etc)
* Double sided deck option
* Update favicon
#
## SCREENSHOTS

### Home Page:
The home page displays a card for each deck as well as a button to create a new deck.

`path = '/'`
![Home Page](https://raw.githubusercontent.com/micah-patrick/flashcards/main/src/readme/scrn-sht-home.png)


### Study:
Study a deck. Flip to reveal the back of a card.

`path = '/decks/:deckId/study'`
![Study Page](https://raw.githubusercontent.com/micah-patrick/flashcards/main/src/readme/scrn-sht-study.png)


### Deck View:
Viewing a deck reveals the deck's full description, all it's associated cards and options to study, edit, or delete the deck, and add to, edit or delete the cards.

`path = '/decks/:deckId'`
![Deck View](https://raw.githubusercontent.com/micah-patrick/flashcards/main/src/readme/scrn-sht-deck.png)