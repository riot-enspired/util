/**
 * @package    at.riot-util
 * @author     Adrian <adrian@enspi.red>
 * @copyright  2017
 * @license    GPL-3.0 (only)
 *
 *  This program is free software: you can redistribute it and/or modify it
 *  under the terms of the GNU General Public License, version 3.
 *  The right to apply the terms of later versions of the GPL is RESERVED.
 *
 *  This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 *  without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 *  See the GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License along with this program.
 *  If not, see <http://www.gnu.org/licenses/gpl-3.0.txt>.
 */

/**
 * riot global mixin for setting delegated event listeners on the tag's DOM element.
 * @uses {scope}.riot
 */
(function(riot) {
  riot.mixin({
    init: function() {
      var root = this.root,
          ll = this.listener_list,
          listen = function() {
        Object.keys(ll).forEach(function(event) {
          var dispatcher = function(e) {
            Object.keys(ll[event]).forEach(function(selector) {
              if (! e.target) { return; }
              if (e.target.matches(selector)) {
                ll[event][selector].forEach(function(l, i) {
                  l.listener.call(e.target, e);
                  if (l.once) {
                    delete ll[event][selector][i];
                  }
                });
              }
            });
          };
          root.addEventListener(event, dispatcher);
        });
      };
      this.on('mount', listen);
      this.on('update', listen);
    },
    listener_list: {},
    listener: function(event, selector, listener, once) {
      if (! this.listener_list[event]) {
        this.listener_list[event] = {};
      }
      if (! this.listener_list[event][selector]) {
        this.listener_list[event][selector] = [];
      }
      this.listener_list[event][selector].push({listener: listener, once: once});
    }
  });
})(riot);


/*
if (!Element.prototype.matches) {
  Element.prototype.matches =
    Element.prototype.matchesSelector ||
    Element.prototype.mozMatchesSelector ||
    Element.prototype.msMatchesSelector ||
    Element.prototype.oMatchesSelector ||
    Element.prototype.webkitMatchesSelector ||
    function(s) {
      var matches = (this.document || this.ownerDocument).querySelectorAll(s),
          i = matches.length;
      while (--i >= 0 && matches.item(i) !== this) {}
      return i > -1;
    };
}
*/
