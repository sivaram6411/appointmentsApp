// Write your code here
import {Component} from 'react'
import {v4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    nameInput: '',
    dateInput: '',
    appointmentList: [],
    isStarCond: false,
  }

  toggleStarButton = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachLike => {
        if (eachLike.id === id) {
          return {...eachLike, isStar: !eachLike.isStar}
        }
        return eachLike
      }),
    }))
  }

  onClicksStaredBtn = () => {
    const {isStarCond} = this.state
    this.setState({isStarCond: !isStarCond})
  }

  getFilterStaredList = () => {
    const {isStarCond, appointmentList} = this.state

    if (isStarCond) {
      return appointmentList.filter(eachList => eachList.isStar === true)
    }
    return appointmentList
  }

  onSubmitAddButton = event => {
    event.preventDefault()
    const {nameInput, dateInput} = this.state
    const DateFormat = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''

    if (nameInput !== '' && dateInput !== '') {
      const newAppointment = {
        id: v4(),
        name: nameInput,
        date: DateFormat,
        isStar: false,
      }
      this.setState(prevState => ({
        appointmentList: [...prevState.appointmentList, newAppointment],
        nameInput: '',
        dateInput: '',
      }))
    } else if (nameInput === '') {
      // eslint-disable-next-line no-alert
      alert('Please Enter title')
    } else if (dateInput === '') {
      // eslint-disable-next-line no-alert
      alert('Please select date')
    }
  }

  onChangeInputName = event => {
    this.setState({nameInput: event.target.value})
  }

  onChangeInputDate = event => {
    this.setState({dateInput: event.target.value})
  }

  render() {
    const {nameInput, dateInput} = this.state
    const FilterImportantList = this.getFilterStaredList()

    return (
      <div className="container">
        <div className="sub-container">
          <h1 className="heading">Add Appointments</h1>
          <div className="form-image">
            <form className="form-container" onSubmit={this.onSubmitAddButton}>
              <label className="title" htmlFor="title">
                Title
              </label>
              <input
                type="text"
                className="input"
                id="title"
                onChange={this.onChangeInputName}
                placeholder="Title"
                value={nameInput}
              />
              <label htmlFor="date" className="title">
                Date
              </label>
              <input
                type="date"
                className="input"
                id="date"
                onChange={this.onChangeInputDate}
                value={dateInput}
              />
              <button className="add-btn" type="submit">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="image"
            />
          </div>
          <hr className="hr-line" />
          <div className="appointment-star-container">
            <p className="appointment-heading">Appointments</p>
            <button
              className="star-btn"
              type="button"
              onClick={this.onClicksStaredBtn}
            >
              Starred
            </button>
          </div>
          <ul className="unorder-list">
            {FilterImportantList.map(eachItem => (
              <AppointmentItem
                key={eachItem.id}
                appointmentDetails={eachItem}
                toggleStarButton={this.toggleStarButton}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
