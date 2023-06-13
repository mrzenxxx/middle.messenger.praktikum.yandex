import Handlebars from "handlebars";
import { template } from "./main.tmpl";

export const Main = () => Handlebars.compile(template)();