![Flashcard-o-matic Discover the flashcard difference](/src/readme/readme-header.png "Flashcard-o-matic")

#
# Flashcard-o-matic

Thinkful student project built using React and Bootstrap. Users can create decks and cards, then study them as flashcards. Both decks and cards can be edited or deleted. Additional cards can be added to a deck.

## SCREEN SHOTS

### Home Page:
![Home Page](/src/readme/scrn-sht-home.png)

## SKILLS USED
* React 
* Javascript
* HTML / JSX 
* CSS
* Bootstrap
* React Router
* React Hooks (useState, useEffect)
* Datasets are stored on a JSON RESTful API 

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

## FUTURE FEATURES

Some features that I would like to impliment in the future

* Get server up and running
* Grading. Track right/ wrong answers while studying
* Add different types of decks / cards (multiple choice, etc)
* Update favicon