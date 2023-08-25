import React from "react";
import { useSelector } from "react-redux";
import EventCard from "../components/Events/EventCard";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";

const EventsPage = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events);

  return (
    <>
      {
        isLoading ? (
          <Loader />
        ) : (
          allEvents.length !== 0 ? (
            <div>
              <Header activeHeading={4} />
              <EventCard active={true} data={allEvents && allEvents[0]} />
            </div>
          ) : (
            <div>
              <Header activeHeading={4} />
              <h2 className="flex justify-center items-center h-[80vh] text-lg">No Events Found!</h2>
            </div>
          )
        )
      }
    </>
  );
};

export default EventsPage;
