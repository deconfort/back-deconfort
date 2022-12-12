let favs = [
    {
        "productId": "63830ee6d4aa2a200107e57f",
        "name": "love",
        "icon": "https://cdn-icons-png.flaticon.com/512/2107/2107845.png",
        "iconBack": "https://cdn-icons-png.flaticon.com/512/2107/2107952.png",
        "userId": []
    }
]

require("dotenv").config();
require("../database");
const Fav = require("../../models/Fav");

favs.forEach((element) => {
    Fav.create(
        {
            productId: element.showId,
            name: element.name,
            icon: element.icon,
            iconBack: element.iconBack,
            userId: element.userId
        }
    )
})
