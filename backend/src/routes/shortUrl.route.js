import express from 'express';
import { createCustomShortUrl, createShortUrl } from '../controller/shorUrl.controller.js';

const router = express.Router();

router.post('/', createShortUrl);


export default router;