import { Order } from "../../models/order.js";
import { Branch } from "../../models/branch.js";
import { Customer } from "../../models/user.js";

export const createOder = async (req, reply) => {
  try {
    const { userId } = req.user;
    const { items, branch, totalPrice } = req.body;

    const customerData = await Customer.findById(userId);
    const branchData = await Branch.find(branch);

    if (!customerData) {
      return reply.status(404).send({ message: "Customer not found" });
    }

    const newOder = new Order({
      customer: userId,
      items: items.map((item) => ({
        id: item.id,
        item: item.item,
        count: item.count,
      })),
      branch,
      totalPrice,
      deliveryLocation: {
        latitude: customerData.liveLocation.latitude,
        longitude: customerData.liveLocation.longitude,
        address: customerData.address || "No address available",
      },
      pickupLocation: {
        latitude: branch.liveLocation.latitude,
        longitude: branch.liveLocation.longitude,
        address: branch.address || "No address available",
      },
    });

    const savedOder = await newOder.save();
    return reply.status(201).send(savedOder);
  } catch (error) {
    return reply.status(500).send({ message: "Failed to create order", error });
  }
};
