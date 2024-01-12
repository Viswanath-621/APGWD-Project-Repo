const express = require("express");
const mongoose = require("mongoose");
const multer = require('multer');
const cors = require("cors");

const AuthModel = require("./models/Auth");

const User = require("./db/user");
const District = require("./db/district");
const bcrypt = require('bcrypt');

const app = express();

app.use(express.json());
app.use(cors());



// mongoose.connect("mongodb+srv://apgwd:apgwd@apgwd.q3uwssp.mongodb.net/data?retryWrites=true&w=majority")
mongoose
  .connect(
    "mongodb+srv://ajayajay142018:THszi8tuPRRKzMin@cluster0.6tkhn2s.mongodb.net/ajay?retryWrites=true&w=majority&appName=AtlasApp"
  )
  .then(() => {
    console.log("Success");
  })
  .catch((err) => {
    console.log(err);
  });

const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage: storage });

app.post("/signup", (req, res) => {
  AuthModel.create(req.body)
    .then((auth) => res.json(auth))
    .catch((err) => res.json(err));
});

// check this 
// app.post('/profileupload/:username', upload.single('photo'), async (req, res) => {
//   try {
//     const { username } = req.params;
//     const user = await User.findOneAndUpdate({ username }, { photo: req.file.buffer.toString('base64') });
//     res.status(200).json({ message: 'File uploaded successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

