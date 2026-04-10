// ============================================
// CIPTA Finansial — Hash Router
// ============================================

class Router {
  constructor() {
    this.routes = {};
    this.currentRoute = null;
    window.addEventListener('hashchange', () => this._onHashChange());
  }

  addRoute(path, handler) {
    this.routes[path] = handler;
  }

  navigate(path) {
    window.location.hash = path;
  }

  getCurrentPath() {
    return window.location.hash.slice(1) || '/';
  }

  _onHashChange() {
    const path = this.getCurrentPath();
    this._resolve(path);
  }

  _resolve(path) {
    const handler = this.routes[path] || this.routes['/'];
    if (handler) {
      this.currentRoute = path;
      handler(path);
    }
  }

  start() {
    const path = this.getCurrentPath();
    this._resolve(path);
  }
}

export const router = new Router();
export default router;
