"use client";
import {
  Box,
  Checkbox,
  Flex,
  Grid,
  Heading,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import ButtonComponent from "@components/Button";
import TabOne from "@components/modals/tabs/scheduleTabs/TabOne";
import TabThree from "@components/modals/tabs/scheduleTabs/TabThree";
import TabTwo from "@components/modals/tabs/scheduleTabs/TabTwo";
import { Input } from "@components/ui/input";
import { ThemeColors } from "@constants/constants";
import { useProductsGetMutation } from "@slices/productsApiSlice";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import React from "react";

const ScheduleDelivery = () => {
  const [Order, setOrder] = useState({
    deliveryProducts: [],
    deliveryDays: [],
    deliveryTime: "",
    repeatSchedule: false,
  });
  const [deliveryProducts, setDeliveryProducts] = useState([]);
  const [deliveryDays, setDeliveryDays] = useState([]);
  const [deliveryTime, setDeliveryTime] = useState("");
  const [repeatSchedule, setRepeatSchedule] = useState(false);
  const [Products, setProducts] = useState([]);
  const [SearchProducts, setSearchProducts] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);
  const [tabOneData, setTabOneData] = useState({});
  const [tabTwoData, setTabTwoData] = useState({});

  const [fetchProducts] = useProductsGetMutation();

  // chakra functions for controlling modal display
  const { onOpen, onClose, isOpen } = useDisclosure();

  const { userInfo } = useSelector((state) => state.auth);

  const chakraToast = useToast();

  const handleDataFetch = async () => {
    const res = await fetchProducts().unwrap();

    if (res?.status && res?.status == "Success") {
      setProducts(res?.data);
      setSearchProducts(res?.data);
    }
  };

  // function to handle removing or adding items from the deliveryProducts state
  const handleAddingRemovingProducts = (arr, item, action) => {
    let output = arr;

    // logic to add an item
    if (action == "add") {
      if (output.findIndex((value) => value._id == item.id) == -1) {
        let productArray = Products.filter((product) => product._id == item.id);

        productArray.length > 0
          ? output.push({ ...productArray[0], quantity: 1 })
          : (output = output);
      }
    }

    // logic to remove an item
    if (action == "remove") {
      output = output.filter((value) => value._id !== item.id);
    }

    return output;
  };

  // function to handle removing or adding items from the deliveryDays state
  const handleAddingRemovingItems = (arr, item, action) => {
    let output = arr;

    // logic to add an item
    if (action == "add") {
      if (output.findIndex((value) => value == item) == -1) {
        output.push(item);
      }
    }

    // logic to remove an item
    if (action == "remove") {
      output = output.filter((value) => value !== item);
    }

    return output;
  };

  // function to handle populating selected products for delivery data
  const handleSelectedProducts = (e) => {
    setDeliveryProducts(
      handleAddingRemovingProducts(
        deliveryProducts,
        {
          name: e.target.name,
          id: e.target.getAttribute("data-target"),
        },
        e.target.checked ? "add" : "remove"
      )
    );
  };

  // function to handle populating days of delivery data
  const handleDeliveryDays = (e) => {
    setDeliveryDays(
      handleAddingRemovingItems(
        deliveryDays,
        e.target.value,
        e.target.checked ? "add" : "remove"
      )
    );
  };

  // function to handle populating repeat delivery data
  const handleDeliveryRepeat = (e) => {
    setRepeatSchedule(e.target.checked ? e.target.checked : false);
  };

  // function to handle populating order
  const handleScheduleDeliveryOrder = () => {
    // check if delivery days array is empty and throw an error
    if (deliveryDays.length <= 0) {
      return chakraToast({
        title: "Error",
        description: "Please select days for delivery",
        status: "error",
        duration: 5000,
        isClosable: false,
      });
    }

    // check if delivery products array is empty and throw an error
    if (deliveryProducts.length <= 0) {
      return chakraToast({
        title: "Error",
        description: "Please select products for delivery",
        status: "error",
        duration: 5000,
        isClosable: false,
      });
    }

    // call function to display the modal form
    onOpen();
  };

  // function to check if product has already been selected before someone searched for it
  const checkIfSelected = () => {
    const Inputs = [
      ...document.querySelectorAll("input[checkbox].product-checkbox"),
    ];

    for (const input of Inputs) {
      console.log(input);
      for (const product of deliveryProducts) {
        input.getAttribute("data-target").toString() === product.id.toString()
          ? (input.checked = true)
          : (input.checked = false);
      }
    }
  };

  // function to handle searching for products within the products array
  const handleSearch = async (value) => {
    if (value == "" || !value) return setSearchProducts(Products);

    let SearchedProducts = [];

    for (const product of Products) {
      product.name.toString().toLowerCase().indexOf(value.toLowerCase()) >= 0
        ? SearchedProducts.push(product)
        : (SearchedProducts = SearchedProducts);
    }

    setSearchProducts(SearchedProducts);

    checkIfSelected();
  };

  const testingDate = (dayName, excludeToday = true, date = new Date()) => {
    const dayOfWeek = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"].indexOf(
      dayName.slice(0, 3).toLowerCase()
    );

    if (dayOfWeek < 0) return;

    date.setHours(0, 0, 0, 0);
    date.setDate(
      date.getDate() +
        +!!excludeToday +
        ((dayOfWeek + 7 - date.getDay() - +!!excludeToday) % 7)
    );

    return date;
  };

  const DaysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // fetch product categories
  useEffect(() => {
    handleDataFetch();
  }, []);

  return (
    <>
      <div>
        <div className="flex">
          <div className="p-8 m-auto w-4/5">
            <div className="py-4">
              <h2 className="text-3xl">Schedule Delivery</h2>
            </div>
            <div className="py-1 max-h-[300px]">
              <div>
                <h3 className="text-lg">Select Products</h3>
              </div>

              <div className="py-2 relative">
                <Input
                  name="product-search"
                  placeholder="Search for product by name or category"
                  className="pl-8 w-3/4"
                  onChange={(e) => handleSearch(e.target.value)}
                />
                <Search className="absolute top-4 left-2" size={20} />
              </div>

              {SearchProducts.length > 0 ? (
                <div className="grid grid-cols-3 lg:grid-cols-6 gap-4">
                  {SearchProducts.map((product, key) => (
                    <div className="py-2" key={key}>
                      <input
                        type="checkbox"
                        name={product.name}
                        value={product.name}
                        className="product-checkbox mr-4 cursor-pointer"
                        data-target={product._id}
                        onChange={handleSelectedProducts}
                      />
                      {product.name}
                    </div>
                  ))}
                </div>
              ) : (
                ""
              )}
            </div>

            <div className="py-4">
              <div>
                <h3 className="text-lg">Select Delivery Days</h3>
              </div>

              <div>
                <div className="grid grid-cols-3 lg:grid-cols-7 gap-4">
                  {DaysOfWeek.map((day, index) => (
                    <div className="py-2" key={index}>
                      <input
                        type="checkbox"
                        name={day.toLowerCase()}
                        value={day.toLowerCase()}
                        onChange={handleDeliveryDays}
                        className="mr-4 cursor-pointer"
                      />
                      {day}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="py-4">
              <div>
                <h3 className="text-lg">Delivery Time</h3>
              </div>

              <div className="py-2 w-1/5">
                <select
                  placeholder="Choose time"
                  name="deliveryTime"
                  id="deliveryTime"
                  className="border-[1.8px] py-2 px-2 rounded-md cursor-pointer"
                  onChange={(e) => setDeliveryTime(e.target.value)}
                >
                  <option>Choose time</option>
                  <option value="7 AM - 8 AM">7 AM - 8 AM</option>
                  <option value="8 AM - 9 AM">8 AM - 9 AM</option>
                  <option value="10 AM - 11 AM">10 AM - 11 AM</option>
                  <option value="12 PM - 1 PM">12 PM - 1 PM</option>
                  <option value="2 PM - 3 PM">2 PM - 3 PM</option>
                  <option value="4 PM - 5 PM">4 PM - 5 PM</option>
                  <option value="6 PM - 7 PM">6 PM - 7 PM</option>
                </select>
              </div>
            </div>

            <div className="py-4">
              <div>
                <h3 className="h3 text-lg">Repeat Schedule</h3>
              </div>

              <div className="py-2">
                <div className="py-2">
                  <input
                    type="checkbox"
                    name="repeatSchedule"
                    onChange={handleDeliveryRepeat}
                    className="mr-4 cursor-pointer"
                  />
                  Every week
                </div>
              </div>
            </div>

            <div className="py-4">
              <div
                className="max-w-[10rem]"
                onClick={() => {
                  handleScheduleDeliveryOrder();
                }}
              >
                <ButtonComponent
                  type={"button"}
                  text={"Make Order"}
                  size={"regular"}
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <Modal
            isOpen={isOpen}
            onClose={onClose}
            size={"4xl"}
            padding={"1rem 0"}
          >
            <ModalOverlay />
            <ModalContent padding={"3rem 1rem"}>
              <ModalCloseButton size={"lg"} color={ThemeColors.darkColor} />
              <Box>
                {tabIndex == 0 ? (
                  <TabOne
                    updateTabIndex={setTabIndex}
                    fetchData={setTabOneData}
                    data={{
                      Products: deliveryProducts,
                      scheduleRepeat: repeatSchedule,
                      deliveryDays,
                    }}
                  />
                ) : tabIndex == 1 ? (
                  <TabTwo
                    updateTabIndex={setTabIndex}
                    fetchData={setTabTwoData}
                  />
                ) : tabIndex == 2 ? (
                  <TabThree
                    data={{ ...tabOneData, ...tabTwoData, deliveryTime }}
                    updateTabIndex={setTabIndex}
                  />
                ) : (
                  ""
                )}
              </Box>
            </ModalContent>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default ScheduleDelivery;
