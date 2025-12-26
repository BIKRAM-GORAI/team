import ServiceRequest from "../models/ServiceRequest.model.js";

// CREATE SERVICE (Customer)
export const createService = async (req, res) => {
  try {
    const service = await ServiceRequest.create({
      ...req.body,
      customerId: req.user.id   // ensure service belongs to logged-in user
    });

    res.status(201).json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET SERVICES
// 1️⃣ If ?mine=true → return customer's own services
// 2️⃣ Else → return nearby services (provider use)
export const getServices = async (req, res) => {
  try {
    // CUSTOMER: get own services
    if (req.query.mine === "true") {
      const services = await ServiceRequest.find({
        customerId: req.user.id
      }).sort({ createdAt: -1 });

      return res.json(services);
    }

    // PROVIDER: get nearby services
    const { lng, lat, radius } = req.query;

    const services = await ServiceRequest.find({
      status: "OPEN",
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [lng, lat]
          },
          $maxDistance: radius * 1000
        }
      }
    });

    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ASSIGN PROVIDER (Customer)
export const assignProvider = async (req, res) => {
  const { serviceId, providerId } = req.body;

  try {
    const service = await ServiceRequest.findByIdAndUpdate(
      serviceId,
      {
        assignedProvider: providerId,
        status: "IN_PROGRESS"
      },
      { new: true }
    );

    res.json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// COMPLETE SERVICE
export const completeService = async (req, res) => {
  const { serviceId } = req.body;

  try {
    const service = await ServiceRequest.findByIdAndUpdate(
      serviceId,
      { status: "COMPLETED" },
      { new: true }
    );

    res.json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// export const getProviderActiveJob = async (req, res) => {
//   try {
//     const service = await ServiceRequest.findOne({
//       assignedProvider: req.user.id,
//       status: "IN_PROGRESS"
//     })
//       .populate("customerId", "name location")
//       .populate("assignedProvider", "location"); // 🔥 ADD THIS

//     res.json(service);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

export const getProviderActiveJob = async (req, res) => {
  try {
    const service = await ServiceRequest.findOne({
      assignedProvider: req.user.id,
      status: "IN_PROGRESS"
    })
      .populate("customerId", "name location")
      .populate("assignedProvider", "name location");

    console.log("ACTIVE JOB:", JSON.stringify(service, null, 2)); // 🔴 ADD THIS

    res.json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
