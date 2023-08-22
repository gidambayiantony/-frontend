"use client";

import {
  Box,

  FormControl,
  FormLabel,
  Heading,
  Input,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
} from "@chakra-ui/react";
import ButtonComponent from "@components/Button";
import { Images, ThemeColors } from "@constants/constants";
// import Image from "next/image";
import { useEffect } from "react";
import { useState } from "react";

import { useSelector } from "react-redux";
import { useToast } from "@chakra-ui/react";
import { redirect, useRouter } from "next/navigation";
import TabOne from "@components/modals/tabs/TabOne";
import TabTwo from "@components/modals/tabs/TabTwo";
import TabThree from "@components/modals/tabs/TabThree";
import {
  useCartDeleteMutation,
  useCartMutation
} from "@slices/productsApiSlice";
import CartCard from "@components/CartCard";
import { FormatCurr } from "@utils/utils";

const Cart = () => {
  const [Cart, setCart] = useState([]);
  const [CartTotal, setCartTotal] = useState(0);
  const [tabIndex, setTabIndex] = useState(0);
  const [tabOneData, setTabOneData] = useState({});

  const { onOpen, onClose, isOpen } = useDisclosure();

  // get user information stored in the localstorage
  const { userInfo } = useSelector((state) => state.auth);

  const [fetchCart] = useCartMutation();
  const [deleteCartItem] = useCartDeleteMutation();

  const chakraToast = useToast();
  const router = useRouter();

  // function handle fetching data
  const handleDataFetch = async () => {
    const res = await fetchCart(userInfo?._id).unwrap();

    try {
      if (res.status && res.status == "Success") {
        // combine the data of each cart item with its products information into one single object
        // variables to hold data for cart items and product items
        let CartItems = res?.data.CartItems ? res?.data.CartItems : [];
        let CartProductsItems = res?.data.CartProductsItems
          ? res?.data.CartProductsItems
          : [];

        const TempCart = [];

        // loop through the arrays and combine the data
        if (CartItems?.length > 0 && CartProductsItems?.length > 0) {
          for (let cart of CartItems) {
            TempCart.push({
              ...cart,
              cartId: cart._id,
              ...CartProductsItems.filter(
                (product) => product._id === cart.productId
              )[0],
            });
          }
        }

        setCart([...TempCart]);

        calcCartTotal([...TempCart]);
      } else {
        CartProductsItems = [];
      }

      // setCart(CartProductsItems);
    } catch (error) {
      console.log(error);
    }
  };

  // function to calculate the cart total
  const calcCartTotal = (param) => {
    let newCartTotal = [];
    if (param) {
      newCartTotal = param.reduce((a, b) => {
        return a + parseInt(b?.price) * parseInt(b?.quantity);
      }, 0);
    } else {
      newCartTotal = Cart.reduce((a, b) => {
        return a + parseInt(b?.price) * parseInt(b?.quantity);
      }, 0);
    }

    setCartTotal((prevState) => newCartTotal);
  };

  // function to delete cart item
  const handleDeleteCartItem = async (id) => {
    try {
      const res = await deleteCartItem(id).unwrap();

      if (res?.status && res?.status == "Success") {
        chakraToast({
          title: "Success",
          description: `Successfully deleted item`,
          status: "success",
          duration: 4000,
          isClosable: false,
        });

        handleDataFetch();
        calcCartTotal();
      }
    } catch (err) {
      console.log({ err });

      chakraToast({
        title: "Error",
        description: err.data?.message
          ? err.data?.message
          : err.data || err.error,
        status: "error",
        duration: 5000,
        isClosable: false,
      });
    }
  };

  // function to handle increasing and reducing product quantity
  const IncreaseProductQuantity = (id) => {
    // find the index of the product in the cart array
    const currentProductIndex = Cart.findIndex((cart) => cart.cartId === id);

    // Increase product quantity
    let updatedProduct = {
      ...Cart[currentProductIndex],
      quantity: Cart[currentProductIndex].quantity + 1,
    };

    // update the CartProduct array
    setCart([
      ...Cart.slice(0, currentProductIndex),
      updatedProduct,
      ...Cart.slice(currentProductIndex + 1),
    ]);

    calcCartTotal();
  };

  const ReduceProductQuantity = (id) => {
    // check if the current product quantity is 1. If true don't reduce else reduce
    // find the index of the product in the cart array
    const currentProductIndex = Cart.findIndex((cart) => cart.cartId === id);

    // Reduce product quantity
    let updatedProduct = {
      ...Cart[currentProductIndex],
      quantity:
        Cart[currentProductIndex].quantity === 1
          ? Cart[currentProductIndex].quantity
          : Cart[currentProductIndex].quantity - 1,
    };

    // update the CartProduct array
    setCart([
      ...Cart.slice(0, currentProductIndex),
      updatedProduct,
      ...Cart.slice(currentProductIndex + 1),
    ]);

    calcCartTotal();
  };

  useEffect(() => {
    handleDataFetch();
    calcCartTotal();
  }, []);

  return (
    <>
      <Box>
        <Box
          padding={{
            base: "1rem 2rem 5rem 2rem",
            md: "1rem 2rem 5rem 2rem",
            xl: "1rem 2rem",
          }}
        >
          <Box padding={{ base: "0", md: "0", xl: "0 2rem" }}>
            <Heading as={"h2"} size={"lg"}>
              Your Cart
            </Heading>
          </Box>
          <Box
            padding={{
              base: "1rem 0 3rem 0",
              md: "1rem 0 3rem 0",
              xl: "1rem 3rem",
            }}
            overflowX={"auto"}
          >
            <div className="flex lg:flex-row flex-col">
              <div className="lg:w-[70%] w-full lg:pb-12 pb-4 pt-4">
                <div className="lg:border-b-2 border-b-0 border-light max-h-[550px] overflow-y-auto lg:overflow-y-hidden">
                  {Cart.length > 0 &&
                    Cart.map((cart, index) => (
                      <CartCard
                        key={index}
                        cart={cart}
                        ReduceProductQuantity={ReduceProductQuantity}
                        IncreaseProductQuantity={IncreaseProductQuantity}
                        handleDeleteCartItem={handleDeleteCartItem}
                      />
                    ))}
                </div>
              </div>

              <div className="lg:w-[30%] w-full">
                {Cart.length > 0 ? (
                  <div className="lg:py-4 lg:px-4 py-0 px-2">
                    <div className="">
                      <div className="hidden mb-4">
                        <div className="p-4 border-[1.9px] border-light rounded-md">
                          <div className="py-1">
                            <h2 className="text-lg font-bold">
                              Discount Coupon
                            </h2>
                          </div>

                          <div className="py-1">
                            <form>
                              <FormControl>
                                <Input
                                  name="coupon"
                                  type="text"
                                  id="coupon"
                                  placeholder="Coupon"
                                />
                                <div className="py-2">
                                  <ButtonComponent
                                    text={"Apply Coupon"}
                                    type={"submit"}
                                  />
                                </div>
                              </FormControl>
                            </form>
                          </div>
                        </div>
                      </div>

                      <div className="border-[1.9px] border-light rounded-md p-4">
                        <div>
                          <div className="py-2 border-b-[1.9px] border-b-light">
                            <div className="flex">
                              <h2 className="text-lg">Cart Items:</h2>
                              <p className="text-lg mx-2">
                                {Cart ? Cart?.length : 0}
                              </p>
                            </div>
                          </div>

                          <div className="py-2 border-b-[1.9px] border-b-light">
                            <div className="flex">
                              <h2 className="text-lg">Cart SubTotal:</h2>
                              <p className="text-lg mx-2">
                                UGX {FormatCurr(CartTotal)}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="py-2">
                          <div className="w-[5rem]" onClick={onOpen}>
                            <ButtonComponent
                              text={"Checkout"}
                              type={"submit"}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            {/* <Box>
              <Box
                padding={"0"}
                borderBottom={"1.7px solid " + ThemeColors.lightColor}
                maxHeight={{ base: "550px", md: "500px" }}
                overflowY={{ base: "auto", md: "auto", xl: "hidden" }}
              >
                {Cart.length > 0 ? (
                  Cart.map((cart, index) => (
                    <Flex
                      key={cart?.cartId ? cart?.cartId : index}
                      flexShrink={1}
                      display={{ base: "block", md: "block", xl: "flex" }}
                    >
                      <Box
                        width={{ base: "100%", md: "100%", xl: "15%" }}
                        padding={"0 2rem"}
                        height={{ base: "120px", md: "150px", xl: "auto" }}
                      >
                        <Flex
                          alignContent={"center"}
                          justifyContent={"center"}
                          height={"100%"}
                        >
                          <Image
                            alt=""
                            src={`${cart?.images ? cart.images : ""}`}
                            style={{
                              height: "100%",
                              width: "auto",
                              margin: "auto",
                            }}
                          />
                        </Flex>
                      </Box>
                      <Box
                        width={"25%"}
                        padding={"1rem"}
                        display={{ base: "none", md: "none", xl: "block" }}
                      >
                        <Text fontSize={"lg"}>
                          {cart?.name ? cart?.name : ""}
                        </Text>
                      </Box>
                      <Box
                        width={"15%"}
                        padding={"1rem"}
                        display={{ base: "none", md: "none", xl: "block" }}
                      >
                        <Flex
                          borderRadius={"0.3rem"}
                          border={"1.7px solid " + ThemeColors.darkColor}
                          padding={"0.2rem"}
                        >
                          <Button
                            background={"none"}
                            padding={"0.2rem"}
                            margin={"0 0.2rem"}
                            onClick={() =>
                              IncreaseProductQuantity(
                                cart?.cartId ? cart?.cartId : index
                              )
                            }
                          >
                            <AiOutlinePlus size={21} />
                          </Button>
                          <Box
                            padding={"0.2rem"}
                            borderRadius={"0.3rem"}
                            border={"1.7px solid " + ThemeColors.darkColor}
                            width={"3rem"}
                          >
                            <Text fontSize={"md"}>
                              {cart?.quantity ? cart?.quantity : 1}
                            </Text>
                          </Box>
                          <Button
                            background={"none"}
                            padding={"0.2rem"}
                            margin={"0 0.2rem"}
                            onClick={() =>
                              ReduceProductQuantity(
                                cart?.cartId ? cart?.cartId : index
                              )
                            }
                          >
                            <AiOutlineMinus size={21} />
                          </Button>
                        </Flex>
                      </Box>
                      <Box
                        width={"15%"}
                        padding={"1rem"}
                        display={{ base: "none", md: "none", xl: "block" }}
                      >
                        <Text fontSize={"lg"}>
                          {UGX(cart?.price ? cart?.price : 0).format()}
                        </Text>
                      </Box>
                      <Box
                        width={"20%"}
                        padding={"1rem"}
                        display={{ base: "none", md: "none", xl: "block" }}
                      >
                        <Text fontSize={"lg"}>
                          {cart?.total
                            ? UGX(cart?.total ? cart?.total : 0).format()
                            : 0}
                        </Text>
                      </Box>
                      <Box
                        width={"10%"}
                        padding={"1rem"}
                        display={{ base: "none", md: "none", xl: "block" }}
                      >
                        <FaTrashAlt
                          size={30}
                          onClick={() => handleDeleteCartItem(cart?.cartId)}
                          style={{ cursor: "pointer" }}
                        />
                      </Box>
                    </Flex>
                  ))
                ) : (
                  <Box padding={"3rem 0"}>
                    <Text fontSize={"3xl"}>Your cart is empty</Text>
                  </Box>
                )}
              </Box>
            </Box> */}
          </Box>
        </Box>
      </Box>

      {/* // modal form */}
      <Box>
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          size={"4xl"}
          padding={"1rem 0"}
        >
          {/* <ModalOverlay /> */}
          <ModalContent padding={"2rem 3rem"}>
            <ModalCloseButton size={"lg"} color={ThemeColors.darkColor} />
            <Box padding={"1rem 0"}>
              {tabIndex === 0 ? (
                <TabOne
                  updateTabIndex={setTabIndex}
                  fetchData={setTabOneData}
                />
              ) : tabIndex === 1 ? (
                <TabTwo
                  Cart={Cart}
                  updateTabIndex={setTabIndex}
                  tabOneData={tabOneData}
                />
              ) : (
                <TabThree
                  updateTabIndex={setTabIndex}
                  data={{
                    Carts: Cart,
                    Orders: { ...tabOneData },
                    personalInfo: userInfo,
                  }}
                />
              )}
            </Box>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
};

export default Cart;
