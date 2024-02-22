import { useState } from "react"

const chatSocket = new WebSocket("ws://127.0.0.1:8000/ws/chat/")

type Message = {
  text: String
  timestamp: String
}

export default function App() {
  const [message, setMessage] = useState<Message[]>([])
  const [input, setInput] = useState("")

  chatSocket.onmessage = function (e) {
    const data = JSON.parse(e.data)
    const message = JSON.parse(data["message"])

    setMessage((prev) => [...prev, message])
  }

  const sendMessage = (message: String) => {
    if (message)
      chatSocket.send(
        JSON.stringify({
          message: message,
        })
      )
    setInput("")
  }

  chatSocket.onclose = function () {
    console.error("Chat socket closed unexpectedly")
  }

  return (
    <div className="background bg-slate-50 h-[100dvh]">
      <div className="max-w-3xl mx-auto h-full flex flex-col justify-between">
        <nav className="shadow-sm text-center py-4">
          <p className="text-lg">Chat Websocket</p>
        </nav>
        <main className="messages flex-1 mb-1 pt-2 px-2 md:px-0 overflow-y-scroll space-y-3 border">
          {message?.map((message, index) => (
            <div key={index} className="chat px-2 py-1 flex flex-col space-y-1">
              <p className="text-base font-medium text-slate-800">
                {message.text}
              </p>
              <span className="timestamp text-xs font-semibold text-slate-700">
                {new Date(message.timestamp.toString()).toLocaleTimeString()}
              </span>
            </div>
          ))}
        </main>
        <footer>
          <div className="input flex border">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 outline-none p-3 text-lg"
              type="text"
              placeholder="Type a message..."
            />
            <button
              className="bg-blue-500 px-4 py-2 w-20 text-white font-semibold"
              onClick={() => sendMessage(input)}
            >
              Send
            </button>
          </div>
        </footer>
      </div>
    </div>
  )
}
