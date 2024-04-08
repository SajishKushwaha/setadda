import React, { useState } from "react";
import { useDispatch } from "react-redux";
//useSelector
import { loginSuccess } from "../Redux/auth/action";
//logout
import {  toast } from "react-hot-toast";
//Toaster
import {
  // BiUserCircle,
  // BiCaretDown,
  BiXCircle,
  BiLogoGoogle,
  BiLogoFacebook,
  // BiMenu,
  // BiX,
  // BiLogOut,
} from "react-icons/bi";
import AppImg from "../assets/Bus Stop-pana.svg";
import MobImg from "../assets/msg-mobile.avif";

const LoginModal = ({ onClose, setIsModalOpen }) => {
  const [modal, setModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [verify, setVerify] = useState(false);
  const dispatch = useDispatch();
  const phoneNumberPattern = /^\d{10}$/;

  const handleOpenModal = () => {
    setMobileMenuOpen(false);
    setModal(true);
    document.body.classList.add("modal-open");
  };

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setPhoneNumber("");
    setVerify(false);
    setModal(false);
    onClose();
    document.body.classList.remove("modal-open");
  };

  const handleInputChange = (event) => {
    setPhoneNumber(event.target.value);
  };
  const handleInputOtp = (event) => {
    setOtp(event.target.value);
  };

  const handleLogin = async () => {
    const isValidphone = phoneNumberPattern.test(phoneNumber);
    if (isValidphone) {
      const formData = new FormData();
      formData.append("phone", phoneNumber);

      try {
        const response = await fetch("https://seatadda.co.in/auth/api/login", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          // console.log(data);
          toast.success("OTP Sent to Mobile Number");
          setOtp("");
          setVerify(true);
        } else {
          console.error(
            "API request failed:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error while making API request:", error);
      }
    } else {
      alert("Enter Valid Phone Number");
    }
  };

  const handleVerify = async () => {
    // console.log(otp);
    const isValidphone = phoneNumberPattern.test(phoneNumber);
    if (isValidphone && otp !== "") {
      const formData = new FormData();
      formData.append("phone", phoneNumber);
      formData.append("otp", otp);

      try {
        const response = await fetch("https://seatadda.co.in/auth/verify-otp", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("authToken", data.access_token);
          localStorage.setItem("userData", JSON.stringify(data)); // Store the token
          dispatch(loginSuccess(data));
          // console.log(data);
          handleCloseModal();
          toast.success("Logged in");
        } else {
          const data = await response.json();
          toast.error(data.message);
          console.error(
            "API request failed:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        toast.error("Error Occured");
        console.error("Error while making API request:", error);
      }
    } else {
      alert("Enter Valid OTP");
    }
  };
  return (
    <div>
      <div className="modal-container  ">
        <div className="modal-content flex items-center   justify-center  w-full  overflow-x-hidden overflow-y-hidden fixed inset-0 z-50 outline-none focus:outline-none">
          <div className=" sm:p-4 md:p-0 rounded-xl w-full max-w-2xl  h-full   ">
            {/* {<Toaster />} */}
            <div className="p-5 sm:p-2">
              {" "}
              <div className="mt-5 sm:mt-10 bg-primarycolors-textcolor rounded-xl relative ">
                <div className="flex items-center justify-between px-3 border-b rounded-t dark:border-gray-800 ">
                  <h2 className="p-2 text-l text-primarycolors-white">
                    Login/Signup with OTP
                  </h2>
                  <button
                    type="button"
                    className="text-primarycolors-white rounded-lg text-xl pointer  ml-auto inline-flex items-center hover:text-gray-200"
                    title="Close"
                    // data-modal-toggle="default-modal"
                    onClick={() => {
                      setIsModalOpen(false);
                    }}
                  >
                    <BiXCircle size={25} />
                  </button>
                </div>{" "}
                <div className=" rounded-l-xl ">
                  <div className="bg-primarycolors-white rounded-b-xl text-gray-500  w-full overflow-hidden">
                    {verify ? (
                      <div className="sm:flex w-full ">
                        {" "}
                        <div className="w-3/4 sm:w-1/2 flex items-center sm:bg-primarycolors-gray/80 md:block mx-auto sm:mx-0  bg-indigo-500 py-10 px-10">
                          <img src={MobImg} alt="" />
                        </div>
                        <div className="w-full sm:w-1/2 md:w-3/5 mx-auto sm:mx-0  ">
                          <div className="flex flex-col sm:h-[350px] p-3 sm:p-0 justify-start  sm:justify-around gap-4 ">
                            <div className="flex flex-col justify-start">
                              <div className=" text-primarycolors-blue">
                                We have sent verfication Code to <br />
                                <div className="my-2">
                                  <p className=" text-primarycolors-blue">
                                    +91-{phoneNumber}
                                  </p>
                                  <button
                                    onClick={() => setVerify(false)}
                                    className=" text-primarycolors-red"
                                  >
                                    Edit
                                  </button>
                                </div>
                              </div>
                              <div className="mx-5 mb-3">
                                <input
                                  className="w-full text-center text-sm p-3 px-4 focus:outline-none border-[1px] border-primarycolors-textcolor"
                                  type="tel"
                                  placeholder="Enter OTP Code"
                                  name="otp"
                                  value={otp}
                                  onChange={handleInputOtp}
                                />
                              </div>
                              <div className="sm:m-0">
                                <button
                                  onClick={handleVerify}
                                  className="p-2  px-4 text-primarycolors-white  bg-primarycolors-red"
                                >
                                  Verify OTP
                                </button>
                              </div>
                            </div>

                            <div>
                              <p className="my-3 text-[12px]">
                                Did not Receive OTP Code?
                              </p>

                              <div className="flex justify-between px-2 ">
                                <button className=" text-primarycolors-red">
                                  Resend OTP
                                </button>
                                <button className=" text-primarycolors-red">
                                  Get OTP on Call
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>{" "}
                      </div>
                    ) : (
                      <div className="sm:flex w-full ">
                        {" "}
                        <div className=" sm:w-3/4  sm:bg-primarycolors-gray/80 md:block mx-auto sm:mx-0  bg-indigo-500 py-5 px-5">
                          <img src={AppImg} alt="" />
                        </div>
                        <div className="w-full sm:w-1/2 md:w-3/5 mx-auto sm:mx-0  ">
                          <div className="flex flex-col sm:h-[350px] p-3 sm:p-0 justify-start  sm:justify-around ">
                            <div>
                              {" "}
                              <div className="mx-5 mb-3">
                                <input
                                  className="w-full text-center text-sm p-3 px-4 focus:outline-none border-[1px] border-primarycolors-textcolor"
                                  type="tel"
                                  placeholder="Enter Mobile Number"
                                  name="phoneNumber"
                                  value={phoneNumber}
                                  onChange={handleInputChange}
                                />
                              </div>
                              <div>
                                <input className="text-xl " type="checkbox" />{" "}
                                <span className="text-primarycolors-textcolor">
                                  Get First Free Ride
                                </span>
                              </div>
                              <div className="sm:m-3">
                                <button
                                  onClick={handleLogin}
                                  className="p-2 rounded-md px-4 text-primarycolors-white m-2 bg-primarycolors-red"
                                >
                                  Login/Signup with OTP
                                </button>
                              </div>
                            </div>

                            <div className="mx-auto mb-0">
                              <p className="m-5 mb-2 text-sm text-primarycolors-textcolor">
                                or login with
                              </p>
                              <div className="flex flex-row">
                                <button className="p-2 mb-0 rounded-md px-4 flex items-center justify-center text-primarycolors-white m-2 bg-primarycolors-blue">
                                  <BiLogoGoogle className="text-xl mr-1" />
                                  <span></span> Google
                                </button>
                                <button className="p-2 rounded-md mb-0 px-4 flex items-center justify-center text-primarycolors-white m-2 bg-primarycolors-btncolor">
                                  <BiLogoFacebook className="text-xl mr-1" />
                                  <span></span> Facebook
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>{" "}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
