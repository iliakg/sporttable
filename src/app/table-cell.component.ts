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

  constructor() {}

  ngOnInit() {
    if (this.match === undefined) {
      return
    }

    const team1Score = parseInt(this.match.team1.score, 10)
    const team2Score = parseInt(this.match.team2.score, 10)

    this.score = team1Score + ':' + team2Score

    if (team1Score > team2Score) {
      this.type = 'win'
    } else if (team1Score < team2Score) {
      this.type = 'lose'
    } else {
      this.type = 'draw'
    }
  }
}
