import Bus from "../models/bus.model.js";

//desc    Get all buses
 //route   GET /api/buses
 //access  Public
 
export const getAllBuses = async (req, res) => {
  try {
    const buses = await Bus.find().lean();

    res.status(200).json({
      success: true,
      count: buses.length,
      buses,
    });

  } catch (error) {
    console.error("Fetch buses error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch buses",
    });
  }
};


 //desc    Create new bus (Admin – future)
 //route   POST /api/buses
 //access  Private (Admin later)
 
export const createBus = async (req, res) => {
  try {
    const { name, from, to, date, price, seats } = req.body;

    
    if (!name || !from || !to || !date || !price || !seats) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (isNaN(price) || price <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid price",
      });
    }

    if (isNaN(seats) || seats <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid seat count",
      });
    }

    // Create bus
    const bus = await Bus.create({
      name,
      from,
      to,
      date,
      price,
      seats,
    });

    res.status(201).json({
      success: true,
      bus,
    });

  } catch (error) {
    console.error("Create bus error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create bus",
    });
  }
};
