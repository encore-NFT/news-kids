function Comment({comment, commentCount, newsId}) {
    console.log(comment)
    return (
        <p>
            <></>{comment.user} {comment.content}
        </p>
    )
}

export default Comment;