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

    let team1Score: any = parseInt(this.match.team1.score, 10)
    let team2Score: any = parseInt(this.match.team2.score, 10)

    if (isNaN(team1Score)) {
      team1Score = '-'
    }
    if (isNaN(team2Score)) {
      team2Score = '-'
    }

    this.score = team1Score + ':' + team2Score


    if (isNaN(team1Score)) {
      this.type = 'lose'
    } else if (team1Score > team2Score) {
      this.type = 'win'
    } else if (team1Score < team2Score) {
      this.type = 'lose'
    } else {
      this.type = 'draw'
    }
  }
}
