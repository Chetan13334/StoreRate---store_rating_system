const express = require("express");
const cors = require("cors");
const adminRoutes = require("./routes/admin.routes");
const storeRoutes = require("./routes/store.routes");
const ownerRoutes = require("./routes/owner.routes");
const ratingRoutes = require("./routes/rating.routes");
const app = express();

app.use(cors());
app.use(express.json());

// Test Route
app.use("/api/test", require("./routes/test.routes"));

app.use("/api/admin", adminRoutes);

// Auth Route
app.use("/api/auth", require("./routes/auth.routes"));

app.use("/api/admin/stores", storeRoutes);
app.use("/api/stores", storeRoutes);

app.use("/api/ratings", ratingRoutes);

app.use("/api/store-owner", ownerRoutes);


module.exports = app;


