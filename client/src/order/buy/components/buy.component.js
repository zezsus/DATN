/** @format */

import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import ShippingAddress from "../elements/address.element";
import { useGetDetailUser } from "../../../navigator/common/hook/navigator.hook";
import SpinnerComponent from "../../../components/spinner.component";
import { BuyProduct } from "../common/assets/buy.style";
import {
  Box,
  Button,
  CardMedia,
  Container,
  IconButton,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Counter, CounterInput } from "../../cart/common/assets/cartitem.style";
import { useCreateOrder } from "../../../common/hook/order.hook";

const BuyComponent = () => {
  const [userId, setUserId] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const location = useLocation();
  const productDetail = location.state?.productDetail;

  const userInfo = useGetDetailUser(userId, accessToken);
  const createOrder = useCreateOrder();

  useEffect(() => {
    const storeToken = localStorage.getItem("accessToken");
    if (localStorage) {
      const decode = jwtDecode(storeToken);
      if (decode) {
        setUserId(decode.userId);
        setAccessToken(storeToken);
      }
    }
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price) + " VNĐ";
  };

  const handleAddQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleSubQuantity = () => {
    quantity > 1 ? setQuantity(quantity - 1) : setQuantity(1);
  };

  const handleBuyNow = () => {
    const newOrder = {
      orderItems: {
        name: productDetail?.name,
        quantity: quantity,
        image: productDetail?.image,
        price: productDetail?.price,
        product: productDetail?._id,
      },
      shippingAddress: {
        name: userInfo.data?.username,
        address: userInfo.data?.address,
        phone: userInfo.data?.phone,
      },
      itemsPrice: productDetail?.price,
      shippingPrice: 20000,
      totalPrice: productDetail?.price * quantity + 20000,
      user: userInfo.data?._id,
      isPaid: false,
      isDelivered: false,
    };

    console.log(newOrder);
    createOrder.mutate(
      { newOrder, accessToken },
      {
        onSuccess: () => {
          console.log("Thêm thành công");
        },
      }
    );
  };

  if (userInfo.isLoading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}>
        <SpinnerComponent />
      </div>
    );
  }

  return (
    <Container
      style={{
        width: "50%",
        boxShadow: "1px 1px 10px gray",
        borderRadius: "10px",
      }}
      sx={{ mt: 2 }}>
      {userInfo && (
        <ShippingAddress
          userData={userInfo.data}
          userId={userId}
          accessToken={accessToken}
        />
      )}
      <BuyProduct sx={{ pt: 3 }}>
        <Box
          style={{ display: "flex", gap: 10, justifyContent: "space-between" }}
          sx={{ pb: 3 }}>
          <Box style={{ display: "flex" }}>
            <CardMedia
              component='img'
              image={productDetail?.image}
              alt={productDetail?.name}
              style={{ width: 180, height: "auto" }}
            />
            <Typography fontWeight={"bold"} fontSize={22}>
              {productDetail?.name}
            </Typography>
          </Box>

          <Typography color={"red"}>
            {formatPrice(productDetail?.price)}
          </Typography>
        </Box>

        <Box display={"flex"} flexDirection={"column"} gap={2}>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Typography fontWeight={"bold"}>Số lượng sản phẩm</Typography>{" "}
            <Counter>
              <IconButton onClick={handleSubQuantity}>
                <RemoveIcon />
              </IconButton>
              <CounterInput value={quantity} />
              <IconButton onClick={handleAddQuantity}>
                <AddIcon />
              </IconButton>
            </Counter>
          </Box>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Typography fontWeight={"bold"}>Tổng giá</Typography>
            <Typography color={"red"}>
              {formatPrice(productDetail?.price * quantity)}
            </Typography>
          </Box>
        </Box>

        <Box display={"flex"} justifyContent={"center"} sx={{ py: 2 }}>
          <Button
            variant='contained'
            color='warning'
            style={{ width: "100%", height: 50 }}
            onClick={handleBuyNow}>
            Đặt hàng
          </Button>
        </Box>
      </BuyProduct>
    </Container>
  );
};
export default BuyComponent;
