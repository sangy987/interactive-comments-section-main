import React from 'react'

function EditComment(props) {
  const [score, setScore] = React.useState(props.counter)
  const [editText, setEditText] = React.useState(props.textarea_value)
  function increaseScore() {
    if (score > props.counter) {
      return "";
    }

    var data = JSON.parse(localStorage.getItem("data"));
    for (let i in data.comments) {
      for (let j in data.comments[i].replies) {
        if (data.comments[i].replies[j].id == props.id) {
          data.comments[i].replies[j].score += 1;
          break;
        }
      }
    }
    localStorage.setItem("data", JSON.stringify(data));
    return setScore((prevDate) => prevDate + 1);
  }

  function decreaseScore() {
    if (score < props.counter) {
      return "";
    }

    var data = JSON.parse(localStorage.getItem("data"));
    for (let i in data.comments) {
      for (let j in data.comments[i].replies) {
        if (data.comments[i].replies[j].id == props.id) {
          data.comments[i].replies[j].score -= 1;
          break;
        }
      }
    }
    localStorage.setItem("data", JSON.stringify(data));
    return setScore((prevDate) => prevDate - 1);
  }
  return (
    <div className='comment flex-desktop'>
      <div className='comment-rate comment-rate-flex-column'>
        <img onClick={increaseScore} src='../images/icon-plus.svg' />
        <p>{score}</p>
        <img onClick={decreaseScore} src='../images/icon-minus.svg' />
      </div>
      <div className='flex-column'>
        <div className='user-info'>
          <img className='user-logo' src={props.image} />
          <p className='user-name'>{props.username}</p>
          {props.currentUser && <p className='you-card'>you</p>}
          <p className='comment-date'>{props.createdAt}</p>
          {props.currentUser ? (
            <div className='comment-edit hide'>
              <span onClick={props.handleDelete}>
                <img src='../images/icon-delete.svg' />
                <span className='comment-edit-delete'>Delete</span>
              </span>
              <span onClick={props.handleEdit}>
                <img src='../images/icon-edit.svg' />
                <span className='comment-edit-edit'>Edit</span>
              </span>
            </div>
          ) : (
            <div className='comment-edit hide'>
              <div onClick={props.handleReply}>
                <img src='../images/icon-reply.svg' />
                <span className='comment-edit-reply'>Reply</span>
              </div>
            </div>
          )}
        </div>
        <textarea
          className='edit-text'
          placeholder={props.textarea_placeholder}
          value={editText}
          onInput={(e) => setEditText(e.target.value)}
        >
          {props.comment}
        </textarea>
        <div className='comment-info'>
          <div className='comment-rate show-flex'>
            <img onClick={increaseScore} src='../images/icon-plus.svg' />
            <p>{score}</p>
            <img onClick={decreaseScore} src='../images/icon-minus.svg' />
          </div>
          <div className='comment-edit show'>
            <span onClick={props.handleDelete}>
              <img src='../images/icon-delete.svg' />
              <span className='comment-edit-delete'>Delete</span>
            </span>
            <span onClick={props.handleEdit}>
              <img src='../images/icon-edit.svg' />
              <span className='comment-edit-edit'>Edit</span>
            </span>
          </div>
        </div>
        <button
          className='update-btn'
          onClick={() => props.updateEdit(editText)}
        >
          Update
        </button>
      </div>
    </div>
  )
}

export default EditComment
