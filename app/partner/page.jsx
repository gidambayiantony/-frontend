"use client";
import { useToast } from "@chakra-ui/react";
import ButtonComponent from "@components/Button";
import { Input } from "@components/ui/input";
import { usePartnerPostMutation } from "@slices/usersApiSlice";
import { Loader2, Plus } from "lucide-react";
import React, { useState } from "react";

const Partner = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    location: "",
    products: "",
    message: "",
  });

  const chakraToast = useToast();
  const [createPartnerPost] = usePartnerPostMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading((prevState) => (prevState ? false : true));

    try {
      const res = await createPartnerPost(formData).unwrap();

      if (res.status == "Success")
        return chakraToast({
          title: "Logged In",
          description: `Request has been sent`,
          status: "success",
          duration: 5000,
          isClosable: false,
        });
    } catch (err) {
      chakraToast({
        title: "Error",
        description: err.data?.message
          ? err.data?.message
          : err.data || err.error,
        status: "error",
        duration: 5000,
        isClosable: false,
      });
    } finally {
      // set loading to be false
      setIsLoading((prevState) => (prevState ? false : true));
      setFormData({
        fullname: "",
        email: "",
        phone: "",
        location: "",
        products: "",
        message: "",
      });
    }
  };

  return (
    <div>
      <div className="py-8">
        <div className="flex">
          <div className="m-auto lg:w-3/5 sm:w-4/5 w-full">
            <div className="py-4">
              <h3 className="text-center font-bold text-lg">Partner</h3>
              <p className="text-center text-4xl secondary-light-font my-1">
                Grow Your Business With Us
              </p>

              <div className="flex justify-center items-center py-2">
                <div className="h-[0.2rem] w-[150px] bg-primary"></div>
              </div>
            </div>

            <div className="py-8">
              <div className="border-2 border-light rounded-md p-4">
                <form onSubmit={handleSubmit}>
                  <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-2 lg:py-0 py-2 gap-4">
                    <div className="">
                      <div className="py-1">
                        <p>Fullname</p>
                      </div>
                      <Input
                        type="text"
                        name="fullname"
                        placeholder="Fullname is required"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [e.target.name]: e.target.value,
                          })
                        }
                        value={formData.fullname}
                      />
                    </div>

                    <div className="">
                      <div className="py-1">
                        <p>Email</p>
                      </div>
                      <Input
                        type="email"
                        name="email"
                        placeholder="Email is required"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [e.target.name]: e.target.value,
                          })
                        }
                        value={formData.email}
                      />
                    </div>

                    <div className="">
                      <div className="py-1">
                        <p>Phone</p>
                      </div>
                      <Input
                        type="text"
                        name="phone"
                        placeholder="Phone number is required"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [e.target.name]: e.target.value,
                          })
                        }
                        value={formData.phone}
                      />
                    </div>

                    <div className="">
                      <div className="py-1">
                        <p>Location</p>
                      </div>
                      <Input
                        type="text"
                        name="location"
                        placeholder="Location number is required"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [e.target.name]: e.target.value,
                          })
                        }
                        value={formData.location}
                      />
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-2 sm:grid-cols-1 grid-cols-1 py-1 gap-4">
                    <div className="">
                      <div className="py-1">
                        <p>Products and quantity</p>
                      </div>

                      <textarea
                        className="w-full max-h-[100px] border-[1.8px] border-light p-4 rounded-md"
                        name={"products"}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [e.target.name]: e.target.value,
                          })
                        }
                        value={formData.products}
                      ></textarea>
                    </div>

                    <div className="">
                      <div className="py-1">
                        <p>Message</p>
                      </div>

                      <textarea
                        className="w-full max-h-[100px] border-[1.8px] border-light p-4 rounded-md"
                        name={"message"}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [e.target.name]: e.target.value,
                          })
                        }
                        value={formData.message}
                      ></textarea>
                    </div>
                  </div>

                  <div className="py-2">
                    <ButtonComponent
                      text={"Submit"}
                      type={"submit"}
                      icon={isLoading && <Loader2 size={20} />}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partner;
