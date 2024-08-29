import UOM from "../models/uomModal.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createUOM = asyncHandler(async (req, res) => {
  try {
    const Uom = await UOM.create({
      user: req.user._id,
      title: req.body.title,
    });
    res.json(Uom);
  } catch (error) {
    res.json(error);
  }
});

export const allUOM = asyncHandler(async (req, res) => {
  try {
    const Uom = await UOM.find().populate("user").sort("-createdAt");
    res.status(200).json({
      success: true,
      count: Uom.length,
      Uom,
    });
  } catch (error) {
    res.json(error);
  }
});

export const deleteUOM = asyncHandler(async (req, res) => {
  try {
    const Uom = await UOM.findById(req.params.id);

    if (Uom) {
      await Uom.deleteOne({ _id: Uom._id });
      res.json({ message: "UOM removed Succesfuly ..." });
    }
  } catch (error) {
    res.json(error);
  }
});

//fetch a single UOM
export const getUOM = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const Uom = await UOM.findById(id)
      .populate("user", "name")
      .sort("-createdAt");
    res.json(Uom);
  } catch (error) {
    res.json(error);
  }
});

export const updateUOM = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const Uom = await UOM.findByIdAndUpdate(
      id,
      {
        title: req?.body?.title,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.json(Uom);
  } catch (error) {
    res.json(error);
  }
});
