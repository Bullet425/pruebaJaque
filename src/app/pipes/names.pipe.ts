import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "recortar",
})
export class NamesPipe implements PipeTransform {
  transform(value: string, ...args: any[]): any {
    if (value.length > 25) {
      let result = value.slice(0, 25);
      return (result = `${result}...`);
    }
    return value;
  }
}
