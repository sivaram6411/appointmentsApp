// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleStarButton} = props
  const {id, name, date, isStar} = appointmentDetails
  const starImageUrl = isStar
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  const onClickStarButton = () => {
    toggleStarButton(id)
  }

  return (
    <li className="list-container">
      <div className="name-date">
        <p className="name">{name}</p>
        <p className="date">Date:{date}</p>
      </div>
      <button
        className="star-button"
        type="button"
        onClick={onClickStarButton}
        data-testid="star"
      >
        <img src={starImageUrl} alt="star" className="star-image" />
      </button>
    </li>
  )
}
export default AppointmentItem
