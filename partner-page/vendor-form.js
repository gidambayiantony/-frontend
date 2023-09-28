import { Box, Button, Input, FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/router";

const VendorForm = () => {
  const router = useRouter();
  const { control, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    // Send the vendor form data to the server.
    // ...

    router.push("/");
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl id="name" isInvalid={errors.name}>
          <FormLabel>Vendor Name</FormLabel>
          <Input type="text" {...register("name")} />
          <FormErrorMessage>{errors.name && "Vendor name is required"}</FormErrorMessage>
        </FormControl>

        <FormControl id="email" isInvalid={errors.email}>
          <FormLabel>Vendor Email Address</FormLabel>
          <Input type="email" {...register("email")} />
          <FormErrorMessage>{errors.email && "Valid email address is required"}</FormErrorMessage>
        </FormControl>

        {/* Include other form fields in a similar way as above */}
        
        <Button type="submit">Become a Vendor</Button>
      </form>
    </Box>
  );
};

export default VendorForm;

