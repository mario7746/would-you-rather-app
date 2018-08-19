import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import Avatar from '@material-ui/core/Avatar'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';



import './style.css'


const Question = (props) => {
  const { question } = props
  const { author, optionOne, optionTwo, date } = question

  const questionButton = (text, votes) => {
    const { authedUser } = props
    const buttonVar = votes.includes(authedUser.id) ? "contained" : "outlined"

    return votes.length ? (
      <Badge color="secondary" badgeContent={votes.length}>
        <Button variant={buttonVar} color="primary">
          {text}
        </Button>
      </Badge>
      ) : (
      <Button variant={buttonVar} color="primary">
        {text}
      </Button>
      )
  }

  return (
    <div>
    <ListItem>
      <Paper className='question-card'>
        <div className='question-card__user'>
          <Avatar src={author.avatarURL}/>
          <ListItemText primary={author.name} secondary={moment(date).format('ll')} />
        </div>
        <div className="question-card__questions">
          <h5>Would You Rather</h5>
          {questionButton(optionOne.text, optionOne.votes)}
          <p>or</p>
          {questionButton(optionTwo.text, optionTwo.votes)}
        </div>
      </Paper>
    </ListItem>
    <Divider/>
    </div>
  )
}

const mapStateToProps = ({authedUser, users, questions}, { id }) => {
  const question = questions[id]

  return {
    authedUser,
    question: {
      id: id,
      author: users[question.author],
      optionOne: {
        votes: question.optionOne.votes,
        text: question.optionOne.text
      },
      optionTwo: {
        votes: question.optionTwo.votes,
        text: question.optionTwo.text
      },
      date: question.timestamp
    }
  }
}

export default connect(mapStateToProps)(Question)