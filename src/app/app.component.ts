import {Component, OnInit} from '@angular/core'
import {url_slug} from './url_slug'

declare var require: any
const tableData = require('./result.json')

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {
  table = []
  matches = {}
  teamGoals = []
  playersGoals = []

  ngOnInit() {
    tableData.teams.forEach((value: string) => {
      this.table.push({name: value, p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0})
      this.teamGoals.push({name: value, goals: []})
    })

    this.countPoints()
    this.table.sort((a, b) => b.p - a.p)
  }

  matchId(name1: string, name2: string) {
    return url_slug(name1 + name2, {delimiter: '', lowercase: false})
  }

  gameData(team1Name: string, team2Name: string) {
    let match = this.matches[this.matchId(team1Name, team2Name)]
    if (match) {
      return match
    }

    match = this.matches[this.matchId(team2Name, team1Name)]
    if (match) {
      return {team1: match.team2, team2: match.team1}
    }
  }

  countPoints() {
    tableData.result.forEach((round: any) =>
      round.games.forEach((game: any) => {
        if (game.status !== 'pending') {
          this.matches[this.matchId(game.team1.name, game.team2.name)] = game
          this.countGameData(game)
          this.fetchGoals(game)
        }
      })
    )
  }

  countGameData(game: any) {
    const tableTeam1 = this.table.filter(item => item.name === game.team1.name)[0]
    const tableTeam2 = this.table.filter(item => item.name === game.team2.name)[0]

    const team1Score = parseInt(game.team1.score, 10)
    const team2Score = parseInt(game.team2.score, 10)

    if (team1Score > team2Score) {
      // team1 win
      tableTeam1.w++
      tableTeam2.l++
      tableTeam1.p = tableTeam1.p + 3
    } else if (team1Score < team2Score) {
      // team2 win
      tableTeam1.l++
      tableTeam2.w++
      tableTeam2.p = tableTeam2.p + 3
    } else {
      // draw
      tableTeam1.d++
      tableTeam2.d++
      tableTeam1.p++
      tableTeam2.p++
    }

    tableTeam1.gf = tableTeam1.gf + team1Score
    tableTeam1.ga = tableTeam1.ga + team2Score
    tableTeam2.gf = tableTeam2.gf + team2Score
    tableTeam2.ga = tableTeam2.ga + team1Score
  }

  fetchGoals(game: any) {
    const teamGoal1 = this.teamGoals.filter(item => item.name === game.team1.name)[0]
    const teamGoal2 = this.teamGoals.filter(item => item.name === game.team2.name)[0]
    const goals1 = game.team1.goals.split(',').filter(String).map(item => item.trim())
    const goals2 = game.team2.goals.split(',').filter(String).map(item => item.trim())

    teamGoal1.goals = teamGoal1.goals.concat(goals1)
    teamGoal2.goals = teamGoal2.goals.concat(goals2)

    goals1.forEach((name: string) => this.addGoalToPlayer(game.team1.name, name))
    goals2.forEach((name: string) => this.addGoalToPlayer(game.team2.name, name))
  }

  addGoalToPlayer(teamName: string, playerName: string) {
    const player = this.playersGoals.filter(item => item.teamName === teamName && item.playerName === playerName)[0]
    if (player) {
      player.count++
    } else {
      this.playersGoals.push({teamName, playerName, count: 1})
    }
  }
}
