import Chat from "../models/Chat.model.js";

export const sendMessage = async (req, res) => {
  try {
    const message = await Chat.create(req.body);
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const messages = await Chat.find({
      serviceRequestId: req.params.serviceId
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
