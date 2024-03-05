import { PrismaClient } from "@prisma/client";
import asyncHandler from "express-async-handler";
const prisma = new PrismaClient();

/**
 * @desc    User can Follow or unFollow any another user
 * @method  POST 
 * @route   /api/v1/follow/:pId
 */
const followOrUn = asyncHandler(async (req, res, next) => {
  const followerId = +req.user.id;
  const followingId = +req.params.userId;
  const relationExists = await prisma.followRelation.findFirst({
    where: {
      followedId: followingId,
      followerId: followerId,
    },
  });
  if (!relationExists) {
    const followRel = await prisma.followRelation.create({
      data: {
        followedId: followingId,
        followerId: followerId,
      },
      include: {
        followed: {
          select: { name: true },
        },
      },
    });
    res.status(200).json({
      status: "Success",
      message: `You are now following ${followRel.followed.name}`,
    });
  } else {
    const unFollowRelation = await prisma.followRelation.delete({
      where: {
        id: relationExists.id,
      },
      include: {
        followed : {
            select : {
                name : true
            }
        }
      }
    });
    res.status(200).json({
      status: "Success",
      message: `You unfollowed: ${unFollowRelation.followed.name}`,
    });
  }
});

export { followOrUn };
