import React, { Suspense, useEffect, useState } from "react";
import { Container, Row, Col, Typography, Alert } from "@bw/alloy-react";

const QuickBooking = React.lazy(() => import("quickBooking/QuickBooking"));
const ClassCard = React.lazy(() => import("reactComponents/ClassCard"));

const HomeContent = ({ location, cardClicked, handleBooking }) => {
  const [workoutClassData, setWorkoutClassData] = useState([]);
  const [date, setDate] = useState("");

  const [showAlert, setShowAlert] = useState(false);

  console.log("location", location?.state);

  useEffect(() => {
    if (location?.state?.booked) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
    }
  }, [location?.state]);
  // Fetch data from the API and subscribe to the observable only once
  useEffect(() => {
    // Fetch workout class data from the server
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5555/data");
        const data = await response.json();
        setWorkoutClassData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Import and subscribe to external workout data
    const subscribeToWorkoutData = async () => {
      try {
        const { default: workoutData } = await import(
          "lunch_workout_app/WorkoutData"
        );
        workoutData.subscribe({
          next: (val) => {
            console.log("Data received:", val);
            setWorkoutClassData(val.classes);
            setDate(val.date);
          },
          error: (err) => {
            console.error("Error subscribing to workout data:", err);
          },
        });
      } catch (error) {
        console.error("Error loading workout data module:", error);
      }
    };

    fetchData();
    subscribeToWorkoutData();
  }, []); // Empty dependencies for initial fetch and subscription

  const renderClassCards = () => {
    let cards = workoutClassData?.map((workoutClass: any) => {
      return (
        <Col key={workoutClass.id}>
          <ClassCard
            onClick={() => cardClicked(workoutClass)}
            key={workoutClass.id}
            name={workoutClass.name}
            description={workoutClass.description}
            image={workoutClass.image}
          />
        </Col>
      );
    });
    if (!cards || cards.length === 0) {
      return (
        <Typography tag="p">No classes available for this date.</Typography>
      );
    }
    return cards;
  };

  return (
    <Container center style={{ margin: "0 auto" }}>
      <Row>
        <Col>
          <Suspense fallback={<div>Loading QuickBooking...</div>}>
            <QuickBooking handleBooking={handleBooking} />
          </Suspense>
        </Col>
      </Row>
      <Row classes="mb-4">
        <Typography classes="m-2" tag="h3">
          Workout Offerings for: {date}
        </Typography>
        <Suspense fallback={<div>Loading...</div>}>
          {renderClassCards()}
        </Suspense>
      </Row>
      <Alert
        open={showAlert}
        title="Booking workout was successful"
        severity="success"
        id="123"
        onClose={() => setShowAlert(false)}
      >
        You're all signed up for {location?.state?.bookedClass?.name} on {date}!
      </Alert>
    </Container>
  );
};

export default HomeContent;
