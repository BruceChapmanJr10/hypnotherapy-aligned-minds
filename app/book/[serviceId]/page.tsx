import BookingClient from "./BookingClient";

/* ---------------- DYNAMIC BOOKING PAGE ---------------- */
/* Receives serviceId from URL params */

interface Props {
  params: {
    serviceId: string;
  };
}

export default function BookingPage({ params }: Props) {
  return <BookingClient serviceId={params.serviceId} />;
}
