import {Component, Input, OnInit} from '@angular/core'

@Component({
  selector: 'app-table-cell',
  templateUrl: './table-cell.component.html'
})
export class TableCellComponent implements OnInit {
  @Input() match: any
  @Input() same = false
  score: string
  type: string

  constructor() {
  }

  ngOnInit() {
    if (this.match === undefined) { return }

    this.score = this.match.team1.score + ':' + this.match.team2.score

    if (this.match.team1.score > this.match.team2.score) {
      this.type = 'win'
    } else if (this.match.team1.score < this.match.team2.score) {
      this.type = 'lose'
    } else {
      this.type = 'draw'
    }
    // console.log(this.match)
  }
}
