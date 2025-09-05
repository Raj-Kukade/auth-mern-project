import express from 'express';
import ensureAuthenticated from "../middlewares/Auth.js"; 

const router = express.Router();

router.get('/', ensureAuthenticated, (req, res) => {
console.log(" loggedin user detail ",req.user);


    res.status(200).json([
        {
            name: "mobile",
            price: "30,000"
        },
        {
            name: "pen",
            price: "10"
        }
    ]);
});

export default router;
