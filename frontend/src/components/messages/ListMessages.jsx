import Spinner from 'react-bootstrap/Spinner';

const ListMessages = (props) => {
  const { currentChannelMessages, isLoading } = props;

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <div>
      {currentChannelMessages?.map((message) => (
        <div className="text-break mb-2" key={message.id}>
          <b>{message.username}</b>: {message.body}
        </div>
      ))}
    </div>
  );
};

export default ListMessages;
