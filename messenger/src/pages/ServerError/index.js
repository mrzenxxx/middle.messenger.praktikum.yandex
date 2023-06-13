import Handlebars from "handlebars";
import { template } from "./serverError.tmpl";

export const ServerError = () => Handlebars.compile(template)({name: 'Vasya Pupkin'});