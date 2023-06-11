import mongoose from "mongoose";

const employeeInfoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: "employee",
    },
    phone: {
      type: Number,
      required: false,
    },
    address: {
      type: String,
    },
    salary: {
      type: Number,
    },
    joingDate: {
      type: Date,
      default: Date.now,
    },
    currentProjects: {
      projectName: {
        type: String,
        required: false,
      },
      responsiblity: {
        type: String,
        required: false,
      },
      status: {
        type: String,
        required: false,
      },
    },
    professionalInfo: {
      bonus: {
        type: Number,
        required: false,
      },
      totalLeave: {
        type: Number,
        required: false,
      },
      recentLeave: {
        type: Array,
      },
    },
    image: {
      type: String,
    },
    designation: {
      type: String,
      required: false,
    },
    employeeStatus: {
      type: String,
      required: false,
    },
    leaveRequest: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "LeaveReq",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const EmployeeInfo = mongoose.model("Employee", employeeInfoSchema);

export default EmployeeInfo;
