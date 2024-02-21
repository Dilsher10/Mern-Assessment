const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const port = 5000

app.use(cors());
app.use(express.json());


//DB Connection

mongoose.connect("mongodb+srv://nexentisU:DmK5UiBrDHQ8rUuq@nexentis-cluster.0z4xmv6.mongodb.net/nexentisDB?retryWrites=true&w=majority")
    .then(() => {
        console.log("Database connected successfully")
    }).catch((err) => {
        console.log("No connection")
    });


// Schema

const schemaData = mongoose.Schema({
    name: String,
    email: String,
    mobile: String,
}, {
    timestamps: true
})

const userModel = mongoose.model("nexentis", schemaData);


// Read All

app.get('/', async (req, res) => {
    const userData = await userModel.find({});
    res.send(userData);
})


// Read Single

app.get('/read/:id', async (req, res) => {
    const id = req.params.id;
    const data = await userModel.findById({ _id: id });
    res.send(data);
})


// Create 

app.post("/create", async (req, res) => {
    const data = await userModel(req.body)
    data.save()
    res.send(data)
})


// Update 

app.put('/update/:id', async(req, res) => {
    const id = req.params.id;
    const data = await userModel.findByIdAndUpdate({_id: id}, req.body);
    res.send({ success: true, message: "Data updated successfully", data: data })
})


// Delete 

app.delete("/delete/:id", async(req, res) => {
    const id = req.params.id
    const data = await userModel.deleteOne({_id: id})
    res.send({ success: true, message: "Data deleted successfully", data: data })
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})