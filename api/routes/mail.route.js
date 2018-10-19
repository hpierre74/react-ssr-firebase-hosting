import Router from "express";

const router = new Router();
const sendMail = () => {};
router.route("api/mail").post(sendMail);
