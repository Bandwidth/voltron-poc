import React, { Suspense, useEffect, useState } from "react";
import { Container, Row, Col } from "@bw/alloy-react";

const QuickBooking = React.lazy(() => import("quickBooking/QuickBooking"));
const ClassCard = React.lazy(() => import("reactComponents/ClassCard"));

const HomeContent = (props) => {
  const [workoutClassData, setWorkoutClassData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5555/data")
      .then((response) => response.json())
      .then((data) => setWorkoutClassData(data));
  }, []);

  useEffect(() => {
    import("app/WorkoutData").then((module) => {
      const workoutData = module.default;
      workoutData.subscribe({
        next: (val) => console.log("data received!", val),
      });
    });
  }, []);

  const cardClicked = (item) => {
    if (typeof props.cardClicked === "function") {
      props.cardClicked(item);
    }
    console.log("card clicked", item);
  };

  const renderClassCards = () => {
    let cards = workoutClassData?.map((workoutClass: any) => {
      return (
        <ClassCard
          onClick={() => cardClicked(workoutClass)}
          key={workoutClass.id}
          name={workoutClass.name}
          description={workoutClass.description}
          image={workoutClass.image}
        />
      );
    });
    return cards;
  };

  return (
    <Container>
      <Row>
        <Col>
          <Suspense fallback={<div>Loading QuickBooking...</div>}>
            <QuickBooking />
          </Suspense>
        </Col>
      </Row>
      <Row>
        <Suspense fallback={<div>Loading...</div>}>
          <div style={{ display: "flex" }}> {renderClassCards()}</div>
        </Suspense>
      </Row>
    </Container>
  );
};

export default HomeContent;
