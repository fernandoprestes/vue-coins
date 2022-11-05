/* eslint-disable @typescript-eslint/no-explicit-any */
import bus from '~/libs/bus';

const EVENT_NAME = 'modal:toggle';

export default function useModal() {
  function open(payload = {}) {
    bus.emit(EVENT_NAME, { status: true, ...payload });
  }

  function close(payload = {}) {
    bus.emit(EVENT_NAME, { status: false, ...payload });
  }

  function listen(fn: any) {
    bus.on(EVENT_NAME, fn);
  }
  function off(fn: any) {
    bus.off(EVENT_NAME, fn);
  }

  return {
    open,
    close,
    listen,
    off,
  };
}