app.post('/profileupload', async (req, res) => {
  try {
    const { photo1, address, name,editname } = req.body;
    console.log(photo1, address, name);
    
    const user = await User.findOneAndUpdate(
      { username: editname }, // Query to find the user by name
      {
        $set: {
          image: photo1,
          address: address,
          username:name
        }
      },
      { new: true } // Return the updated document
    );

    if (!user) {
      console.log('fdfd0');
    }

    res.status(200).json({ message: 'File uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// app.post("/login", (req,res) => {
//     const {email, password} = req.body;
//     AuthModel.findOne({email:email})
//     .then(user =>{
//         if (user) {
//             if(user.password === password) {
//                 res.json("Success")
//             } else {
//                 res.json("The Password is incorrect")
//             }
//         }else {
//             res.json("NOT Registered")
//         }
//     })
// })

//pendingList
app.get("/pendinglist", async (req, res) => {
  try {
    const { userDistrict } = req.query;
    const districts = await District.find({
      finalvalue: null,
      value: null,
      district: { $eq: userDistrict },
    });

    res.json(districts);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
//approvalList
app.get("/approvallist", async (req, res) => {
  try {
    const { userDistrict } = req.query;
    const districts = await District.find({
      finalvalue: { $ne: null },
      value: { $ne: null },
      district: { $eq: userDistrict },
    });

    res.json(districts);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });

    if (!user) {
      return res
        .status(401)
        .json(
          { error: "Invalid username or Password" },
          { designation: user.designation }
        );
    }

    if (user.password !== password) {
      return res
        .status(401)
        .json({
          error: "Invalid username or password",
          designation: user.designation,
        });
    }
    res
      .status(200)
      .json({
        message: "Login successful",
        success: true,
        designation: user.designation,
        district: user.district,
        username: user.username,
      });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});
// app.post("/login", async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const user = await User.findOne({ username });

//     if (!user) {
//       return res.status(401).json({ error: "Invalid username or password" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(401).json({ error: "Invalid username or password" });
//     }

//     // Rest of your login logic...
//   } catch (error) {
//     res.status(500).json({ error: "Login failed" });
//   }
// });
//employee Retrieve
app.get("/employeeretrieve", async (req, res) => {
  try {
    const { userDistrict } = req.query;
    // console.log(userDistrict);
    // Check if userDistrict is provided and filter districts accordingly
    const query = userDistrict ? { district: userDistrict } : {};

    const districts = await District.find(query);
    res.json(districts);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// admin retrieve

app.get("/adminretrieve", async (req, res) => {
  try {
    const { userDistrict } = req.query;
    const districts = await District.find({
      finalvalue: null,
      value: { $ne: null },
      district: { $eq: userDistrict },
    });

    res.json(districts);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
app.post("/update", async (req, res) => {
  try {
    
    const currentDateTime = new Date();
    const { cityId, newValue,editname } = req.body;

    // Validate cityId and newValue
    if (!cityId || !newValue) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid request." });
    }

    const formattedDateTime = currentDateTime.toLocaleString();
    // Find the city by id and update the value
    const updatedCity = await District.findByIdAndUpdate(
      cityId,
      // { $set: { value: newValue } },
      {
        $set: { value: newValue, finalvalue: null },
        updatetime: "UpdatedBy " + editname + " At " + formattedDateTime,
      },
      { new: true }
    );

    if (!updatedCity) {
      return res
        .status(404)
        .json({ success: false, message: "City not found." });
    }

    return res
      .status(200)
      .json({ success: true, message: "Value updated successfully." });
  } catch (error) {
    console.error("Error updating value:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
});

//dd only retrieves values to be updated
app.get('/ddretrieve', async (req, res) => {
  try {
    const { userDistrict ,editname} = req.query;
      const districts = await District.find({
          finalvalue: null,
          value:null,
          district: {$eq:userDistrict}
      });

      res.json(districts);
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
});


//dd directly submits the value
app.post("/ddupdate", async (req, res) => {
  try {
    const currentDateTime = new Date();

    const { cityId, newValue, editname } = req.body;

    // Validate cityId and newValue
    if (!cityId || !newValue) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid request." });
    }
    const formattedDateTime = currentDateTime.toLocaleString();

    // Find the city by id and update the value
    const updatedCity = await District.findByIdAndUpdate(
      cityId,
      {
        $set: {
          value: newValue,
          finalvalue: newValue,
          updatetime: "UpdatedBy " + editname + " At " + formattedDateTime,
        },
      },
      { new: true }
    );

    if (!updatedCity) {
      return res
        .status(404)
        .json({ success: false, message: "City not found." });
    }

    return res
      .status(200)
      .json({ success: true, message: "Value updated successfully." });
  } catch (error) {
    console.error("Error updating value:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
});

//adminupdate
app.post("/adminupdate", async (req, res) => {
  try {
    const { cityId, newValue } = req.body;

    // Validate cityId and newValue
    if (!cityId || !newValue) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid request." });
    }

    // Find the city by id and update the value
    const updatedCity = await District.findByIdAndUpdate(
      cityId,
      { $set: { finalvalue: newValue } },
      { new: true }
    );

    if (!updatedCity) {
      return res
        .status(404)
        .json({ success: false, message: "City not found." });
    }

    return res
      .status(200)
      .json({ success: true, message: "Value updated successfully." });
  } catch (error) {
    console.error("Error updating value:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
});

//admin csncel
app.post("/admincancel", async (req, res) => {
  try {
    const { cityId } = req.body;

    // Validate cityId and newValue
    if (!cityId) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid request." });
    }

    // Find the city by id and update the value
    const updatedCity = await District.findByIdAndUpdate(
      cityId,
      // { $set: { value: null } },
      { $set: { value: null } },
      { new: true }
    );

    if (!updatedCity) {
      return res
        .status(404)
        .json({ success: false, message: "City not found." });
    }

    return res
      .status(200)
      .json({ success: true, message: "Value updated successfully." });
  } catch (error) {
    console.error("Error updating value:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
});

async function updateFinalValueForAllRecords(model) {
  try {
    const currentDate = new Date();
    const yearMonthKey = `${currentDate.getFullYear()}${(
      currentDate.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}`;
    const records = await model.find().exec();

    records.forEach(async (record) => {
      const filter = { _id: record._id };
      const update = {
        $set: {
          [`previousdata.${yearMonthKey}`]: record.finalvalue,
          finalvalue: null,
          value: null,
        },
      };
      await model.updateOne(filter, update);
    });
  } catch (error) {
    console.error("Error updating records:", error);
    throw error;
  }
}

app.post("/employeetransfer", async (req, res) => {
  try {
    const { username, transferto } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Ensure 'transfer' array exists and is initialized
    user.transfer = user.transfer || [];

    // Set the user's district
    user.district = transferto;

    // Add newdistrict to the transfer array
    user.transfer.push(transferto);

    // Save the updated user
    await user.save();

    res.json({
      message: "User district and transfer array updated successfully",
    });
  } catch (error) {
    console.error("Error updating records:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


//admin submits all the values
app.post('/adminsubmitall', async (req, res) => {
  const { cityIds } = req.body;

  try {
    for (const cityId of cityIds) {
      const city = await District.findById(cityId);

      if (city) {
        await District.findByIdAndUpdate(cityId, { finalvalue: city.value });
      } else {
        console.error(`City with ID ${cityId} not found`);
      }
    }

    res.json({ success: true, message: 'Submit all successful' });
  } catch (error) {
    console.error('Error submitting all:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});


//admin cancel all the values
app.post('/admincancelall', async (req, res) => {
  const { cityIds } = req.body;

  try {
    for (const cityId of cityIds) {
      const city = await District.findById(cityId);

      if (city) {
        await District.findByIdAndUpdate(cityId, { finalvalue: null, value: null });
      } else {
        console.error(`City with ID ${cityId} not found`);
      }
    }

    res.json({ success: true, message: 'Submit all successful' });
  } catch (error) {
    console.error('Error submitting all:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

app.get('/getalldd', async (req, res) => {
  try {
    const admins = await User.find({ designation: 'admin' });
    res.json(admins);
  } catch (error) {
    console.error('Error finding admins:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// app.listen(3001, () => {
//     console.log("sever is running" )
// })

app.listen(8000, () => {
  console.log("sever is running");
});
