import ServiceRequest from "../models/ServiceRequest.model.js";

export const createService = async (req, res) => {
  try {
    const service = await ServiceRequest.create(req.body);
    res.status(201).json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getNearbyServices = async (req, res) => {
  const { lng, lat, radius } = req.query;

  try {
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
