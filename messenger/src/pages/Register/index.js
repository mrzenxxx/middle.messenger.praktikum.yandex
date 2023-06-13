import Handlebars from "handlebars";
import { template } from "./register.tmpl";

export const Register = () => Handlebars.compile(template)();