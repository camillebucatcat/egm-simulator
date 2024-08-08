import { Component } from '@angular/core';

type ReelItem = { id: number, name: string };
let BaseReelItem = [
  { id: 1, name: 'bar' },
  { id: 1, name: 'bar' },
  { id: 2, name: 'cherry' },
  { id: 3, name: 'seven' },
  { id: 4, name: 'koin' },
  { id: 4, name: 'koin' },
  { id: 5, name: 'blank' },
  { id: 6, name: 'bar' },
  { id: 7, name: 'cherry' },
  { id: 8, name: 'seven' },
  { id: 9, name: 'blank' },
  { id: 10, name: 'koin' },
  { id: 11, name: 'blank' },
  { id: 12, name: 'bar' },
  { id: 13, name: 'bar' },
  { id: 4, name: 'koin' },
  { id: 14, name: 'seven' },
  { id: 4, name: 'koin' },
  { id: 16, name: 'bar' },
]
@Component({
  selector: 'app-slot-machine',
  templateUrl: './slot-machine.component.html',
  styleUrl: './slot-machine.component.scss'
})
export class SlotMachineComponent {
  symbols: ReelItem[] = [...BaseReelItem]
  symbols2: ReelItem[] = [...BaseReelItem]
  symbols3: ReelItem[] = [...BaseReelItem]
  rolling = false;
  buttonDisabled: boolean = false;
  minusDisabled: boolean = false;
  plusDisabled: boolean = false;
  credits: number = 1000;
  bet: number = 100;
  win: number = 0;

  shuffleArray(array: ReelItem[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  startRandomizingArray(array: any[], interval: number, duration: number) {
    const intervalId1 = setInterval(() => {
      this.shuffleArray(array);
    }, interval);

    setTimeout(() => {
      clearInterval(intervalId1);
    }, duration);
  }

  checkCredits() {
    if (this.bet > this.credits) {
      this.buttonDisabled = true;
    } else {
      this.buttonDisabled = false;
    }
  }

  checkBet() {
    if (this.bet <= 100) {
      this.minusDisabled = true;
    } else if (this.bet >= this.credits) {
      this.plusDisabled = true;
    } else {
      this.plusDisabled = false;
      this.minusDisabled = false;
    }
  }


  ngOnInit() {
    this.checkCredits();
    this.checkBet();
    this.startRandomizingArray(this.symbols, 100, 100);
    this.startRandomizingArray(this.symbols2, 100, 100);
    this.startRandomizingArray(this.symbols3, 100, 100);
  }

  roll() {
    this.credits = this.credits - this.bet;
    this.rolling = true;
    this.win = 0;
    this.startRandomizingArray(this.symbols, 100, 1500);
    this.startRandomizingArray(this.symbols2, 100, 2500);
    this.startRandomizingArray(this.symbols3, 100, 3500);
    this.checkCredits();
    this.checkBet();

    if (this.rolling == true) {
      this.buttonDisabled = true;
      console.log('disable spin')
    } else {
      console.log('enable spin')
    }

    setTimeout(() => {
      this.rolling = false;
      console.log(this.symbols[1].name, this.symbols2[1].name, this.symbols3[1].name)
      console.log(this.symbols[0].name, this.symbols2[0].name, this.symbols3[0].name)


      if (this.symbols[1].name === 'koin' && this.symbols2[1].name === 'koin' && this.symbols3[1].name === 'koin') {
        setTimeout(() => {
          this.credits = this.credits + (this.bet * 5);
          this.checkCredits();
          this.checkBet();
          this.win = this.bet * 5;

        }, 1000);
      } else if (this.symbols[1].name === 'seven' && this.symbols2[1].name === 'seven' && this.symbols3[1].name === 'seven') {
        setTimeout(() => {
          this.credits = this.credits + (this.bet * 4);
          this.checkCredits();
          this.checkBet();
          this.win = this.bet * 4;

        }, 1000);
      } else if (this.symbols[1].name === 'bar' && this.symbols2[1].name === 'bar' && this.symbols3[1].name === 'bar') {
        setTimeout(() => {
          this.credits = this.credits + (this.bet * 3);
          this.checkCredits();
          this.checkBet();
          this.win = this.bet * 3;

        }, 1000);
      } else if (this.symbols[1].name === 'cherry' && this.symbols2[1].name === 'cherry' && this.symbols3[1].name === 'cherry') {
        setTimeout(() => {
          this.credits = this.credits + (this.bet * 2);
          this.checkCredits();
          this.checkBet();
          this.win = this.bet * 2;

        }, 1000);
      } else {
        setTimeout(() => {
          alert('try again')
          this.checkCredits();
          this.checkBet();
        }, 1000);
      }
    }, 3500);
  }

  minus() {
    this.bet = this.bet - 100;
    this.checkCredits();
    this.checkBet();

  }

  plus() {
    this.bet = this.bet + 100;
    this.checkCredits();
    this.checkBet();
  }
} 
