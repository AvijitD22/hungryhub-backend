const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://hungryhubadmin:hungryhubMERN@cluster0.v0j0iwk.mongodb.net/hungryhub?retryWrites=true&w=majority";

const connectToMongo = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(mongoURI, { useNewUrlParser: true });
    console.log("Database Connected Successfully");
    const fetched_item_data = await mongoose.connection.db.collection(
      "food_items"
    );
    global.food_items = await fetched_item_data.find({}).toArray();

    const fetched_category_data = await mongoose.connection.db.collection(
      "food_category"
    );
    global.food_category = await fetched_category_data.find({}).toArray();
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

module.exports = connectToMongo;
