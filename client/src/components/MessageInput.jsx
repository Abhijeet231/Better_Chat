import { useRef, useState } from 'react'

const MessageInput = () => {

  const [text, setText] = useState("");
  const [imagePreviw, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);


  return (
    <div>MessageInput</div>
  )
}

export default MessageInput