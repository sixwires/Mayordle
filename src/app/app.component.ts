import { Component, HostListener } from '@angular/core';
import { Game } from './game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'Mayaourdle';
	row_1_btns = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']
	row_2_btns = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']
	row_3_btns = ['Z', 'X', 'C', 'V', 'B', 'N', 'M']

	@HostListener('document:keypress', ['$event'])
	handleKeyboardEvent(event: KeyboardEvent) {
		event.stopImmediatePropagation()
		if (event.key.match(/[a-z]$/) && event.key.length == 1) {
			this.game.add_letter(`${event.key.toUpperCase()}`)
		}

		if (event.key.toUpperCase() == "ENTER") {
			this.game.enter()
		}
  	}

	@HostListener('document:keydown.backspace', ['$event'])
	onDeleteComponent(event: KeyboardEvent) {
		this.game.remove_letter();
	}

	constructor(public game: Game) {

	}

	close_modal () {
		let current_line = document.getElementById("#finished") as HTMLElement | null
		if (current_line) {
			current_line.classList.remove("is-active")
		}
	}
}
