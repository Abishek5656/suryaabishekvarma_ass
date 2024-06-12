import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asynchandler.js";
import { Medicine } from "../models/medicine.model.js";

const createMedicine = asyncHandler(async (req, res) => {
  const {
    name,
    manufactutrer,
    skuType,
    skuId,
    skuLabel,
    composition,
    quantity,
    price,
  } = req.body;

  const existingMedicine = await Medicine.findOne({ skuId: skuId });

  if (existingMedicine) {
    throw new ApiError(400, "Already Medicine Exist");
  }

  // Create the Medicine
  const medicine = await Medicine.create({
    name,
    manufactutrer,
    skuType,
    skuLabel,
    skuId,
    composition,
    quantity,
    price,
  });

  // Check if the  medicine was successfully created
  if (!medicine) {
    throw new ApiError(400, "Failed to create  medicine");
  }

  // Return the response
  return res
    .status(201)
    .json(new ApiResponse(201, "Medicine successfully saved"));
});

export { createMedicine };
