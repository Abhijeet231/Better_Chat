import { useChatStore } from "../store/useChatStore.js";
import { useEffect } from "react";
import MessageInput from "./MessageInput.jsx";
import ChatHeader from "./ChatHeader.jsx";
import MessageSkeleton from "./skeletons/MessageSkeleton.jsx";


const ChatContainer = () => {

    const{messages, getMessages, isMessagesLoading, selectedUser} = useChatStore();

    useEffect(() => {
        getMessages(selectedUser._id)
    },[selectedUser._id, getMessages])


    if(isMessagesLoading) return (
        <div className="flex-1 flex flex-col overflow-auto">
            <ChatHeader/>
             <MessageSkeleton/>
             <MessageInput/>
        </div>
    )

   
    

    

    return(
        <div className="flex-1 flex flex-col overflow-auto">
            <ChatHeader/>

            <p>Messages....</p>

            </>
          
        </div>
    )
};

export default ChatContainer;