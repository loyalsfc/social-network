import dummyData from "./dummy-data"


export default [
      {
        "sender": dummyData[2],
        "timestamp": "2024-04-13T00:32:00.000Z",
        "content": "Hi Beatrice, how are you doing today?",
        "isRead": true,  // Mark the message as unread initially
        "timeRead": "2024-04-13T00:34:30.000Z"   // No read time yet
      },
      {
        "sender": dummyData[0],
        "timestamp": "2024-04-13T00:33:00.000Z",
        "content": "Hey Alex, I'm doing well! Just finished a call. What about you?",
        "isRead": true,   // Mark the message as read (assuming Beatrice sees it right away)
        "timeRead": "2024-04-13T00:33:30.000Z"  // Set a read time for Beatrice's message
      },
      {
        "sender": dummyData[2],
        "timestamp": "2024-04-13T00:34:00.000Z",
        "content": "Great! Just working on a project. Anything exciting happening on your end?",
        "isRead": true,  // Mark the message as unread initially
        "timeRead": "2024-04-13T00:32:00.000Z"   // No read time yet
      },
      {
        "sender": dummyData[0],
        "timestamp": "2024-04-13T00:35:00.000Z",
        "content": "Actually, yes! I might have some news about that promotion I mentioned.",
        "isRead": true,  // Mark the message as unread initially
        "timeRead": "2024-04-13T00:33:16.000Z"   // No read time yet
      },
      {
        "sender": dummyData[2],
        "timestamp": "2024-04-13T00:36:00.000Z",
        "content": "Wow, really? That's fantastic news! Tell me more!",
        "isRead": false,  // Mark the message as unread initially
        "timeRead": null   // No read time yet
      }
]