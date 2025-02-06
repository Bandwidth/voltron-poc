import React, { Suspense } from "react";
const ClassCard = React.lazy(() => import("reactComponents/ClassCard"));

const DetailsPage: React.FC = (props) => {
  // const location = useLocation();
  // const state = location.state;

  // console.log("state", state);
  console.log(props.location);
  return (
    <div>
      Details
      <Suspense fallback={<div>Loading ClassCard...</div>}>
        <ClassCard />
      </Suspense>
    </div>
  );
};

export default DetailsPage;
