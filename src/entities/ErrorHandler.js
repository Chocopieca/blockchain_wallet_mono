export default class ErrorHandler {
  errors = {};

  setError(key, error) {
    if(!this.errors[key]) {
      this.errors[key] = error;
    }
  }
  getError(key) {
    return this.errors[key] ?? null;
  }
  clearErrors() {
    this.errors = {};
  }
  clearError(key) {
    delete this.errors[key];
  }
}
