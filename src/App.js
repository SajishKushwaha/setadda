import "./App.css";
import Home from "./Components/Home";
import { Route, Routes, useLocation } from "react-router-dom";
// import Navigation from "./Components/Navigation";
import Rental from "./Components/RentalPage/Rental";
import SelectBus from "./Components/SearchBus/SelectBus";
import Payment from "./Components/PaymentPage/Payment";
import ViewSeatMobile from "./Components/SearchBus/Mobile/ViewSeatMobile";
import Menu from "./Components/Menu/Menu";
import Help from "./Components/Help/Help";
import Offers from "./Components/OffersPage/Offers";
import FAQ from "./Components/FAQ/FAQ";
import Contact from "./Components/Contact/Contact";
import Terms from "./Components/Terms/Terms";
import About from "./Components/About/About";
import Privacy from "./Components/Privacy/Privacy";
import FreeRides from "./Components/Free Rides/FreeRides";
import Bookings from "./Components/Bookings/Bookings";
import Wallet from "./Components/Wallet/Wallet";
// import { motion, AnimatePresence } from "framer-motion";
import Account from "./Components/Account/Account";
// import PassengerDetails from "./Components/PassengerDetails/PassengerDetails";
import Passenger from "./Components/PassengerDetails/Passenger";
import {  useLayoutEffect } from "react";
// import LoginModal from "./Components/LoginModal";
import PageMo from "./Components/PageMo";
import { Toaster } from "react-hot-toast";
import Rental_Buses from "./Components/RentalPage/Rental_Buses";
// import ProtectedRoute from "./utils/ProtectedRoute";
import NotFound from "./Components/404/NotFound";
function App() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  return (
    <div className="App  ">
      <Toaster />
      <Routes>
        <Route path="/" Component={Home}></Route>
        <Route path="/rental" Component={Rental}></Route>
        <Route path="/select-bus" Component={SelectBus}></Route>
        <Route path="/rental-bus" Component={Rental_Buses}></Route>

        <Route path="/select-seat" Component={ViewSeatMobile}></Route>

        <Route path="/payment" Component={Payment}></Route>
        <Route path="/passenger-details" Component={Passenger}></Route>

        <Route path="/menu" Component={Menu}></Route>

        <Route path="/help" Component={Help}></Route>
        <Route path="/offers" Component={Offers}></Route>
        <Route path="/faq" Component={FAQ}></Route>
        <Route path="/about" Component={About}></Route>
        <Route path="/terms" Component={Terms}></Route>

        <Route path="/contact" Component={Contact}></Route>
        <Route path="/privacy" Component={Privacy}></Route>
       {/*  <Route
          path="/bookings"
          element={
            <ProtectedRoute>
              <Bookings />
            </ProtectedRoute>
          }
        /> */}
        
        <Route path="/free-rides" Component={FreeRides}></Route>
        <Route path="/bookings" Component={Bookings}></Route>
        <Route path="/wallet" Component={Wallet}></Route>
        <Route path="/account" Component={Account}></Route>
        <Route path="/modal" Component={PageMo}></Route>
        <Route path="*" Component={NotFound}/>
      </Routes>
    </div>
  );
}

export default App;
