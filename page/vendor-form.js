import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const VendorForm = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    // Send the vendor form data to the server.
    // ...

    router.push("/");
  };

  return (
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="text" name="name" placeholder="Vendor name" {...register("name")} />
          <input type="email" name="email" placeholder="Vendor email address" {...register("email")} />
          <input type="tel" name="phone" placeholder="Vendor phone number" {...register("phone")} />
          <input type="submit" value="Submit" />
        </form>
  );
};

export default VendorForm;

