import { Pipe, PipeTransform } from '@angular/core';


 

@Pipe({ name: 'searchfilter' })

export class SearchFilterPipe implements PipeTransform {

  transform(value: any, busqueda: any) {

    if ((busqueda || busqueda !== '' ) && (value !== undefined)) {

      if (busqueda === undefined) {

        busqueda = '';

      }
     busqueda = busqueda.toString().toLowerCase();

      return value.filter((el: any) => {
        let elLess={
            name:el.name,
            laguage:el.language,
            size:el.size
        }
        let contiene: Boolean = false;
        el=elLess;
        for (const propiedad in el) {

          if (el[propiedad] !== null) {

            if (

              el[propiedad]

                .toString()

                .toLowerCase()

                .indexOf(busqueda) > -1

            ) {

              contiene = true;

            }

          }

        }

        return contiene ? el : undefined;

      });

    } else {

      return value;

    }

  }

}