import { Router } from "express";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

import { CreatePollController } from "./controller/CreatePollController";
import { CreateResponseController } from "./controller/CreateResponseController";
import { ConsultPollController } from "./controller/ConsultPollController";
import { VotePollController } from "./controller/VotePollController";
import { CreateUserController } from "./controller/CreateUserController";
import { AuthenticatorUserController } from "./controller/AuthenticatorUserController";
import { EditPollController } from "./controller/EditPollController";
import { DeletePollController } from "./controller/DeletePollController";
import { ConsultAllPollController } from "./controller/ConsultAllPollController";
import { DetailPollForVoteController } from "./controller/DetailPollForVoteController";
import { UserLoggedController } from "./controller/UserLoggedController";
import { DetailPollForResponseController } from "./controller/DetailPollForResponseController";

const router = Router();

/** User Register and Login */
const createUserController = new CreateUserController();
const authenticatorUserController = new AuthenticatorUserController();
const userLoggedService = new UserLoggedController();

/** Poll */
const createPollController = new CreatePollController();
const createResponseController = new CreateResponseController();
const consultPollController = new ConsultPollController();
const consultAllPollController = new ConsultAllPollController();
const detailPollForVoteController = new DetailPollForVoteController();
const detailPollForResponseController = new DetailPollForResponseController();
const votePollController = new VotePollController();
const editPollController = new EditPollController();
const deletePollController = new DeletePollController();

/** User */
router.post("/createuser", createUserController.handle)
router.post("/login", authenticatorUserController.handle)
router.get("/logged", ensureAuthenticated, userLoggedService.handle)
router.get("/consultallpoll", consultAllPollController.handle)
router.post("/detailpoll", detailPollForVoteController.handle)
router.post("/detailpoll-response", detailPollForResponseController.handle)

router.post("/createpoll", ensureAuthenticated, createPollController.handle)
router.post("/responsecreate", ensureAuthenticated, createResponseController.handle)
router.get("/consultpoll", ensureAuthenticated, consultPollController.handle)
router.post("/votepoll", ensureAuthenticated, votePollController.handle)
router.patch("/editpoll", ensureAuthenticated, editPollController.handle)
router.delete("/deletepoll", ensureAuthenticated, deletePollController.handle)

export { router };