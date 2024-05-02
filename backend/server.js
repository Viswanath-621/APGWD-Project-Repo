const express = require("express");
const mongoose = require("mongoose");
const multer = require('multer');
const cors = require("cors");
const xlsx = require('xlsx');
const cron = require('cron');
const xupload = multer();


const AuthModel = require("./models/Auth");

// const User = require("./db/user");
const User = require("./db/apgwdusers");
const District = require("./db/district");
// const bcrypt = require('bcrypt');
const villages=require("./db/villages");
const Apgwd=require("./db/apgwd");
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


// app.get('/villages', async (req, res) => {
//   const { district, mandal } = req.query;
//   console.log(district, mandal);
//   console.log(Apgwd);
//   try {
//     const village = await Apgwd.find({ "DISTRICT": district, "MANDAL": mandal });
//     console.log(village);
//     res.json(village);
//   } catch (error) {
//     console.error('Error retrieving villages:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });


app.get('/villages', async (req, res) => {
  const { district, mandal } = req.query;
  console.log(district, mandal);
  console.log(villages);
  try {
    const village = await villages.find({ "District": district, "Mandal": mandal });
    console.log(village);
    res.json(village);
  } catch (error) {
    console.error('Error retrieving villages:', error);
    res.status(500).json({ error: 'Internal Server Error' });
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
    const districts = await villages.find({
      finalvalue: null,
      Value: null,
      District: { $eq: userDistrict },
    });

    console.log(districts + "hi");

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
    const districts = await villages.find({
      finalvalue: { $ne: null },
      Value: { $ne: null },
      District: { $eq: userDistrict },
    });

    res.json(districts);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
//approvalList
// app.get("/approvallist", async (req, res) => {
//   try {
//     const { userDistrict } = req.query;
//     const districts = await District.find({
//       finalvalue: { $ne: null },
//       value: { $ne: null },
//       district: { $eq: userDistrict },
//     });

//     res.json(districts);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// app.post("/login", async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const user = await User.findOne({ username, password });

//     if (!user) {
//       return res
//         .status(401)
//         .json(
//           { error: "Invalid username or Password" },
//           { designation: user.designation }
//         );
//     }

//     if (user.password !== password) {
//       return res
//         .status(401)
//         .json({
//           error: "Invalid username or password",
//           designation: user.designation,
//         });
//     }
//     res
//       .status(200)
//       .json({
//         message: "Login successful",
//         success: true,
//         designation: user.designation,
//         district: user.district,
//         username: user.username,
//       });
//   } catch (error) {
//     res.status(500).json({ error: "Login failed" });
//   }
// });


// app.get("/login", async (req, res) => {
//   try {
//     const { username, password } = req.query; // Changed from req.body to req.query
//     console.log(username, password);
//     const user = await User.findOne({ username, password });
//     console.log(user);
//     if (!user) {
//       return res.status(401).json({ error: "Invalid username or Password" }); // Removed the second argument, it's not needed here
//     }

//     res.status(200).json({
//       message: "Login successful",
//       success: true,
//       designation: user.Designation,
//       district: user.DISTRICT, // Make sure the field name is correct here
//       username: user.name,
//     });
//   } catch (error) {
//     console.error(error); // Log the error for debugging purposes
//     res.status(500).json({ error: "Login failed" });
//   }
// });
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username, password);
    const user = await User.findOne({ username, password });

    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    res.status(200).json({
      message: "Login successful",
      success: true,
      designation: user.Designation,
      district: user.DISTRICT,
      username: user.Name,
    });
  } catch (error) {
    console.error(error);
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
    console.log(userDistrict);
    const districts = await villages.find({
      finalvalue: null,
      Value: { $ne: null },
      District: { $eq: userDistrict },
    });

    res.json(districts);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
// app.post("/update", async (req, res) => {
//   try {
    
//     const currentDateTime = new Date();
//     const { cityId, newValue,editname } = req.body;

//     // Validate cityId and newValue
//     if (!cityId || !newValue) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Invalid request." });
//     }

//     const formattedDateTime = currentDateTime.toLocaleString();
//     // Find the city by id and update the value
//     const updatedCity = await District.findByIdAndUpdate(
//       cityId,
//       // { $set: { value: newValue } },
//       {
//         $set: { value: newValue, finalvalue: null },
//         updatetime: "UpdatedBy " + editname + " At " + formattedDateTime,
//       },
//       { new: true }
//     );

//     if (!updatedCity) {
//       return res
//         .status(404)
//         .json({ success: false, message: "City not found." });
//     }

//     return res
//       .status(200)
//       .json({ success: true, message: "Value updated successfully." });
//   } catch (error) {
//     console.error("Error updating value:", error);
//     return res
//       .status(500)
//       .json({ success: false, message: "Internal server error." });
//   }
// });

app.get("/update", async (req, res) => {
  const { PZ_ID, newValue, editname } = req.query;
  console.log(PZ_ID, newValue, editname);
  
  try {
    if (!PZ_ID || !newValue) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid request." });
    }

    const currentDateTime = new Date();
    const formattedDateTime = currentDateTime.toLocaleString();
    
    // Find the village by PZ_ID and update the value
    const updatedVillage = await villages.findOneAndUpdate(
      { PZ_ID },
      {
        $set: { Value: newValue, finalvalue: null },
        updatetime: "UpdatedBy " + editname + " At " + formattedDateTime,
      },
      { new: true }
    );
    
    if (!updatedVillage) {
      return res
        .status(404)
        .json({ success: false, message: "Village not found." });
    }

    // Respond with the modified village object
    res.json(updatedVillage);
  } catch (error) {
    console.error("Error updating village:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});
//dd only retrieves values to be updated
app.get('/ddretrieve', async (req, res) => {
  try {
    const { userDistrict } = req.query;
      const districts = await villages.find({
          finalvalue: null,
          Value:null,
          District: {$eq:userDistrict}
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
    const updatedCity = await villages.findByIdAndUpdate(
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
    const updatedCity = await villages.findByIdAndUpdate(
      cityId,
      // { $set: { value: null } },
      { $set: { Value: null } },
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
      const city = await villages.findById(cityId);

      if (city) {
        await villages.findByIdAndUpdate(cityId, { finalvalue: city.Value });
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
      const city = await villages.findById(cityId);

      if (city) {
        await villages.findByIdAndUpdate(cityId, { finalvalue: null, Value: null });
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


app.get('/report', async (req, res) => {
  try {
    // Retrieve all villages from the database
    const allVillages = await villages.find({});

    // Respond with the array of all villages
    res.json(allVillages);
  } catch (error) {
    console.error('Error retrieving villages:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Mongoose model for apgwd_villages collection


// const csv = require('csv-parser');
// const fs = require('fs');
// // Route for uploading CSV file
// const path = require('path');

// // Route for uploading CSV file
// app.post('/xupload', upload.single('file'), (req, res) => {
//   // Check if file is uploaded
//   if (!req.file) {
//     return res.status(400).send('No file uploaded');
//   }

//   // Save the uploaded file to disk
//   const filePath = path.join(__dirname, 'uploads', req.file.originalname);
//   fs.writeFileSync(filePath, req.file.buffer);

//   // Parse the CSV file
//   const data = [];
//   fs.createReadStream(filePath)
//     .pipe(csv())
//     .on('data', (row) => {
//       data.push(row);
//     })
//     .on('end', () => {
//       // Update MongoDB collection
//       Promise.all(promises)
//   .then(() => {
//     // Delete the uploaded file from disk
//     fs.unlink(filePath, (err) => {
//       if (err) {
//         console.error('Error deleting file:', err);
//       } else {
//         console.log('File deleted successfully');
//       }
//     });
//     res.status(200).send('Data uploaded successfully');
//   })
//   .catch((error) => {
//     console.error('Error uploading data:', error);
//     res.status(500).send('Internal Server Error');
//   })
      
//         .then(() => {
//           res.status(200).send('Data uploaded successfully');
//         })
//         .catch((error) => {
//           console.error('Error uploading data:', error);
//           res.status(500).send('Internal Server Error');
//         })
//         .finally(() => {
//           // Delete the uploaded file from disk
//           fs.unlinkSync(filePath);
//         });
//     });
//});
const xvillageSchema = new mongoose.Schema({
  PZ_ID: String,
  District: String,
  Mandal: String,
  Village: String,
  Value: String
});

const xVillage = mongoose.model('xVillage', xvillageSchema);

// app.post('/xupload', upload.single('file'), async (req, res) => {
//   try {
//       if (!req.file) {
//           return res.status(400).json({ error: 'No file uploaded' });
//       }

//       const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
//       const sheetName = workbook.SheetNames[0];
//       const worksheet = workbook.Sheets[sheetName];
//       const data = xlsx.utils.sheet_to_json(worksheet);

//       // console.log('Parsed data:', data);

//       // Save data to MongoDB
//       const result = await xVillage.insertMany(data);
//       console.log('Insertion result:', result);

//       res.status(200).json({ message: 'File uploaded successfully' });
//   } catch (error) {
//       console.error('Error uploading file:', error);
//       res.status(500).json({ error: 'Internal server error' });
//   }
// });





// Endpoint for uploading Excel file
app.post('/xupload', upload.single('file'), async (req, res) => {
    try {
      console.log('File upload request received');
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const { tableName } = req.query;
        if (!tableName) {
            return res.status(400).json({ error: 'Table name is required' });
        }
        console.log('Table name:', tableName);
        const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(worksheet);
        console.log('Data extracted from Excel:', data);
        // Create model dynamically based on table name
        const Village = mongoose.model(tableName, xvillageSchema);

        // Save data to MongoDB
        await Village.insertMany(data);
        res.status(200).json({ message: 'File uploaded successfully' });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// app.listen(3001, () => {
//     console.log("sever is running" )
// })

app.listen(8000, () => {
  console.log("sever is running");
});
