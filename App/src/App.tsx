import React, { Suspense } from "react";
import "@bw/bw-styles/dist/bwStyles.css";
const HomeContent = React.lazy(() => import("homepage/HomeContent"));
const DetailsPage = React.lazy(() => import("detailsPage/DetailsPage"));
import { Routes, Route, useNavigate } from "react-router";

const App: React.FC = () => {
  const navigate = useNavigate();

  const handleCardClicked = (item: any) => {
    navigate(`details/${item.id}`, {
      state: item,
    });
  };
  return (
    <Routes>
      <Route
        index
        element={
          <Suspense fallback={<div>Loading HomeContent...</div>}>
            <HomeContent cardClicked={handleCardClicked} />
          </Suspense>
        }
      />
      <Route
        path="details/:id"
        element={
          <Suspense fallback={<div>Loading HomeContent...</div>}>
            <DetailsPage routing={{ history, location }} location={location} />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default App;
