import Handlebars from "handlebars";
import { template } from "./navigation.tmpl";

export const Navigation = () => Handlebars.compile(template)({name: 'Vasya Pupkin'});