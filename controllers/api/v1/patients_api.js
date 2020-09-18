const Patient = require("../../../models/patients");
const Report = require("../../../models/report");

const status = {
  N: "Negative",
  TQ: "Travelled-Quarantine",
  SQ: "Symptoms-Quarantine",
  PA: "Positive-Admit",
};

// create patient using the phone number
module.exports.create = async function (request, response) {
  try {
    let patient = await Patient.findOne(
      { mobile: request.body.mobile },
      "name mobile"
    );
    if (!patient) {
      let patient = await Patient.create({
        mobile: request.body.mobile,
        name: request.body.name,
      });
      console.log("Patient created successfully");

      return response.status(200).json({
        message: "Patient Registration success",
        data: {
          patient: { name: patient.name, mobile: patient.mobile },
        },
      });
    } else {
      console.log("Patient with this mobile no already exists");

      return response.status(409).json({
        message: "Patient with this mobile no already exists",
        data: {
          patient: { name: patient.name, mobile: patient.mobile },
        },
      });
    }
  } catch (err) {
    console.log("Error api", err);
    return response.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// Creating report of a patient with ID as its phone number, because phone number is unique for all patients
module.exports.createReport = async function (request, response) {
  const patientId = request.params.id; //finding a patient with mobile number as its id
  try {
    let patient = await Patient.findOne({ mobile: patientId });

    if (patient) {
      request.body.patient = patient._id;
      request.body.doctor = request.user._id;
      request.body.status = status[request.body.status.toUpperCase()];
      if (!request.body.status) {
        console.log("No status sent");
        return response.status(409).json({
          message: "Status Not correct",
        });
      }
      let report = await (await Report.create(request.body))
        .populate("doctor patient", "name mobile _id")
        .execPopulate();

      if (report) {
        console.log(report);
        patient.reports.push(report._id);
        patient.save();

        return response.status(200).json({
          message: "Report created successfully",
          data: {
            report: report,
          },
        });
      } else {
        console.log("Error in creating report");
        return response.status(500).json({
          message: "Internal Server Error",
        });
      }
    } else {
      return response.status(409).json({
        message: "Patient ID incorrect",
      });
    }
  } catch (err) {
    console.log("Error api", err);
    return response.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports.allReports = async function (request, response) {
  const patientId = request.params.id;
  try {
    let patient = await Patient.findOne({ mobile: patientId });
    if (patient) {
      let reports = await Report.find(
        { patient: patient._id },
        "status createdAt doctor -_id"
      )
        .sort("createdAt")
        .populate("doctor", "name -_id");

      return response.status(200).json({
        message: `All report of '${patient.name}'`,
        data: {
          patient: { name: patient.name, mobile: patient.mobile },
          reports: reports,
        },
      });
    } else {
      return response.status(500).json({
        message: "Patient ID not found",
      });
    }
  } catch (err) {
    console.log("Error api", err);
    return response.status(500).json({
      message: "Internal Server Error",
    });
  }
};
