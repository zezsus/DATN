/** @format */

const Order = require("../modals/order.modal");

const createOrder = async (req, res) => {
  const {
    orderItems,
    itemsPrice,
    shippingPrice,
    totalPrice,
    shippingAddress,
    user,
    isPaid,
    isDelivered,
  } = req.body;

  if (
    !shippingAddress.name ||
    !shippingAddress.address ||
    !shippingAddress.phone ||
    !orderItems
  ) {
    return res.status(400).json({
      status: false,
      message: "Vui lòng điền đầy đủ thông tin và chọn sản phẩm",
    });
  }

  try {
    const newOrder = new Order({
      orderItems,
      shippingAddress,
      itemsPrice,
      shippingPrice,
      totalPrice,
      user,
      isPaid,
      isDelivered,
    });
    await newOrder.save();

    return res.status(201).json({
      status: true,
      message: "Tạo đơn hàng thành công",
      data: newOrder,
    });
  } catch (e) {
    return res.status(500).json({
      status: false,
      message: "Lỗi server",
    });
  }
};

const getAllOrderDetail = async (req, res) => {
  const userId = req.params.id;

  if (!userId) {
    return res.status(400).json({
      status: false,
      message: "Vui lòng chọn người dùng",
    });
  }

  try {
    const userOrder = await Order.find({ user: userId });
    if (!userOrder) {
      return res.status(400).json({
        status: false,
        message: "Không có đơn hàng nào",
      });
    }

    return res.status(200).json({
      status: true,
      data: userOrder,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Lỗi server",
    });
  }
};

const getOrderDetail = async (req, res) => {
  const orderId = req.params.id;
  if (!orderId) {
    return res.status(400).json({
      status: false,
      message: "Vui lòng chọn đơn hàng.",
    });
  }

  try {
    const orderDeltail = await Order.find({ _id: orderId });
    if (!orderDeltail) {
      return res.status(400).json({
        status: false,
        mesage: "Đơn hàng bạn lựa chọn không tồn tại",
      });
    }
    return res.status(200).json({
      status: true,
      data: orderDeltail,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Lỗi server",
    });
  }
};

const getAllOrder = async (req, res) => {
  try {
    const allOrder = await Order.find();
    return res.status(200).json({
      status: true,
      data: allOrder,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Lỗi server",
    });
  }
};

const cancelOrder = async (req, res) => {};

module.exports = {
  createOrder,
  getAllOrderDetail,
  getAllOrder,
  getOrderDetail,
  cancelOrder,
};
