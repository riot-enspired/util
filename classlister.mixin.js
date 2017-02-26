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
 * riot mixin for converting opts.class to a list.
 * @uses {scope}.riot
 */
(function(riot) {
  /** resets the classlist from tag options. */
  var listClasses = function(tag) {
    tag.classlist = tag.opts.class ? tag.opts.class.split(/\s+/) : [];
  };

  riot.mixin('classlister', {
    init: function() {
      var tag = this;
      listClasses(tag);
      this.on('before-update', function() { listClasses(tag); });
    },

    /** conatiner for classnames. */
    classlist: [],

    /**
     * gets the classlist as a string.
     *
     * @return string  space-separated list of classnames
     */
    classes: function() { return this.classlist.join(' '); }
  });
})(riot);
