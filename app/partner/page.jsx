"use client";
import { useToast } from "@chakra-ui/react";
import ButtonComponent from "@components/Button";
import { Input } from "@components/ui/input";
import { usePartnerPostMutation } from "@slices/usersApiSlice";
import { Bike, Building, Loader2, Plus } from "lucide-react";
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
    type: "vendor",
    vehicleType: "",
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
    <div className="py-0">
      <div className="py-0">
        <div className="flex lg:flex-row flex-col">
          <div
            className={`lg:w-2/4 w-full ${
              formData.type == "vendor"
                ? `bg-[url(/assets/images/img5.jpg)]`
                : `bg-[url(/assets/images/img4.jpg)]`
            } bg-cover`}
          >
            <div className="bg-gradient-to-b  from-[#000000bd] to-[#000000bd] w-full h-full px-8 lg:py-16 py-4">
              <div className="py-4">
                <h3 className="text-center font-bold text-lg text-light">
                  Partner
                </h3>
                <p className="text-center text-4xl secondary-light-font my-1 text-light">
                  Grow Your Business With Us
                </p>

                <div className="flex justify-center items-center py-2">
                  <div className="h-[0.2rem] w-[150px] bg-primary"></div>
                </div>
              </div>

              <div className="lg:py-12 sm:py-8 py-6">
                <div className="flex justify-center align-center gap-4 lg:flex-row sm:flex-row flex-col items-center">
                  <div
                    className={`p-4 w-fit flex justify-center cursor-pointer rounded-md border-2 ${
                      formData.type == "vendor"
                        ? "border-primary"
                        : "border-[#696969]"
                    }`}
                    onClick={() => setFormData({ ...formData, type: "vendor" })}
                  >
                    <Building
                      size={30}
                      className={`${
                        formData.type == "vendor"
                          ? "text-primary"
                          : "text-[#696969]"
                      }`}
                    />
                    <h3 className={`text-lg ml-4 text-light`}>I am a Vendor</h3>
                  </div>

                  <div
                    className={`p-4 w-fit flex justify-center cursor-pointer rounded-md border-2 ${
                      formData.type == "delivery"
                        ? "border-primary"
                        : "border-[#696969]"
                    }`}
                    onClick={() =>
                      setFormData({ ...formData, type: "delivery" })
                    }
                  >
                    <Bike
                      size={30}
                      className={`${
                        formData.type == "delivery"
                          ? "text-primary"
                          : "text-[#696969]"
                      }`}
                    />
                    <h3 className={`text-lg ml-4 text-light`}>
                      I am a Delivery Person
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-2/4 w-full lg:px-16 sm:px-12 px-6  lg:py-12 py-2">
            <div className="py-8">
              <div className="py-4">
                <p className="text-center text-2xl">
                  Fill this form to continue
                </p>
              </div>
              <div className="border-2 border-light rounded-md p-4">
                <form onSubmit={handleSubmit}>
                  <div className="grid lg:grid-cols-2 sm:grid-cols-2 grid-cols-2 lg:py-0 py-2 gap-4">
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
                    {formData.type == "vendor" ? (
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
                    ) : (
                      <div className="">
                        <div className="py-1">
                          <p>Vehicle Type</p>
                        </div>

                        <select
                          name="vehicleType"
                          id="vehicleType"
                          className="outline-none py-2 px-4 border-[1.7px] rounded-md w-full"
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              [e.target.name]: e.target.value,
                            })
                          }
                        >
                          <option value="">Choose vehicle type</option>
                          <option value="car">Car</option>
                          <option value="motorbike">Motorbike</option>
                          <option value="bicycle">Bicycle</option>
                        </select>
                      </div>
                    )}

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
