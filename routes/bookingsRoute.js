const express = require("express");
const router = express.Router();
const Booking = require("../models/bookingModel");
const Car = require("../models/carModel");
const { v4: uuidv4 } = require("uuid");
// const express = require("express");
// const Booking = require("../models/bookingModel");
// const Car = require("../models/carModel");

router.post("/bookcar", async (req, res) => {
  req.body.transactionId = "1234";
  try {
    const newbooking = new Booking(req.body);
    await newbooking.save();
    const car = await Car.findOne({ _id: req.body.car });
    car.bookedTimeSlots.push(req.body.bookedTimeSlots);
    res.send("Your Booking Is Successfull");
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

module.exports = router;






// const stripe = require("stripe")(
//   "sk_test_51Mn2GqSASOXcBPFN2Y3HYQT5zLgdLRLwKhy6B920jaafODRvybOWZtSHx2QAu7G76A9aDw5LaMR5ZPreOb3mkCrL00DZjSrZzg"
// );
// router.post("/bookcar", async (req, res) => {
//   const { token } = req.body;
//   try {
//     const customer = await stripe.customers.create({
//       email: token.email,
//       source: token.id,
//     });

//     const payment = await stripe.charges.create(
//       {
//         amount: req.body.totalAmount * 100,
//         currency: "inr",
//         customer: customer.id,
//         receipt_email: token.email
//       },
//       {
//         idempotencyKey: uuidv4(),
        
//       }
//     );

//     if (payment) {
//       req.body.transactionId = payment.source.id;
//       const newbooking = new Booking(req.body);
//       await newbooking.save();
//       const car = await Car.findOne({ _id: req.body.car });
//       console.log(req.body.car);
//       car.bookedTimeSlots.push(req.body.bookedTimeSlots);

//       await car.save();
//       res.send("Your booking is successfull");
//     } else {
//       return res.status(400).json(error);
//     }
//   } catch (error) {
//     console.log(error);
//     return res.status(400).json(error);
//   }
// });





router.get("/getallbookings", async(req, res) => {

    try {

        const bookings = await Booking.find().populate('car')
        res.send(bookings)
        
    } catch (error) {
        return res.status(400).json(error);
    }
  
});


router.post("/editcarbooking", async (req, res) => {
  try {
    const booking = await Booking.findOne({ _id: req.body._id });
    booking.from = req.body.from;
    booking.to = req.body.to;
    booking.totalHours = req.body.totalHours;
    booking.totalAmount = req.body.totalAmount;
    booking.transactionId=req.body.transactionId;
    booking.driverRequired = req.body.driverRequired;

    await booking.save();

    res.send("CarBooking details updated successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});



router.post("/deletecarbooking", async (req, res) => {
  try {
    await Booking.findOneAndDelete({ _id: req.body.bookingid });

    res.send("Car-Booking deleted successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});




module.exports = router;
