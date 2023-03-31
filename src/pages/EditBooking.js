// import { Col, Row, Form, Input } from "antd";
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import DefaultLayout from "../components/DefaultLayout";
// import Spinner from "../components/Spinner";
// import {editCarBooking, getAllBookings } from "../redux/actions/bookingActions";

// function EditBooking({ match }) {
//   const { bookings } = useSelector((state) => state.bookingsReducer);
//   const dispatch = useDispatch();
//   const { loading } = useSelector((state) => state.alertsReducer);
//   const [booking, setbooking] = useState();
//   const [totalcarbookings, settotalcarbookings] = useState([]);
//   useEffect(() => {
//     if (bookings.length == 0) {
//       dispatch(getAllBookings());
//     } else {
//         settotalcarbookings(bookings);
//       setbooking(bookings.find((o) => o._id == match.params.bookingid));
//       console.log(booking);
//     }
//   }, [bookings]);

//   function onFinish(values) {
//     values._id = booking._id;

//     dispatch(editCarBooking(values));
//     console.log(values);
//   }

//   return (
//     <DefaultLayout>
//       {loading && <Spinner />}
//       <Row justify="center mt-5">
//         <Col lg={12} sm={24} xs={24} className='p-2'>
//           {totalcarbookings.length > 0 && (
//             <Form
//               initialValues={booking}
//               className="bs1 p-2"
//               layout="vertical"
//               onFinish={onFinish}
//             >
//               <h3>Edit Car Booking</h3>

//               <hr />
//               <Form.Item
//                 name="name"
//                 label="Car name"
//                 rules={[{ required: true }]}
//               >
//                 <Input />
//               </Form.Item>
//               <Form.Item
//                 name="image"
//                 label="Image url"
//                 rules={[{ required: true }]}
//               >
//                 <Input />
//               </Form.Item>
//               <Form.Item
//                 name="rentPerHour"
//                 label="Rent per hour"
//                 rules={[{ required: true }]}
//               >
//                 <Input />
//               </Form.Item>
//               <Form.Item
//                 name="capacity"
//                 label="Capacity"
//                 rules={[{ required: true }]}
//               >
//                 <Input />
//               </Form.Item>
//               <Form.Item
//                 name="fuelType"
//                 label="Fuel Type"
//                 rules={[{ required: true }]}
//               >
//                 <Input />
//               </Form.Item>

//               <div className="text-right">
//                 <button className="btn1">Edit CAR Booking</button>
//               </div>
//             </Form>
//           )}
//         </Col>
//       </Row>
//     </DefaultLayout>
//   );
// }

// export default EditBooking;
