import 'dart:async';

/// Async mutex to guarantee actions are performed sequentially and do not interleave
class AsyncMutex {
  Future _running = Future.value(null);

  /// Execute [operation] exclusively, after any currently running operations.
  /// Returns a [Future] with the result of the [operation].
  Future<T> run<T>(Future<T> Function() operation) {
    final completer = Completer<T>();
    _running.whenComplete(() {
      completer.complete(Future<T>.sync(operation));
    });
    return _running = completer.future;
  }
}
