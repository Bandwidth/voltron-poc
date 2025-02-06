import React, { Suspense } from "react";
import { AlertProvider, useAlerts } from "@bw/alloy-react";
import "@bw/bw-styles/dist/bwStyles.css";
const HomeContent = React.lazy(() => import("homepage/HomeContent"));
const DetailsPage = React.lazy(() => import("detailsPage/DetailsPage"));
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

const App: React.FC = () => {
  const { addAlert } = useAlerts();
  const navigate = useNavigate();
  const location = useLocation();
  console.log("location", location);

  const handleCardClicked = (item: any) => {
    console.log("item", item);
    navigate(`/details/${item.id}`, { state: { chosenClass: item } });
  };

  const handleBooking = (item: any) => {
    navigate(`/`, { state: { booked: true, bookedClass: item } });
    addAlert({
      delay: 5000,
      id: "123",
      children: "This is an alert",
      severity: "success",
      autohide: true,
    });
  };
  return (
    <AlertProvider>
      <Routes>
        <Route
          index
          element={
            <Suspense fallback={<div>Loading HomeContent...</div>}>
              <HomeContent
                location={location}
                cardClicked={handleCardClicked}
                handleBooking={handleBooking}
              />
            </Suspense>
          }
        />
        <Route path="details">
          <Route
            path=":id"
            element={
              <DetailsPage location={location} handleBooking={handleBooking} />
            }
          />
        </Route>
      </Routes>
    </AlertProvider>
  );
};

export default App;
