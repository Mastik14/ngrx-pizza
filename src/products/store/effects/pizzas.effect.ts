import { Injectable } from '@angular/core';

import { createEffect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as pizzaActions from '../actions/pizzas.action';
import * as fromServices from '../../services';

@Injectable()
export class PizzasEffects {
  constructor(
    private actions$: Actions,
    private pizzaService: fromServices.PizzasService
  ) {}

  loadPizzas$ = createEffect(() =>
    this.actions$.pipe(
      ofType(pizzaActions.LOAD_PIZZAS),
      switchMap(() => {
        return this.pizzaService.getPizzas().pipe(
          map((pizzas) => new pizzaActions.LoadPizzasSuccess(pizzas)),
          catchError((error) => of(new pizzaActions.LoadPizzasFail(error)))
        );
      })
    )
  );
}
