import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logo } from "../data";
import cinema from "../images/cinema.png"

const Container = styled.div`
  height: 80px;
  background-color: white;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 15px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  font-size: 25px;
  ${mobile({ fontSize: "20px" })}
`;

const Line = styled.div`
  height: 30px;
  width: 2px;
  background-color: black;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  color: black;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Image = styled.img`
  height: 50px;
`;

const Navbar = () => {
  const quantity = useSelector(state=>state.cart.quantity)
  
  return (
    <Container>
      <Wrapper>
        <Left>
        <Link to={`/`}>
          <Image src={cinema}></Image>
        </Link>
        </Left>
        <Center>
        <Link style={{textDecoration: 'none', color: "black"}}  to={`/products/bilete`}>
          <Logo>Bilete</Logo>
          </Link>
        </Center>
        <Line/>
        <Center>
          <Logo>Oferte</Logo>
        </Center>
        <Line/>
        <Center>
          <Logo>Vauchere</Logo>
        </Center>
        <Right>
          <MenuItem>REGISTER</MenuItem>
          <MenuItem>SIGN IN</MenuItem>
          <Link to="/cart">
          <MenuItem>
            <Badge badgeContent={quantity} color="primary">
              <ShoppingCartOutlined />
            </Badge>
          </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;