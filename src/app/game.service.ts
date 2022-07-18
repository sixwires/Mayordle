import { Injectable, ViewChild } from '@angular/core';
import { Inject }  from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  	providedIn: 'root'
})
export class Game {
	target_word: string
  	current_word: string
  	word_matrix: Array<string>
	green_letters: Array<string>
	current_yellows: Array<Object>


  	constructor () {
		this.target_word = "allow" // todo add oninit generate new word
      	this.current_word = ""
      	this.word_matrix = []
		this.green_letters = []
		this.current_yellows = []
  	}

	// update grid
	update_grid (letter: string) {
		let col_i = this.current_word.length 
		let row_i = this.word_matrix.length
		let current_line = document.querySelector(`#row${row_i + 1}`) as HTMLElement | null

		if (col_i >= 0 && current_line) {
			let current_block = current_line.children[col_i] as HTMLElement | null
			if (current_block) {
				current_block.innerText = letter.toUpperCase()
			}
		}
	}	

    // add letter
  	add_letter (letter: string) {
		if (this.current_word.length < 5) {
			this.update_grid(letter)
			this.current_word += letter
		}
	}

    // remove letter
	remove_letter () {
		if (this.current_word.length > 0) {
			this.current_word = this.current_word.slice(0, -1)
			this.update_grid('')
		}
	}

    // press enter
    async enter () {
		let valid = await this.validate(this.current_word)
		let row_i = this.word_matrix.length
		let current_line = document.querySelector(`#row${row_i + 1}`) as HTMLElement | null
		
		if (current_line) {
			current_line.classList.remove("shake")
		}

		// loop through current entry
		if (valid && this.current_word.length == 5) {

			// check if won
			if (this.current_word == this.target_word.toUpperCase()) {
				this.game_won()
			}

			// loop through word
			for (let i = 0; i < 5; ++i) {
				if (this.current_word[i] == this.target_word[i].toUpperCase()) { // letter is in correct place
					// turn letter green in grid
					this.color_block(this.word_matrix.length, i, this.current_word[i], "#6aaa64")
					this.green_letters.push(this.current_word[i])

				} 
				// else if the letter is already green
				
				else if (this.target_word.toUpperCase().includes(this.current_word[i])) { // letter is in word, but not right place
					// turn letter yellow in grid
					this.color_block(this.word_matrix.length, i, this.current_word[i], "#c9b458")

				} else { // letter is not in word
					// turn letter grey in grid
					this.color_block(this.word_matrix.length, i, this.current_word[i], "#86888a")
				}
			}

			// add to word matrix
			this.word_matrix.push(this.current_word)

			// clear current word
			this.current_word = ""

		} else {
			// todo: shake row animation
			if (current_line) {
				current_line.classList.add("shake")
			}
		}
    }

	// color the block and it's matching key
	color_block (row: number, col: number, letter: string, color: string) {
		let current_line = document.querySelector(`#row${row + 1}`) as HTMLElement | null
		let key = document.querySelector(`#${letter}`) as HTMLElement | null

		// if all of certaion letter is green, don't make 

		if(current_line) {
			let current_block = current_line.children[col] as HTMLElement | null
			if (current_block) {
				current_block.style.background = `${color}`
				current_block.style.borderColor = `${color}`
			}
		}

		if (key) {
			if (color != "#c9b458" || !this.green_letters.includes(`${letter}`) ) {
				key.style.background = `${color}`
			}
		}
	}


    // validate word
	validate (word: string): Promise<boolean> {
		const options = {
			method: 'GET',
			headers: {
				'X-RapidAPI-Key': '32a9c3217dmsh49f989f21debd9cp1702d5jsn199e098396bb',
				'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
			}
		};

		return fetch(`https://wordsapiv1.p.rapidapi.com/words/${word.toLowerCase()}`, options)
			.then(response => {
				if(!response.ok) {
					return false
				}
				return true
			})
	}

    // win condition
    game_won () {
		let finished_modal = document.getElementById("#finished") as HTMLElement | null
		if (finished_modal) {
			finished_modal.classList.add("is-active")
		}
	}

    // lose condition
	game_lost () {

	}

	// info pressed
	info () {
		alert('info')
	}

	// generate word
	gen_word () {
		
	}
}
