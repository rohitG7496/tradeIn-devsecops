import { ReservePayment, RetrievePost } from "../../api/pathConstants";
import { Request } from "../../api/Request";
import { openSnackbar } from "../snackbar/snackbarActions";
import { getToken, removeTokenRequest } from "../token/tokenActions";
import { MAKE_PAYMENT } from "./paymentTypes";

export const makePayment = () => {
  return {
    type: MAKE_PAYMENT,
  };
};


export const loadScript = () => {
  const script = document.createElement("script");
  script.src = "https://checkout.razorpay.com/v1/checkout.js";
  script.async = true;
  document.body.appendChild(script);
};

export const makeReservedPayment = (product_id,amount) => {
  return async (dispatch, getState) => {
    await dispatch(loadScript());
    await dispatch(getToken());
    const token = await getState().token.access;
    const data = {
      amount:amount,
      username:getState().mydetails.myDetails.username,
      reserve_product:product_id,
    }
    const res = await Request(
      "POST",
      ReservePayment,
      token,
      data
    );
    // console.log(res);
    if (res && res.status === 200) {
      var options = {
        key: `${process.env.REACT_APP_RAZORPAY_KEY}`,
        key_secret: `${process.env.REACT_APP_RAZORPAY_SECRET_KEY}`,
        amount: res.data.payment.amount,
        currency: "INR",
        name: "TradeIn",
        description: "Reserved this product for two days",
        image: "", // add image url
        // order_id: data.data.payment.id,
        handler: async function (response) {
          // we will handle success by calling handlePayment method and
          // will pass the response that we've got from razorpay
          // await dispatch(handlePaymentSuccess(response));
        },
        prefill: {
          name: "User's name",
          email: "User's email",
          contact: "User's phone",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#9147ff",
        },
      };
  
      var rzp1 =await new window.Razorpay(options);
      rzp1.open();
    }
     else if (res && res.status != 200) {
      await dispatch(openSnackbar("Something went wrong"));
    } else {
      await dispatch(openSnackbar("Network error"));
    }
  };
};



 export const handlePaymentSuccess = (response) => {
    return async (dispatch, getState) => {
    try {
    
      // we will send the response we've got from razorpay to the backend to validate the payment
      const res = await Request(
        "POST",
        // ReservePaymentSuccess,
        // token,
        response
      );
    
      if(res && res.status==200){
        await dispatch(makePayment());
      }
    } catch (error) {
      // console.log(console.error());
    }
  };
}