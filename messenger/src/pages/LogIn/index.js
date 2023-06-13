import Handlebars from "handlebars";
import { template } from "./login.tmpl";

export const LogIn = () => Handlebars.compile(template)();