import express from "express";
import { createUser, searchQuery, getUsers } from "../actions/testActions";
import { randomUser, User } from "../util/helper";

const router = express.Router();
const NAMESPCE = "TEST";

router.get("/", (req, res) => {
  res.status(200).json({
    method: req.method,
    statusCode: 200,
  });
});

router.get("/users", async (req, res) => {
  const data: User[] = await getUsers();
  res.status(200).json({
    success: true,
    users: data,
    count: data.length,
  });
});

router.post("/users", async (req, res) => {
  const status: boolean = await createUser(randomUser());
  res.status(200).json({
    status,
  });
});

router.post("/users/firstname/:query", async (req, res) => {
  const results = await searchQuery("firstname", req.params.query);

  res.status(200).json({
    success: true,
    results: results.hits.hits,
  });
});

export default router;
