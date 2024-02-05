const ShowUserData = ({ user }) => {
  return user ? (
    <table className="table">
      <tbody>
        <tr>
          <td>E-Mail</td>
          <td>{user.username}</td>
        </tr>
        <tr>
          <td>Nachname</td>
          <td>{user.lastname}</td>
        </tr>
        <tr>
          <td>Vorname</td>
          <td>{user.firstname}</td>
        </tr>
      </tbody>
    </table>
  ) : null;
};

export default ShowUserData;
