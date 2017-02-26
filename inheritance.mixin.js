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
 * riot global mixin for providing tag properties to child tag(s).
 * @uses {scope}.riot
 */
(function(riot) {
  riot.mixin({

    /** conatiner for values to share with child tags. */
    will: {},

    /**
     * gets a property shared by a parent tag.
     *
     * @param int|string heirloom  identifier for the item to inherit
     * @return mixed               the inherited item on success; undefined otherwise
     */
    inherit: function(heirloom) {
      var parent = this.parent;
      while (parent && parent.will) {
        if (typeof parent.will[heirloom] !== 'undefined') {
          return parent.will[heirloom];
        }
        parent = parent.parent;
      }
      return undefined;
    }
  });
})(riot);
