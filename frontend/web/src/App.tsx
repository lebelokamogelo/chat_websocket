export default function App() {
  const chatSocket = new WebSocket("ws://" + window.location.host + "/ws/chat/")

  chatSocket.onmessage = function () {}

  chatSocket.onclose = function () {
    console.error("Chat socket closed unexpectedly")
  }

  return (
    <div className="background bg-slate-50 h-[100dvh]">
      <div className="max-w-7xl mx-auto">
        <p className="py-2">Chat Websockets</p>
      </div>
    </div>
  )
}
