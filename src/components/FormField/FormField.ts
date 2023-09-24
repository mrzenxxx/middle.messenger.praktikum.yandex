import Handlebars from "handlebars";
import template from "./FormField.hbs?raw";
import "./FormField.scss";

export default Handlebars.compile(template);

// interface FormFieldProps {}

// export class FormField extends Block<FormFieldProps|any> {
//     constructor(props: FormFieldProps) {
//       super({
//         ...props,
//       });
//     }
  
//     render() {
//       return this.compile(template, this.props);
//     }
//   }
