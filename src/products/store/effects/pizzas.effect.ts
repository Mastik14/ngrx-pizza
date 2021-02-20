import { Injectable } from '@angular/core';

import { createEffect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as fromRoot from '../../../app/store';
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

  createPizza$ = createEffect(() =>
    this.actions$.pipe(
      ofType(pizzaActions.CREATE_PIZZA),
      map((action: pizzaActions.CreatePizza) => action.payload),
      switchMap((pizza) => {
        return this.pizzaService.createPizza(pizza).pipe(
          map((pizza) => new pizzaActions.CreatePizzaSuccess(pizza)),
          catchError((error) => of(new pizzaActions.CreatePizzaFail(error)))
        );
      })
    )
  );

  updatePizza$ = createEffect(() =>
    this.actions$.pipe(
      ofType(pizzaActions.UPDATE_PIZZA),
      map((action: pizzaActions.UpdatePizza) => action.payload),
      switchMap((pizza) => {
        return this.pizzaService.updatePizza(pizza).pipe(
          map((pizza) => new pizzaActions.UpdatePizzaSuccess(pizza)),
          catchError((error) => of(new pizzaActions.UpdatePizzaFail(error)))
        );
      })
    )
  );

  removePizza$ = createEffect(() =>
    this.actions$.pipe(
      ofType(pizzaActions.REMOVE_PIZZA),
      map((action: pizzaActions.RemovePizza) => action.payload),
      switchMap((pizza) => {
        return this.pizzaService.removePizza(pizza).pipe(
          map(() => new pizzaActions.RemovePizzaSuccess(pizza)),
          catchError((error) => of(new pizzaActions.RemovePizzaFail(error)))
        );
      })
    )
  );

  handlePizzaSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        pizzaActions.UPDATE_PIZZA_SUCCESS,
        pizzaActions.REMOVE_PIZZA_SUCCESS
      ),
      map((pizza) => {
        return new fromRoot.Go({
          path: ['/products'],
        });
      })
    )
  );
}
