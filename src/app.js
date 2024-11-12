const express = require("express");

const connectToDB = require("./config/database");

const UserModel = require("./models/user");

const app = express();

app.use(express.json());

app.get("/test", (req, res) => {
  console.log("testing");
  res.send("working server");
});

app.post("/signup", (req, res) => {
  const newUser = new UserModel(req.body);

  newUser
    .save()
    .then((savedUser) => {
      console.log(savedUser);
      res.send({
        result: "User Saved Succesfully",
        data: savedUser,
      });
    })
    .catch((err) => {
      res.status(400).send("some thing error occured");
    });
});

app.get("/feed", async (req, res) => {
  try {
    const users = await UserModel.find({});

    res.send({
      result: "User Saved Succesfully",
      data: users,
    });
  } catch (error) {
    res.status(400).send("some thing error occured");
  }
});

app.put("/user", async (req, res) => {
  try {
    console.log(req.body._id, req.body);
    const updatedUser = await UserModel.updateOne(
      { _id: req.body._id },
      req.body
    );
    res.send({ result: "User Updated successfully", data: updatedUser });
  } catch (error) {
    res.send("some thing went wrong");
  }
});

app.delete("/user/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(req.params);
    await UserModel.deleteOne({ _id: id });
    res.send({
      result: "User Deleted successfully",
      data: {},
    });
  } catch (error) {
    res.send("unable to delete something went wrong");
  }
});

connectToDB()
  .then(() => {
    console.log("data base connected successfully");
    app.listen(4444, () => {
      console.log("server is listening on port 4444");
    });
  })
  .catch((err) => {
    console.log("data base is not connected take care of errors", err);
  });
