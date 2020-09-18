const Doctor = require("../../../models/doctors");
const jwt = require("jsonwebtoken");

// creating a new doctor with these informations
module.exports.create = async function (request, response) {
  console.log("doctor signup form body", request.body);
  if (request.body["password"] != request.body["confirm-password"]) {
    console.log("password and confirm password did not matched");

    return response.status(422).json({
      message: "password and confirm password did not matched",
    });
  }

  try {
    let doctor = await Doctor.findOne({ username: request.body.username });
    if (!doctor) {
      let doctor = await Doctor.create(request.body);
      console.log("Dcotro created successfully");
      return response.status(200).json({
        message: "Doctor Signup success",
        data: {
          doctor: {
            _id: doctor.id,
            name: doctor.name,
            username: doctor.username,
          },
        },
      });
    } else {
      console.log("Doctor already exists with this username");
      return response.status(405).json({
        message: "Doctor already exists with this username",
      });
    }
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// login of doctor
module.exports.createSession = function (request, response) {
  // console.log("request", request);
  if (request.user) {
    return response.json(200, {
      status: request.code,
      message: "Sign In Successfull, keep the token safe",
      data: {
        token: jwt.sign(request.user.toJSON(), "hospital", {
          expiresIn: 100000,
        }),
      },
    });
  } else {
    return response.json(500, {
      status: request.code,
      message: "Something is not right",
    });
  }
};
