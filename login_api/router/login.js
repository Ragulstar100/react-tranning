import { Router } from "express";
import { loginController } from "../controller/loginController.js";


export const login=Router()

login.post('/login',loginController) 