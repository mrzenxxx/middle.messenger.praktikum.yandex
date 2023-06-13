import Handlebars from "handlebars";
import { template } from "./notFound.tmpl";

export const NotFound = () => Handlebars.compile(template)();