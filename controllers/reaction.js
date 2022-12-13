const Reaction = require("../models/Reaction");


const controller = {
  create: async (req, res) => {
    try {
      let new_reaction = await Reaction.create(req.body);
      res.status(201).json({
        id: new_reaction._id,
        response: new_reaction,
        success: true,
        message: "the reaction was successfully created",
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  updateReaction: async (req, res) => {
    let query = {};
    let Id = req.user.id;

    if (req.query.commentId) {
      query = {
        commentId: req.query.commentId,
      };
    }
    if (req.query.name) {
      query = {
        ...query,
        name: req.query.name,
      };
    }
    try {
      let reaction = await Reaction.findOne(query);
      console.log(reaction);
      if (reaction) {
        if (reaction.userId.includes(Id)) {
          await Reaction.findOneAndUpdate(
            { _id: reaction._id },
            { $pull: { userId: Id } },
            { new: true }
          );
          res.status(200).json({
            message: `Event dis${reaction.name}`,
            success: true,
          });
        } else {
          await Reaction.findOneAndUpdate(
            { _id: reaction._id },
            { $push: { userId: Id } },
            { new: true }
          );
          res.status(200).json({
            message: `Event ${reaction.name}`,
            success: true,
            reactioned: false,
          });
        }
      } else {
        res.status(404).json({
          message: `The reaction dont exist in this comment`,
          success: false,
          reactioned: true,
        });
      }
    } catch (error) {
      res.status(400).json({
        message: error.message,
        success: false,
      });
    }
  },

  read: async (req, res) => {
    let query = {};
    if (req.query.commentId) {
      query = { commentId: req.query.commentId };
    }
    
    if (req.query.userId) {
      query = { userId: req.query.userId };
    }

    try {
      let reactions = await Reaction.find(query)
      .populate({path: "userId", select: "name, lastName photo"})
        if (reactions.length > 0) {
          let lengthOfReactions = {};
          reactions.forEach(
            (reaction) =>
              (lengthOfReactions[reaction.name] = reaction.userId.length)
          );

          res.status(200).json({
            lengthOfReactions,
            data: reactions,
            success: true,
            message: `all reactions`,
          });
        } else {
          res.status(404).json({
            success: false,
            message: "No reactions found",
            data: [],
          });
        }
      
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
        data: error,
      });
    }
  },


  
};

module.exports = controller;
