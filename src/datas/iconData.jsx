// File này tạo ra chỉ để nhập và xuất icon từ thư viện bằng jsx

// nhập icon theo hướng dẫn của web https://react-icons.github.io/react-icons/
// Bộ io5
import { IoHomeOutline, IoHomeSharp } from "react-icons/io5";
// Bộ Fa
import {
  FaChevronRight,
  FaBirthdayCake,
  FaBabyCarriage,
  FaCalendarCheck,
  FaBook,
  FaHandHoldingHeart,
  FaSign,
  FaAddressCard,
  FaBoxOpen,
  FaEye,
  FaTshirt,FaShare ,FaBuilding 
} from "react-icons/fa";
// Bộ Cg
// import { CgBoy, CgGirl } from "react-icons/cg";
//Bộ Gi
import { GiTripleGate, GiFireworkRocket, GiNestedHearts, GiConvergenceTarget,GiBalloonDog ,GiBalloons,GiDiamondRing   } from "react-icons/gi";
// Bộ Md
import { MdElderlyWoman } from "react-icons/md";
// Bộ Bi
import { BiSolidSticker, BiSolidDiscount } from "react-icons/bi";
// Bộ Tb
import { TbWorldWww, TbBoxModel } from "react-icons/tb";
//Bộ Gr
import { GrWorkshop } from "react-icons/gr";
// xuất icon theo những cái đã nhập phía trên
export const ICONS = {
  home: { stroke: <IoHomeSharp />, fill: <IoHomeSharp /> },
  birthday: { stroke: <FaBirthdayCake />, fill: <FaBirthdayCake /> },
  gate: { stroke: <GiTripleGate />, fill: <GiTripleGate /> },
  firework: { stroke: <GiFireworkRocket />, fill: <GiFireworkRocket /> },
  fullmonth: { stroke: <FaBabyCarriage />, fill: <FaBabyCarriage /> },
  celebrate: { stroke: <FaCalendarCheck />, fill: <FaCalendarCheck /> },
  concept: { stroke: <FaBook />, fill: <FaBook /> },
  heart: { stroke: <GiNestedHearts />, fill: <GiNestedHearts /> },
  elder: { stroke: <MdElderlyWoman />, fill: <MdElderlyWoman /> },
  donate: { stroke: <FaHandHoldingHeart />, fill: <FaHandHoldingHeart /> },
  yep: { stroke: <GiFireworkRocket />, fill: <GiFireworkRocket /> },
  decor: { stroke: <GiBalloons />, fill: <GiBalloons /> },
   wedding: { stroke: <GiDiamondRing />, fill: <GiDiamondRing /> },
  // ... khai báo các icon khác
  logo: { stroke: <GiConvergenceTarget />, fill: <GiConvergenceTarget /> },
  sticker: { stroke: <BiSolidSticker />, fill: <BiSolidSticker /> },
  sign: { stroke: <FaSign />, fill: <FaSign /> },
  businesscard: { stroke: <FaAddressCard />, fill: <FaAddressCard /> },
  web: { stroke: <TbWorldWww />, fill: <TbWorldWww /> },
  box: { stroke: <FaBoxOpen />, fill: <FaBoxOpen /> },
  voucher: { stroke: <BiSolidDiscount />, fill: <BiSolidDiscount /> },
  posm: { stroke: <FaEye />, fill: <FaEye /> },
  uniform: { stroke: <FaTshirt />, fill: <FaTshirt /> },
  booth: { stroke: <TbBoxModel />, fill: <TbBoxModel /> },
  // ... các icon khác được dùng lại cho 2 tab
  form: { stroke: <FaShare />, fill: <FaShare /> },
  workshop: { stroke: <GrWorkshop />, fill: <GrWorkshop /> },
  company: { stroke: <FaBuilding />, fill: <FaBuilding /> },
};
