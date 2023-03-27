import { sendSMS } from "../services/otpServices.js";
import {
  findOne,
  insertOne,
  deleteOne,
  updateOne,
} from "../services/mongodb.js";
import { generateOTP, generateRef } from "../services/genUnique.js";
import { v4 as uuidv4 } from "uuid";

const checkOTPAndGetPhone = async (ref, otp) => {
  const option = { projection: { _id: 0, otp: 1, lastSentOTP: 1 } };
  const response = await findOne("otp", { ref }, option);
  if (response?.otp === otp) {
    return true;
  } else {
    return false;
  }
};

const getPhoneByRef = async (ref) => {
  const option = { projection: { _id: 0, phone: 1 } };
  return await findOne("otp", { ref }, option);
};

const checkUserAndGetUser = async (phone) => {
  const option = { projection: { _id: 0 } };
  return await findOne("users", { phone }, option);
};

const confirmOTP = async (req, res) => {
  const { otp, ref } = req.body;
  const resVerifyOTP = await checkOTPAndGetPhone(ref, otp);

  if (resVerifyOTP) {
    const { phone } = await getPhoneByRef(ref);
    const user = await checkUserAndGetUser(phone);

    if (user) {
      return res.status(200).json({
        message: "OTP is correct!",
        ...user,
      });
    } else {
      const newUser = {
        userId: uuidv4(),
        phone,
        point: 0,
      };
      await insertOne("users", newUser);
      return res.status(200).json({
        message: "OTP is correct!",
        ...newUser,
      });
    }
  } else {
    return res.status(400).json({
      message: "OTP is incorrect!",
    });
  }
};

//? --- CHECK CAN SENT OTP --- //

const getCanSentOTP = async (phone) => {
  const option = { projection: { _id: 0, quotaSentOTP: 1, lastSentOTP: 1 } };
  const response = await findOne("otp", { phone }, option);
  return response;
};

const checkCanSentOTP = async (req, res) => {
  let { phone } = req.query;
  console.log("--> check can sent otp");
  console.log(phone);

  const checkSentOTP = await getCanSentOTP(phone);
  var hasSentOTP = false;
  if (checkSentOTP) {
    hasSentOTP = true;
  }

  const waitingTime =
    Math.floor(
      (5 * 60 * 1000 - (new Date() - new Date(checkSentOTP?.lastSentOTP))) /
        1000
    ) || 0;

  return res.status(200).json({
    ...checkSentOTP,
    waitingTime,
    hasSentOTP,
    message: "get can sent OTP success.",
  });
};

//? --- REQUEST OTP --- //

const formatOTP = (otp, ref) => {
  return `Your OTP is ${otp} (Ref. ${ref})`;
};

const setQuotaSentOTP = async (phone, quota, ref, otp) => {
  const updateResponse = await updateOne(
    "otp",
    { phone },
    {
      $set: {
        quotaSentOTP: quota,
        lastSentOTP: new Date(),
        ref,
        otp,
      },
    }
  );

  if (!updateResponse.acknowledged) {
    console.log("--> update data otp failed.");
    return false;
  } else {
    console.log("--> update data otp success.");
    return true;
  }
};

const requestOTP = async (req, res) => {
  let { phone } = req.body;
  console.log(phone);
  console.log("--> request otp");

  const ref = generateRef();
  const otp = generateOTP();
  const smsText = formatOTP(otp, ref);

  //? --- INSERT OTP TO DB --- //
  try {
    const checkSentOTP = await getCanSentOTP(phone);
    if (checkSentOTP) {
      const waitingTime = Math.floor(
        (5 * 60 * 1000 - (new Date() - new Date(checkSentOTP.lastSentOTP))) /
          1000
      );

      if (checkSentOTP.quotaSentOTP > 0) {
        await setQuotaSentOTP(phone, checkSentOTP.quotaSentOTP - 1, ref, otp);
      } else {
        if (waitingTime > 0) {
          return res.status(429).json({
            hasSentOTP: false,
            message: `OTP request limit exceeded. please wait ${waitingTime} seconds.`,
          });
        } else {
          await setQuotaSentOTP(phone, 0, ref, otp);
        }
      }
    } else {
      await insertOne("otp", {
        phone,
        ref,
        otp,
        quotaSentOTP: 2,
        lastSentOTP: new Date(),
        hasSentOTP: true,
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ hasSentOTP: false, message: "request otp failed. 1" });
  }

  //? --- SEND OTP TO USER --- //
  try {
    const SMSResponse = await sendSMS(phone, smsText);
    // console.log(SMSResponse);

    if (!SMSResponse) {
      console.log("---> send sms failed.");

      // const delResponse = await deleteOne("otp", { ref });
      // console.log(
      //   delResponse.acknowledged
      //     ? "---> del data otp success."
      //     : "---> del data otp failed."
      // );
      // return res
      //   .status(400)
      //   .json({ hasSentOTP: false, message: "request otp failed. 2" });

      //! FOR MOCKUP OTP
      console.log(" ==== THIS IS MOCKUP OTP ==== ");
      console.log("OTP: ", otp);
      console.log("REF: ", ref);
      console.log(" ==== THIS IS MOCKUP OTP ==== ");
      const checkSentOTP = await getCanSentOTP(phone);
      return res
        .send({
          ref,
          ...checkSentOTP,
          message: "request otp success.",
        })
        .status(200);
    } else {
      console.log("---> send sms success.");

      const checkSentOTP = await getCanSentOTP(phone);
      return res
        .send({
          ref,
          ...checkSentOTP,
          message: "request otp success.",
        })
        .status(200);
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ hasSentOTP: false, message: "request otp failed. 3" });
  }
};

export { requestOTP, checkCanSentOTP, confirmOTP };
