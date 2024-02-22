import { consume, createContext, provide } from '@lit/context';
import { property, state } from 'lit/decorators.js';
import * as MVU from './mvu';

import { Model } from '/config/models';
import { Message } from '/config/messages';

export const context = createContext<Model>('ThrillMapModels');

export const init: Model = {
  rides: [],
  events: [],
  orders: [],
  restaurants: [],
  user: undefined,
};

export class Main
  extends MVU.Main<Model, Message>
  implements MVU.App<Model, Message>
{
  @provide({ context })
  @state()
  model = init;

  constructor(update: MVU.Update<Model, Message>) {
    super(
      update,
      () => this.model,
      (next: Model) => (this.model = next)
    );
  }
}

export class View extends MVU.View<Message> {
  @consume({ context: context, subscribe: true })
  @property({ attribute: false })
  _model: Model | undefined;

  getFromModel<T>(key: keyof Model) {
    if (this._model) {
      return this._model[key] as T;
    }
  }
}

export const createDispatch = () => new MVU.Dispatch<Model, Message>();

export const updateProps = MVU.updateProps<Model>;
export const noUpdate = MVU.noUpdate<Model>;
