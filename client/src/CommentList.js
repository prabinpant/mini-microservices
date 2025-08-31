const CommentList = ({ comments }) => {
  const renderedComments = comments.map((comment) => {
    return (
      <li key={comment.id}>
        {comment.content} - {comment.status}
      </li>
    );
  });

  return <ul>{renderedComments}</ul>;
};

export default CommentList;
