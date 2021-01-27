import express from "express";
import { createListing, getListing, searchQuery } from "../actions/listingActions";

import { Listing, randomListing, randomUUID } from "../util/helper";

const router = express.Router();
const NAMESPCE = "USER";

router.get("/", (req, res) => {
  res.status(200).json({
    method: req.method,
    statusCode: 200,
  });
});

router.get("/listings", async (req, res) => {
  const listing: Listing[] = await getListing();
  res.status(200).json({
    success: true,
    listing,
  });
});

router.post("/listings", async (req, res) => {
  const listing = await createListing(randomListing(randomUUID()));
  res.status(200).json({
    status: true,
    listing,
  });
});

router.get("/listings/category/:query", async (req, res) => {
  const query = await searchQuery({ category: req.params.query });
  res.status(200).json({
    status: true,
    query,
  });
});

export default router;
