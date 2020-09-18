const Report = require("../../../models/report");

const status = {
  N: "Negative",
  TQ: "Travelled-Quarantine",
  SQ: "Symptoms-Quarantine",
  PA: "Positive-Admit",
};

module.exports.allReportsByStatus = async function (request, response) {
  let curStatus = request.params.status.toUpperCase();
  console.log(curStatus);

  try {
    curStatus = status[curStatus];
    console.log("new curstats", curStatus);
    if (curStatus) {
      let reports = await Report.find(
        { status: curStatus },
        "status createdAt doctor -_id"
      )
        .sort("createdAt")
        .populate("doctor patient", "mobile name -_id");

      return response.status(200).json({
        message: `All the reports with '${curStatus}' status are :`,
        data: {
          reports: reports,
        },
      });
    } else {
      console.log("Wrong status given");

      return response.status(500, {
        message: "Wrong Status entered",
      });
    }
  } catch (err) {
    console.log("Internal Error", err);
    return response.status(500).json({
      message: "Internal Server Error",
    });
  }
};
