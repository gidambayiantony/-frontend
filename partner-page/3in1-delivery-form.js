import { Box, Button, Select, Input, Textarea, FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/router";

const DeliveryForm = () => {
  const router = useRouter();
  const { control, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    // Send the delivery form data to the server.
    // ...

    router.push("/");
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl id="vehicle_type" isInvalid={errors.vehicle_type}>
          <FormLabel>Vehicle Type</FormLabel>
          <Controller
            name="vehicle_type"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Select {...field}>
                <option value="motorcycle">Motorcycle</option>
                <option value="van">Van</option>
                <option value="bicycle">Bicycle</option>
              </Select>
            )}
          />
          <FormErrorMessage>{errors.vehicle_type && "Please select a vehicle type"}</FormErrorMessage>
        </FormControl>

        <FormControl id="customer_name" isInvalid={errors.customer_name}>
          <FormLabel>Customer Name</FormLabel>
          <Input type="text" {...register("customer_name")} />
          <FormErrorMessage>{errors.customer_name && "Customer name is required"}</FormErrorMessage>
        </FormControl>

        <FormControl id="customer_phone_number" isInvalid={errors.customer_phone_number}>
          <FormLabel>Customer Phone Number</FormLabel>
          <Input type="tel" {...register("customer_phone_number")} />
          <FormErrorMessage>{errors.customer_phone_number && "Valid phone number is required"}</FormErrorMessage>
        </FormControl>

        <FormControl id="delivery_notes">
          <FormLabel>Delivery Notes</FormLabel>
          <Textarea {...register("delivery_notes")} />
        </FormControl>

        <Button type="submit">Place Order</Button>
      </form>
    </Box>
  );
};

export default DeliveryForm;

