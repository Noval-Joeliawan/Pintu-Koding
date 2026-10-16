// src/js/core/events.js — Centralized Event Dispatcher / Bus
(function () {
  'use strict';

  const listeners = {};

  const Events = {
    // Standard Event Constants
    HEARTS_EMPTY: 'HEARTS_EMPTY',
    XP_UPDATED: 'XP_UPDATED',
    STATE_CHANGED: 'STATE_CHANGED',
    HEART_REFILLED: 'HEART_REFILLED',
    LESSON_COMPLETED: 'LESSON_COMPLETED',
    STREAK_UPDATED: 'STREAK_UPDATED',

    /**
     * Subscribe to an event
     * @param {string} event 
     * @param {Function} callback 
     * @returns {Function} Unsubscribe function
     */
    on(event, callback) {
      if (typeof callback !== 'function') return () => {};
      if (!listeners[event]) {
        listeners[event] = [];
      }
      listeners[event].push(callback);
      return () => this.off(event, callback);
    },

    /**
     * Unsubscribe from an event
     * @param {string} event 
     * @param {Function} callback 
     */
    off(event, callback) {
      if (!listeners[event]) return;
      listeners[event] = listeners[event].filter(cb => cb !== callback);
      if (listeners[event].length === 0) {
        delete listeners[event];
      }
    },

    /**
     * Dispatch an event to all subscribers
     * @param {string} event 
     * @param {any} data 
     */
    emit(event, data) {
      if (!listeners[event]) return;
      const callbacks = listeners[event].slice();
      for (let i = 0; i < callbacks.length; i++) {
        try {
          callbacks[i](data);
        } catch (err) {
          console.error(`[Events] Error in listener for "${event}":`, err);
        }
      }
    },

    /**
     * Subscribe to an event once
     * @param {string} event 
     * @param {Function} callback 
     */
    once(event, callback) {
      const unsub = this.on(event, (data) => {
        unsub();
        callback(data);
      });
      return unsub;
    },

    /**
     * Clear all listeners (useful for testing)
     */
    clear(event) {
      if (event) {
        delete listeners[event];
      } else {
        Object.keys(listeners).forEach(k => delete listeners[k]);
      }
    }
  };

  if (typeof window !== 'undefined') {
    window.Events = Events;
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Events;
  }
})();
