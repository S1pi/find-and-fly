import {Router} from 'express';
import {validationErrorHandler} from '../middlewares/errorHandlers';

const router = Router();

router.get('/', (req, res) => {
  res.json({message: 'Check for /someroute route'});
});

// router.get("/destinations/all", getAllDestinations);
// router.get("/destinations/:id", getDestinationById);

// router.post("/destinations", createDestination);

// Implemented if needed
// router.put("/destinations/:id", updateDestination);

export default router;
