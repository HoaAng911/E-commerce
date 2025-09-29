import Address from "../models/Address.model.js";

const AddressController = {
  // Lấy tất cả địa chỉ của user
  getAddresses: async (req, res) => {
    try {
      const addresses = await Address.find({ user: req.user.id });
      res.status(200).json({ addresses });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Lấy chi tiết 1 địa chỉ theo id
  getAddressById: async (req, res) => {
    try {
      const address = await Address.findOne({
        _id: req.params.id,
        user: req.user.id,
      });

      if (!address) {
        return res.status(404).json({ message: "Địa chỉ không tồn tại" });
      }

      res.status(200).json(address);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Thêm địa chỉ mới
  createAddress: async (req, res) => {
    try {
      const { firstName, lastName, email, phone, street, city, isDefault } = req.body;
      const userId = req.user.id;

      // Nếu set mặc định -> bỏ mặc định của các địa chỉ khác
      if (isDefault) {
        await Address.updateMany({ user: userId, isDefault: true }, { isDefault: false });
      } else {
        // Nếu user chưa có địa chỉ nào, set mặc định
        const count = await Address.countDocuments({ user: userId });
        if (count === 0) {
          req.body.isDefault = true;
        }
      }

      const newAddress = new Address({
        firstName,
        lastName,
        email,
        phone,
        street,
        city,
        isDefault: req.body.isDefault || false,
        user: userId,
      });

      await newAddress.save();
      res.status(201).json(newAddress);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Cập nhật địa chỉ
  updateAddress: async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;

      if (updateData.isDefault) {
        // Bỏ mặc định của địa chỉ khác
        await Address.updateMany(
          { user: req.user.id, isDefault: true },
          { isDefault: false }
        );
      }

      const updatedAddress = await Address.findOneAndUpdate(
        { _id: id, user: req.user.id },
        updateData,
        { new: true }
      );

      if (!updatedAddress) {
        return res.status(404).json({ message: "Địa chỉ không tồn tại" });
      }

      res.status(200).json(updatedAddress);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Xoá địa chỉ
  deleteAddress: async (req, res) => {
    try {
      const { id } = req.params;

      const deletedAddress = await Address.findOneAndDelete({
        _id: id,
        user: req.user.id,
      });

      if (!deletedAddress) {
        return res.status(404).json({ message: "Địa chỉ không tồn tại" });
      }

      // Nếu xoá địa chỉ mặc định -> gán địa chỉ còn lại làm mặc định
      if (deletedAddress.isDefault) {
        const firstAddress = await Address.findOne({ user: req.user.id });
        if (firstAddress) {
          firstAddress.isDefault = true;
          await firstAddress.save();
        }
      }

      res.status(200).json({ message: "Xoá địa chỉ thành công" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default AddressController;
