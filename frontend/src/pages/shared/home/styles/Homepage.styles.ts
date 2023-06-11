import { styled } from "@mui/system";
import { Card } from "@mui/material";

export const StyledSpan = styled("span")(({ theme }) => ({
  color: "yellow",
  fontSize: "2rem",
  fontWeight: "bold",
  textTransform: "uppercase",
}));

export const StyledCard = styled(Card)`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 2px;
  background-color: #1c0f67;
  color: white;
  border-radius: 2px;
  box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.3);
  &:hover {
    box-shadow: 6px 6px 9px rgba(0, 0, 0, 0.3);
    transform: scale(1.05);
    transition: all 0.3s ease-in-out;
  }
`;
