import "../styles.css";

export const Notification = ({ message, error }) => {
  if (message === null) {
    return null;
  }

  return <div className={error ? "error" : "success"}>{message}</div>;
};
