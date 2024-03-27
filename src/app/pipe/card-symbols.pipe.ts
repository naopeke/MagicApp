import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cardSymbols'
})
export class CardSymbolsPipe implements PipeTransform {


  transform(value: string, cardSymbolsData: any[]): string {
    
    if (!value || cardSymbolsData.length === 0) {
      return value;
    }

    // synbol => svg
    // recibier {T}, {W} etc desde api, haciendo bucle de array de cardSymbolsData(API),
    // crear un object 'regex' que hace global match('g') para que apriquen a todos los symbols en mismo texto.
    cardSymbolsData.forEach(symbol => {
      const regex = new RegExp(this.escapeRegExp(symbol.symbol), 'g');
      value = value.replace(regex, `<img src="${symbol.svg_uri}" class="mana-symbol">`);
    });

    return value;
  }

  // cuando hay codigos de RegExp(regular expression), escapar caractores especiales
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace
  //https://www.w3resource.com/javascript-exercises/fundamental/javascript-fundamental-exercise-239.php
  //https://es.stackoverflow.com/questions/49125/c%C3%B3mo-eliminar-o-reemplazar-todas-las-subcadenas-de-un-string-en-javascript
  // Esto también vale para  {½}, {∞} etc   "symbol": "{∞}",
  private escapeRegExp(string: string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}
