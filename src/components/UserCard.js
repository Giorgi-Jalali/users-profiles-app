import styled from "styled-components";
import { Link } from "react-router-dom";

export default function UserCard({ user }) {
  return (
    <Link
      to={`/user/${user.id}`}
      style={{ color: "#54a1f0", textDecoration: "none" }}
    >
      <Card>
        <img
          width={275}
          src={`${user.imageUrl}?v=${user.id}`}
          alt={user.name}
        />
        <h4>
          {user.prefix} {user.name} {user.lastName}
        </h4>
        <br />
        <p>
          <i>{user.title}</i>
        </p>
      </Card>
    </Link>
  );
}

const Card = styled.div`
  width: 310px;
  border: 2.5px solid #54a1f0;
  border-radius: 20px;
  padding: 15px;
  margin: 15px 0 50px 0;
  cursor: pointer;
`;

export { Card };
