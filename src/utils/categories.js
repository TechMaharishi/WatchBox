// Importing icon components from react-icons library
import { HiOutlineMusicalNote } from "react-icons/hi2"; // Musical note icon outline
import { BsLaptop } from "react-icons/bs"; // Laptop icon
import { BsEmojiLaughing } from "react-icons/bs"; // Laughing emoji icon
import { TiCodeOutline } from "react-icons/ti"; // Code icon outline
import { IoFastFoodSharp } from "react-icons/io5"; // Food icon sharp
import { AiOutlineHome } from "react-icons/ai"; // Home icon outline
import { AiFillHome } from "react-icons/ai"; // Filled home icon
import { HiMusicalNote } from "react-icons/hi2"; // Musical note icon
import { TiCode } from "react-icons/ti"; // Code icon filled
import { BsFillEmojiLaughingFill } from "react-icons/bs"; // Filled laughing emoji icon
import { BsLaptopFill } from "react-icons/bs"; // Filled laptop icon
import { IoFastFoodOutline } from "react-icons/io5"; // Food icon outline
import { IoSkullSharp } from "react-icons/io5"; // Skull icon sharp
import { IoSkullOutline } from "react-icons/io5"; // Skull icon outline
// import { BsStar } from "react-icons/bs"; // Star icon (commented out)
// import { BsStarFill } from "react-icons/bs"; // Filled star icon (commented out)
import { MdOutlineSportsCricket } from "react-icons/md"; // Cricket icon outline
import { MdSportsCricket } from "react-icons/md"; // Filled cricket icon

// Array of categories with their respective icons
const categories = [
  {
    id: 1, // Unique identifier for the category
    name: "Home", // Name of the category
    icon: <AiOutlineHome style={{ height: "22px", width: "30px" }} />, // Icon for the category when inactive
    active: <AiFillHome style={{ height: "22px", width: "30px" }} />, // Icon for the category when active
  },
  {
    id: 2, // Unique identifier for the category
    name: "React JS", // Name of the category
    icon: <TiCodeOutline style={{ height: "22px", width: "30px" }} />, // Icon for the category when inactive
    active: <TiCode style={{ height: "22px", width: "30px" }} />, // Icon for the category when active
  },
  {
    id: 3, // Unique identifier for the category
    name: "DuaLipa", // Name of the category
    icon: <HiOutlineMusicalNote style={{ height: "22px", width: "30px" }} />, // Icon for the category when inactive
    active: <HiMusicalNote style={{ height: "22px", width: "30px" }} />, // Icon for the category when active
  },
  {
    id: 4, // Unique identifier for the category
    name: "Comedy", // Name of the category
    icon: <BsEmojiLaughing style={{ height: "22px", width: "30px" }} />, // Icon for the category when inactive
    active: (
      <BsFillEmojiLaughingFill style={{ height: "22px", width: "30px" }} /> // Icon for the category when active
    ),
  },
  {
    id: 5, // Unique identifier for the category
    name: "Technology", // Name of the category
    icon: <BsLaptop style={{ height: "22px", width: "30px" }} />, // Icon for the category when inactive
    active: <BsLaptopFill style={{ height: "22px", width: "30px" }} />, // Icon for the category when active
  },
  {
    id: 6, // Unique identifier for the category
    name: "Food", // Name of the category
    icon: <IoFastFoodOutline style={{ height: "22px", width: "30px" }} />, // Icon for the category when inactive
    active: <IoFastFoodSharp style={{ height: "22px", width: "30px" }} />, // Icon for the category when active
  },
  {
    id: 7, // Unique identifier for the category
    name: "Travis Scott", // Name of the category
    icon: <IoSkullOutline style={{ height: "22px", width: "30px" }} />, // Icon for the category when inactive
    active: <IoSkullSharp style={{ height: "22px", width: "30px" }} />, // Icon for the category when active
  },
  {
    id: 8, // Unique identifier for the category
    name: "Cricket", // Name of the category
    icon: <MdOutlineSportsCricket style={{ height: "22px", width: "30px" }} />, // Icon for the category when inactive
    active: <MdSportsCricket style={{ height: "22px", width: "30px" }} />, // Icon for the category when active
  },
];

export default categories; // Export the categories array as default
