import { setupWorker } from 'msw/browser'
import { RequestHandler } from 'msw';

const mswWorker = setupWorker();

const handlerMap: Map<string, RequestHandler> = new Map<string, RequestHandler>();

async function startMockerWorker() {
  return mswWorker.start();
}

function addNewRequestHandler(id: string, handler: RequestHandler) {
  handlerMap.set(id, handler);
  resetHandlers([...handlerMap.values()]);
}

function deleteRequestHandler(id: string) {
  handlerMap.delete(id);
  resetHandlers([...handlerMap.values()]);
}

function resetHandlers(handlers: RequestHandler[]) {
  mswWorker.resetHandlers(...handlers);
}

export { startMockerWorker, addNewRequestHandler, deleteRequestHandler }
