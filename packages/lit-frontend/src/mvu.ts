import { LitElement } from 'lit';

import { TypedMessage } from '/config/messages';
import { ModelMap } from '/config/models';

type UpdateResult<M> = M | Promise<ModelMap<M>>;

export type Update<M, Message extends TypedMessage> = (
  model: M,
  message: Message
) => UpdateResult<M>;

export type Element<M> = LitElement & { model: M };

export interface App<M, Message extends TypedMessage> {
  model: M;
  updateFn: Update<M, Message>;
}

export class Main<M, Message extends TypedMessage> extends LitElement {
  updateFn: Update<M, Message>;

  getModel: () => M;
  setModel: (next: M) => void;

  constructor(
    update: Update<M, Message>,
    getModel: () => M,
    setModel: (next: M) => void
  ) {
    super();
    this.updateFn = update;
    this.getModel = getModel;
    this.setModel = setModel;
    (this as HTMLElement).addEventListener('mvu:message', (ev: Event) => {
      const msg = (ev as CustomEvent).detail as Message;
      this.receive(msg);
    });
  }

  receive(msg: Message) {
    const next = this.updateFn(this.getModel(), msg);
    const promise = next as Promise<ModelMap<M>>;

    if (typeof promise?.then === 'function') {
      // result is a promise
      promise.then((mapFn: ModelMap<M>) => {
        const next = mapFn(this.getModel());
        this.setModel(next);
      });
    } else {
      this.setModel(next as M);
    }
  }
}

export class View<Message extends TypedMessage> extends LitElement {
  dispatchMessage(msg: Message, target: HTMLElement = this) {
    const ev = new CustomEvent('mvu:message', {
      bubbles: true,
      composed: true,
      detail: msg,
    });
    target.dispatchEvent(ev);
  }
}

type DirectHandler<M, Msg> = (msg: Msg, model: M) => M;

type IndirectHandler<M, Msg> = (msg: Msg) => Promise<ModelMap<M>>;

type Handler<M, Msg> = DirectHandler<M, Msg> | IndirectHandler<M, Msg>;

export class Dispatch<M, Msg extends TypedMessage> {
  _handlers: Map<string, Handler<M, Msg>> = new Map();

  constructor() {
    this.update = this._update.bind(this);
  }

  addMessage(type: string, handler: Handler<M, Msg>) {
    this._handlers.set(type, handler);
  }

  update: Update<M, Msg>; // bound function

  _update(model: M, msg: Msg) {
    const { type } = msg as TypedMessage;
    const handler = this._handlers.get(type);

    return handler ? handler(msg, model) : model;
  }
}

export type Assignments<M> = {
  [Property in keyof M]+?: unknown;
};

export function updateProps<M>(props: Assignments<M>) {
  return (m: M) => Object.assign({}, m, props) as M;
}

export function noUpdate<M>(m: M) {
  return m;
}
