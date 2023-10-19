"use client";
import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Select,
  Link,
} from "@chakra-ui/react";
import axios from "axios";
import { Loader } from "lucide-react";
import { useToast } from "@chakra-ui/react";
import ButtonComponent from "@components/Button";
import { DB_URL } from "@config/config";
import { ThemeColors } from "@constants/constants";
import VendorForm from "@components/DeliveryForm";

const Partner = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    transport: "bike",
    vegan: false,
    terms: false,
  });
  const [isLoading, setLoading] = useState(false);
  const chakraToast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (!formData.terms) {
        chakraToast({
          title: "Notice",
          description: "Please agree to the terms and conditions to proceed",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        setLoading(false);
        return;
      }

      await axios.post(`${DB_URL}/vendor/new`, formData);
      chakraToast({
        title: "Vendor form",
        description: "Successfully Submitted vendor form",
        status: "success",
        duration: 5000,
        isClosable: false,
      });

      // Clear the form data after successful submission
      setFormData({
        name: "",
        address: "",
        phone: "",
        email: "",
        transport: "bike",
        vegan: false,
        terms: false,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);

      chakraToast({
        title: "Error",
        description: error.data?.message
          ? error.data?.message
          : error.data || error.error,
        status: "error",
        duration: 5000,
        isClosable: false,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  return (
    <div className="mb-10">
      <VendorForm />
      <Box
        p={4}
        borderWidth={1}
        borderRadius="lg"
        w={{ base: "100%", md: "md" }}
        mx="auto"
      >
        <form onSubmit={handleSubmit}>
          <p className="text-3xl text-left mb-4 text-dark">
            Fill out the vendor form
          </p>
          <Stack spacing={4}>
            <FormControl id="name">
              <FormLabel>Vendor's Name*</FormLabel>
              <Input
                type="text"
                name="name"
                placeholder="Vendor's Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="border border-dark rounded hover:border-red focus:border-red px-2 py-1 italic"
              />
            </FormControl>
            <FormControl id="address">
              <FormLabel>Address*</FormLabel>
              <Input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                required
                className="border border-dark rounded hover:border-red focus:border-red px-2 py-1 italic"
              />
            </FormControl>
            <FormControl id="phoneNumber">
              <FormLabel>Phone Number*</FormLabel>
              <Input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
                className="border border-dark rounded hover:border-red focus-border-red px-2 py-1 italic"
              />
            </FormControl>
            <FormControl id="emailAddress">
              <FormLabel>Email Address*</FormLabel>
              <Input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="border border-dark rounded hover-border-red focus-border-red px-2 py-1 italic"
              />
            </FormControl>

            {/* Delivery Information */}
            <FormControl id="transport">
              <FormLabel>Transport*</FormLabel>
              <Select
                name="transport"
                value={formData.transport}
                onChange={handleChange}
                required
                className="border border-dark rounded hover-border-red focus-border-red px-2 py-1 italic"
              >
                <option value="bike">Bike</option>
                <option value="vehicle">Vehicle</option>
                <option value="motorcycle">Motorcycle</option>
              </Select>
            </FormControl>

            <Box padding={"0.5rem 0"}>
              <div className="flex">
                <input
                  type="checkbox"
                  name="vegan"
                  checked={formData.vegan}
                  onChange={handleChange}
                  className="mr-4"
                />
                <p className="">Are you vegetarian?</p>
              </div>
            </Box>

            <Box padding={"0.5rem 0"}>
              <input
                type="checkbox"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
                className="mr-4"
              />
              I agree to the{" "}
              <Link href={"/vendor-terms"}>
                <span style={{ color: ThemeColors.darkColor }}>
                  terms and conditions
                </span>
              </Link>
            </Box>

            <div className="text-center md:text-left">
              <ButtonComponent
                text={"Sign Up"}
                size={"lg"}
                type={"submit"}
                icon={isLoading && <Loader size={20} />}
              />
            </div>
          </Stack>
        </form>
      </Box>
    </div>
  );
};

export default Partner;
