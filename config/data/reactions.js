let reactions = [
  {
    commentId: "6397db2b0343e37d295b97db",
    name: "like",
    icon: "https://cdn-icons-png.flaticon.com/512/456/456115.png",
    iconBack: "https://cdn-icons-png.flaticon.com/512/739/739282.png",
    userId: ["63977ab006066b27ce2f2d89"],
  },
  {
    commentId: "6397db2b0343e37d295b97db",
    name: "not-like",
    icon: "https://cdn-icons-png.flaticon.com/512/1612/1612768.png",
    iconBack: "https://cdn-icons-png.flaticon.com/512/1612/1612623.png",
    userId: ["63977ab006066b27ce2f2d89"],
  },
  {
    commentId: "6397db2b0343e37d295b97db",
    name: "love",
    icon: "https://cdn-icons-png.flaticon.com/512/2107/2107845.png",
    iconBack: "https://cdn-icons-png.flaticon.com/512/2107/2107952.png",
    userId: ["63977ab006066b27ce2f2d89"],
  },
  {
    commentId: "6397db2b0343e37d295b97db",
    name: "surprise",
    icon: "https://cdn-icons-png.flaticon.com/512/4397/4397947.png",
    iconBack: "https://cdn-icons-png.flaticon.com/512/2470/2470090.png",
    userId: ["63977ab006066b27ce2f2d89"],
  },
];

require("dotenv").config();
require("../database");
const Reaction = require("../../models/Reaction");

reactions.forEach((elemento) => {
  Reaction.create({
    commentId: elemento.commentId,
    name: elemento.name,
    icon: elemento.icon,
    iconBack: elemento.iconBack,
    userId: elemento.userId,
  });
});
