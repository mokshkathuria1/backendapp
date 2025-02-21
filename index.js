const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

// GET Route
app.get("/bfhl", (req, res) => {
    res.status(200).json({ "operation_code": 1 });
});

// POST Route
app.post("/bfhl", (req, res) => {
    try {
        const { data } = req.body;
        if (!Array.isArray(data)) {
            return res.status(400).json({ is_success: false, message: "Invalid input format" });
        }
        
        let numbers = [], alphabets = [], highest_alphabet = "";
        data.forEach(item => {
            if (!isNaN(item)) numbers.push(item);
            else if (/^[a-zA-Z]$/.test(item)) alphabets.push(item);
        });
        
        if (alphabets.length > 0) {
            highest_alphabet = [alphabets.sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' })).pop()];
        }
        
        res.json({
            is_success: true,
            user_id: "john_doe_17091999",
            email: "john@xyz.com",
            roll_number: "ABCD123",
            numbers,
            alphabets,
            highest_alphabet
        });
    } catch (error) {
        res.status(500).json({ is_success: false, message: "Internal Server Error" });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));