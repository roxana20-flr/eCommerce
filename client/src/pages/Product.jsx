import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Bottom from "../components/Bottom";
import Newsletter from "../components/Newsletter";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethods";
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import "./Home.css";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection:"column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
  background-color: white;
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterCinema = styled.select`
margin-left: 10px;
margin-right: 10px;
padding: 5px;
`;

const FilterCity = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterCityOption = styled.option``;

const FilterCinemaOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  margin-left: 10px;
  padding: 15px;
  border: 2px solid black;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  &:hover{
      background-color: #f8f4f4;
  }
`;

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  // console.log("id2");
  //   console.log(location.pathname);
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [cinema, setCinema] = useState("");
  const [city, setCity] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + id);
        setProduct(res.data);
        // console.log("res2")
        // console.log(res.data)
      } catch {}
    };
    getProduct();
  }, [id]);

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleClick = () => {
    dispatch(
      addProduct({ ...product, quantity, cinema, city })
  );
  };



  return (
    <Container className="home">
      <Announcement />
      <Navbar />
      <Wrapper>
        <ImgContainer>
          <Image src={product.img} alt="imagine"/>
        </ImgContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>
            {product.desc}
          </Desc>
          <Price>{product.price} Lei</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Cinema</FilterTitle>
              <FilterCinema onChange={(e) => setCinema(e.target.value)}>
              {product.cinema?.map((s) => (
                  <FilterCinemaOption key={s}>{s}</FilterCinemaOption>
                ))}
              </FilterCinema>
            </Filter>
            <Filter>
              <FilterTitle>City</FilterTitle>
              <FilterCity onChange={(e) => setCity(e.target.value)}>
              {product.city?.map((s) => (
                  <FilterCityOption key={s}>{s}</FilterCityOption>
                ))}
              </FilterCity>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
            <Remove style={{cursor: "pointer"}} onClick={() => handleQuantity("dec")} />
              <Amount>{quantity}</Amount>
              <Add style={{cursor: "pointer"}} onClick={() => handleQuantity("inc")} />
            </AmountContainer>
            <Button onClick={handleClick}>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
      <Bottom/>
    </Container>
  );
};

export default Product;