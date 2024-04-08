import React from 'react'
import dummyData from '@/data/dummy-data'
import Card from './card'

const feedsPost = [
    {
        user: dummyData[0],
        date: "11/03/2023",
        caption: "What can you say about this beautiful landscape",
        photo: "https://images.pexels.com/photos/20755698/pexels-photo-20755698/free-photo-of-a-woman-and-child-standing-on-the-beach.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        likes: 600,
        comments: 200,
        bookmarks: 164,
    },
    {
        user: dummyData[1],
        date: "04/07/2024",
        caption: "What is your favorite among the following",
        photo: "https://images.pexels.com/photos/17685557/pexels-photo-17685557/free-photo-of-a-surfer-is-floating-in-the-ocean.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        likes: 440,
        comments: 20,
        bookmarks: 64,
    },
    {
        user: dummyData[2],
        date: "03/03/2024",
        caption: "For God did not send his son into this world to condemn the world, but through him the word might be save and we will be from the shackes of satan. \n Somebody shoud Jesus",
        likes: 355,
        comments: 120,
        bookmarks: 364,
    },
]

function Feeds() {
    return (
        <div className='space-y-4'>
            {feedsPost.map((item, index) => {
                const {profileImage, name, username, isVerified} = item.user
                return(
                    <Card
                        key={index}
                        profilePicture={profileImage}
                        fullName={name}
                        username={username}
                        date={new Date(item.date)}
                        caption={item.caption}
                        photo={item?.photo}
                        likes={item.likes}
                        comments={item.comments}
                        bookmarks={item.bookmarks}
                        isVerified={isVerified}
                    />
                )
            })}
        </div>
    )
}

export default Feeds