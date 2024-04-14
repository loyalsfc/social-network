import dummyData from "./dummy-data"

export default [
    {
        user: dummyData[0],
        snippet: "Not too bad, just trying to catch up on some work. How about you?",
        timestamp: "5s",
        isIncoming: true,
        isRead: false,
        unreadCount:1
    },
    {
        user: dummyData[1],
        snippet: "when will it be ready?",
        timestamp: "20s",
        isIncoming: false,
        isRead: true,
    },
    {
        user: dummyData[2],
        snippet: "Good point. Typography is another aspect I'm curious about. Any font suggestions for a modern look?",
        timestamp: "18h",
        isIncoming: false,
        isRead: true,
    },
    {
        user: dummyData[3],
        snippet: "That's a good idea. I'll have to try that. So, what's the latest on the new client account we're wor",
        timestamp: "1d",
        isIncoming: false,
        isRead: false,
    },
    {
        user: dummyData[4],
        snippet: "Sure, that sounds good. I need to take a break from staring at my computer screen all day.",
        timestamp: "12h",
        isIncoming: true,
        isRead: false,
        unreadCount:1
    },
    {
        user: dummyData[0],
        snippet: "Thanks, I appreciate it. Hey, do you want to grab lunch together later?",
        timestamp: "2w",
        isIncoming: true,
        isRead: false,
        unreadCount:2
    },
]