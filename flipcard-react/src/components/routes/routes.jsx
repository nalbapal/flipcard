import {Route, Routes} from "react-router-dom";
import {SignIn} from "../public/login/SignIn";
import {Register} from "../public/Register";
import {Welcome} from "../home/Welcome";
import {ErrorPage} from "../public/error/404";
import {AboutUs} from "../public/AboutUs";
import {ContactMe} from "../contact/ContactMe";
import Boxes from "../Boxes/Boxes";
import EditProfile from "../public/EditProfile";
import DetailedBox from "../Boxes/DetailedBox";
import DetailedBoxPublic from "../Boxes/DetailedBoxPublic";

export const routesBeforeLogin = () => {
    return <Routes>
        <Route path={"/"} element={<SignIn/>}/>
        <Route path={"/login"} element={<SignIn/>}/>
        <Route path={"/register"} element={<Register/>}/>
    </Routes>;
}

export const routesAfterLogin = () => {
    return <Routes>
        <Route path={"/"} element={<Welcome/>}/>
        <Route path={"/home"} element={<Welcome/>}/>
        <Route path={"*"} element={<ErrorPage/>}/>
        <Route path={"/my-boxes"} element={<Boxes/>}/>
        <Route path={"/profile"} element={<EditProfile/>}/>
        <Route path={"/detailed-box/:id"} element={<DetailedBox/>}/>
        <Route path={"/detailed-box-public/:id"} element={<DetailedBoxPublic/>}/>
        <Route path={"/contact"} element={<ContactMe/>}/>
        <Route path={"/about-us"} element={<AboutUs/>}/>
        <Route path={"/edit-profile"} element={<EditProfile/>}/>
    </Routes>;
}
