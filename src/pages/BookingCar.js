import { Col, Row, Divider, DatePicker, Checkbox, Modal } from "antd";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
import { getAllCars } from "../redux/actions/carsActions";
import moment from "moment";
import { bookCar } from "../redux/actions/bookingActions";
import StripeCheckout from "react-stripe-checkout";
import AOS from 'aos';
import CreditCardForm from "../pages/CreditCardForm";

import 'aos/dist/aos.css'; // You can also use <link> for styles
const { RangePicker } = DatePicker;
function BookingCar({ match }) {
  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [car, setcar] = useState({});
  const dispatch = useDispatch();
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [totalHours, setTotalHours] = useState(0);
  const [driver, setdriver] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [cardDisabled,setCardDisabled] = useState(false);


  useEffect(() => {
    if (cars.length == 0) {
      dispatch(getAllCars());
    } else {
      setcar(cars.find((o) => o._id == match.params.carid));
    }
  }, [cars]);

  useEffect(() => {
    setTotalAmount(totalHours * car.rentPerHour);
    if (driver) {
      setTotalAmount(totalAmount + 30 * totalHours);
    }
  }, [driver, totalHours]);

  function selectTimeSlots(values) {
    setFrom(moment(values[0]).format("MMM DD yyyy HH:mm"));
    setTo(moment(values[1]).format("MMM DD yyyy HH:mm"));

    setTotalHours(values[1].diff(values[0], "hours"));
  }

  

  function onToken(token){
    const reqObj = {
        token,
        user: JSON.parse(localStorage.getItem("user"))._id,
        car: car._id,
        totalHours,
        totalAmount,
        driverRequired: driver,
        bookedTimeSlots: {
          from,
          to,
        },
      };
  
      dispatch(bookCar(reqObj));
  }



  // handleCallback = ({ issuer }, isValid) => {
  //   if (isValid) {
  //     this.setState({ issuer })
  //   }
  // }

  // handleInputFocus = ({ target }) => {
  //   this.setState({
  //     focused: target.name
  //   })
  // }

  // handleInputChange = ({ target }) => {
  //   if (target.name === 'number') {
  //     target.value = formatCreditCardNumber(target.value)
  //   } else if (target.name === 'expiry') {
  //     target.value = formatExpirationDate(target.value)
  //   } else if (target.name === 'cvc') {
  //     target.value = formatCVC(target.value)
  //   }

  //   this.setState({ [target.name]: target.value })
  // }

  // handleSubmit = e => {
  //   e.preventDefault()
  //   alert('You have finished payment!')
  //   this.form.reset()
  // }

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <Row
        justify="center"
        className="d-flex align-items-center"
        style={{ minHeight: "90vh" }}
      >
        <Col lg={8} sm={12} xs={12} className='p-3'>
          <img src={car.image} className="carimg2 bs1 w-100" data-aos='flip-left' data-aos-duration='1500'/>
        </Col>

        <Col lg={10} sm={24} xs={24} className="text-right">
          <Divider type="horizontal" dashed>
            Car Info
          </Divider>
          <div style={{ textAlign: "right" }}>
            <p>{car.name}</p>
            <p>{car.rentPerHour} Rent Per hour /-</p>
            <p>Fuel Type : {car.fuelType}</p>
            <p>Max Persons : {car.capacity}</p>
          </div>
          {/* <label>From</label>
          <input type="text"name="from" placeholder="from"/>
          <label>To</label>
          <input type="text" name="to" placeholder="to"/> */}
             
          <Divider type="horizontal" dashed>
            Select Time Slots
          </Divider>

        

          <RangePicker
            showTime={{ format: "HH:mm" }}
            format="MMM DD yyyy HH:mm"
            onChange={selectTimeSlots}
          />
          <br />

          <button
            className="btn1 mt-2"
            onClick={() => {
              setShowModal(true);
            }}
          >
            See Booked Slots
          </button>
          {from && to && (
            <div>
              <p>
                Total Hours : <b>{totalHours}</b>
              </p>
              <p>
                Rent Per Hour : <b>{car.rentPerHour}</b>
              </p>
              <Checkbox
                onChange={(e) => {
                  if (e.target.checked) {
                    setdriver(true);
                  } else {
                    setdriver(false);
                  }
                }}
              >
                Driver Required
              </Checkbox>

              <h3>Total Amount : {totalAmount}</h3>

              {/* <button></button> */}
              

              <StripeCheckout
                shippingAddress
                token={onToken}
                currency='inr'
                amount={totalAmount * 100}
                stripeKey="pk_test_51Mn2GqSASOXcBPFNFE4U3oJB4f1wu0STCaboYdtngPELkJz1Co9cdWO94MKzM3ocpS8aScpBdnUsiawfzAndhhon00qsO9AQZa"
              >
                 
             <button className="btn1" >
                Book Now
              </button>

              </StripeCheckout>

              {/* <button className="btn1" onClick={setCardDisabled(true)}>
                Book Now
              </button> */}
            </div>
          )}
        </Col>
{cardDisabled?{CreditCardForm}:null}
        {car.name && (
          <Modal
            visible={showModal}
            closable={false}
            footer={false}
            title="Booked time slots"
          >
            <div className="p-2">
              {car.bookedTimeSlots.map((slot) => {
                return (
                  <button className="btn1 mt-2">
                    {slot.from} - {slot.to}
                  </button>
                );
              })}

              <div className="text-right mt-5">
                <button
                  className="btn1"
                  onClick={() => {
                    setShowModal(false);
                  }}
                >
                  CLOSE
                </button>
              </div>
            </div>
          </Modal>
        )}
      </Row>


    </DefaultLayout>
  );
}

export default BookingCar;
