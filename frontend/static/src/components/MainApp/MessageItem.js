function MessageItem(props) {
    return (
      <li>
        <h3>{props.message.author.username}</h3>
        <p>{props.message.text}</p>
      </li>
    );
  }
  
  export default MessageItem;