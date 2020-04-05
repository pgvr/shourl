import express, { Request, Response } from "express"

const router = express.Router()

router.get("/", (req: Request, res: Response) => {
    res.send("Decode")
})

export default router

// router.get('/', validator(schema.userId, ValidationSource.PARAM),
// 	asyncHandler(async (req: ProtectedRequest, res, next) => {
// 		const user = await UserRepo.findPublicProfileById(new Types.ObjectId(req.params.id));
// 		if (!user) throw new BadRequestError('User not registered');
// 		return new SuccessResponse('success', _.pick(user, ['name', 'profilePicUrl'])).send(res);
// 	}));
