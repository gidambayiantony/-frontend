import { Box, FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createVendor } from "../redux/actions/vendor";

const VendorForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    dispatch(createVendor(data));
    // You can redirect or display a success message here
  };

  return (
    <Box className="mx-auto p-4 bg-black mb-20 mt-20">
      <p className="text-3xl text-left mb-4 text-dark">Vendor's Information</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl className="mb-4">
          <FormLabel>Name*</FormLabel>
          <Input
            {...register("name", { required: true })}
            type="text"
            placeholder="Vendor's Name"
          />
          {errors.name && <span className="text-red-500">Name is required</span>}
        </FormControl>
        {/* Add similar fields for Address, Phone Number, Email Address */}
        <Button
          type="submit"
          colorScheme="teal"
          className="bg-green-500 mt-4"
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default VendorForm;

