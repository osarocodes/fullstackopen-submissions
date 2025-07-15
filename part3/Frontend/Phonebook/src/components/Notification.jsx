const Notification = ({ message, color }) => {
  const notificationStyle = {
    background: color
  }

  return (
    <div>
      {message && (
        <div className={"notification"} style={notificationStyle}>
          { message }
        </div>
      )}
    </div>
  )
}
export default Notification;