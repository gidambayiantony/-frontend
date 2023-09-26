import { ChakraProvider } from "@chakra-ui/react";
import { ThemeProvider } from "next-themes";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

const DeliveryForm = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    // Send the delivery form data to the server.
    // ...

    router.push("/");
  };

  return (
    <ChakraProvider>
      <ThemeProvider>
        <form onSubmit={handleSubmit(onSubmit)}>
          <select name="vehicle_type" {...register("vehicle_type")}>
            <option value="motorcycle">Motorcycle</option>
            <option value="van">Van</option>
            <option value="bicycle">Bicycle</option>
          </select>

          <input type="submit" value="Submit" />
        </form>
      </ThemeProvider>
    </ChakraProvider>
  );
};

export default DeliveryForm;

