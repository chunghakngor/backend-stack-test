import express from "express";
import { createUser, getUsers, searchQuery } from "../actions/userActions";
import { randomUser, User } from "../util/helper";

const router = express.Router();
const NAMESPCE = "USER";

router.get("/", (req, res) => {
  res.status(200).json({
    method: req.method,
    statusCode: 200,
  });
});

router.get("/users", async (req, res) => {
  const user: User[] = await getUsers();
  res.status(200).json({
    success: true,
    user,
  });
});

router.post("/users", async (req, res) => {
  const user: any = await createUser(randomUser());
  res.status(200).json({
    status: true,
    user,
  });
});

router.get("/users/firstname/:query", async (req, res) => {
  const query = await searchQuery({ firstname: req.params.query });
  res.status(200).json({
    success: true,
    query,
  });
});

router.get("/users/lastname/:query", async (req, res) => {
  const query = await searchQuery({ lastname: req.params.query });
  res.status(200).json({
    success: true,
    query,
  });
});

export default router;
