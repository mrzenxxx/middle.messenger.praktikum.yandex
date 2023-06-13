import Handlebars from "handlebars";
import { template } from "./profile.tmpl";

export const Profile = () => Handlebars.compile(template)();